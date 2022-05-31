import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eyeClose from '../../assets/closed_eye.svg';
import eyeOpen from '../../assets/open_eye.svg';
import useConsumer from '../../hooks/useConsumer';
import api from '../../services/api';
import { setItem } from '../../utils/storage';
import './style.css';

const defaultForm = {
    email: '',
    password: ''
}

function FormLogin({ form, setForm }) {
    const {
        emailError, setEmailError,
        passwordError, setPasswordError,
        clearInputError,
        errorMessage, setErrorMessage,
        setUser,
        setToken
    } = useConsumer()

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        let formOk = true
        if (!form.email) {
            setEmailError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!form.password) {
            setPasswordError('Este campo deve ser preenchido')
            formOk = false
        }

        if (!formOk) { return }

        setEmailError('')
        setPasswordError('')

        try {
            const response = await api.post('/login', {
                email: form.email,
                senha: form.password
            });
            setForm(defaultForm);
            const { user, token, id } = response.data;

            setUser({
                name: user,
                email: form.email,
                password: form.password,
                cpf: '',
                phone: ''
            })
            setToken(token)
            setItem('token', token);
            setItem('userId', id);
            setItem('userName', user);

            navigate('/home');

        } catch (error) {
            setErrorMessage(error.response.data.message)
        }

    }

    function handleChangeForm({ target }) {
        clearInputError(target.name);
        setForm({ ...form, [target.name]: target.value });
    }

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage('')
            }, 2000)
        }
        // eslint-disable-next-line
    }, [errorMessage])

    return (
        <div className='container-login'>
            {errorMessage &&
                <span
                    className='error-message'
                    style={{ bottom: '12rem', right: '10.9rem' }}
                >{errorMessage}</span>
            }
            <form
                onSubmit={handleSubmit}
            >
                <h1>Faça seu login!</h1>
                <div className='content-login-email'>
                    <label htmlFor='email'>Email*</label>
                    <input
                        type='text'
                        name='email'
                        placeholder='Digite seu e-mail'
                        value={form.email}
                        onChange={handleChangeForm}
                    />
                    {emailError &&
                        <span className='warning-message'>{emailError}</span>
                    }
                </div>
                <div className='content-login-password'>
                    <div className='content-login-label'>
                        <label htmlFor='password'>Senha*</label>
                        <span>Esqueceu a senha?</span>
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Digite sua senha'
                        value={form.password}
                        onChange={handleChangeForm}
                    />
                    <img
                        src={showPassword ? eyeOpen : eyeClose}
                        alt='exibir senha'
                        onClick={() => setShowPassword(!showPassword)}
                    />
                    {passwordError &&
                        <span className='warning-message'>{passwordError}</span>
                    }
                </div>

                <div className='content-login-enter'>
                    <button
                        className='signup-pink-btn'
                    >Entrar
                    </button>
                    <div className='content-login-login'>
                        <span>Ainda não possui uma conta? <Link
                            to='/signup'
                        >
                            Cadastre-se
                        </Link></span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormLogin;