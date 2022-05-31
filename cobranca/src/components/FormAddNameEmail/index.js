import { Link } from 'react-router-dom';
import useConsumer from '../../hooks/useConsumer';
import SignupTab from '../SignupTab';
import './style.css';

function FormAddNameEmail({ handleNext }) {
    const {
        signupForm,
        setSignupForm,
        nameError, setNameError,
        emailError, setEmailError,
        clearInputError
    } = useConsumer()

    function handleSubmit(e) {
        e.preventDefault();
        let formOk = true

        if (!signupForm.name) {
            setNameError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!signupForm.email) {
            setEmailError('Este campo deve ser preenchido')
            formOk = false
        }


        if (!formOk) { return }

        setNameError('')
        setEmailError('')

        //TODO - fazer um try catch de um GET varrendo o array de emails pra garantir que ele não passe para a próxima tela de cadastro, caso o email já exista
        handleNext();

    }


    function handleChangeForm({ target }) {
        clearInputError(target.name)
        setSignupForm({ ...signupForm, [target.name]: target.value });
    }


    return (
        <div className='container-add-name'>
            <form
                onSubmit={handleSubmit}
            >
                <h1>Adicione seus dados</h1>
                <div className='content-name'>
                    <label htmlFor='input-password'>Nome*</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Digite seu nome'
                        value={signupForm.name}
                        onChange={handleChangeForm}
                    />
                    {nameError &&
                        <span className='warning-message'>{nameError}</span>
                    }
                </div>
                <div className='content-email'>
                    <label htmlFor='input-repeat'>E-mail*</label>
                    <input
                        type='text'
                        name='email'
                        placeholder='Digite seu e-mail'
                        value={signupForm.email}
                        onChange={handleChangeForm}
                    />
                    {emailError &&
                        <span className='warning-message'>{emailError}</span>
                    }
                </div>

                <div className='content-continue'>
                    <button
                        className='signup-pink-btn'
                    >
                        Continuar
                    </button>

                    <div className='content-login'>
                        <span>Já possui uma conta? Faça seu <Link to='/'>Login</Link></span>
                    </div>
                </div>
            </form>
            <SignupTab />
        </div>
    )
}

export default FormAddNameEmail;