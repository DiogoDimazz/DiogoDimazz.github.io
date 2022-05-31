import './styles.css'
import useConsumer from '../../hooks/useConsumer';
import useModalConsumer from '../../hooks/useModalConsumer';
import { useEffect, useState } from 'react';
import closedEye from '../../assets/closed_eye.svg'
import openEye from '../../assets/open_eye.svg'
import UserUpdateSuccess from '../UserUpdateSuccess';
import closeBtn from '../../assets/close_btn.svg'
import api from '../../services/api';

export default function FormUpdateUser() {
    const { user, setUser, modalType, setModalType, token } = useConsumer()
    const {
        phoneValue, setPhoneValue,
        isPhoneOk,
        cpfValue, setCpfValue,
        isCpfOk,
        showPassword, setShowPassword,
        showPasswordConfirmation, setShowPasswordConfirmation,
        nameModalError, setNameModalError,
        emailModalError, setEmailModalError,
        passwordModalError, setPasswordModalError,
        passwordConfModalError, setPasswordConfModalError,
        cpfModalError, setCpfModalError,
        phoneModalError, setPhoneModalError,
        handlePhoneFormat, handleCpfFormat,
        clearModalInputError
    } = useModalConsumer()
    const [currentUser, setCurrentUser] = useState({ ...user })
    const [confirmPassword, setConfirmPassword] = useState(user.password)


    async function handleUpdateUser(e) {
        e.preventDefault()
        let formOk = true
        if (currentUser.name === '') {
            setNameModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (currentUser.email === '') {
            setEmailModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (currentUser.password !== confirmPassword) {
            setPasswordConfModalError('As senhas não coincidem')
            formOk = false
        }
        if (!currentUser.password) {
            setPasswordModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!confirmPassword) {
            setPasswordConfModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!isCpfOk) {
            setCpfModalError('CPF inválido')
            formOk = false
        }
        if (!isPhoneOk) {
            setPhoneModalError('Telefone inválido')
            formOk = false
        }

        if (!formOk) {
            return
        }

        setNameModalError('')
        setEmailModalError('')
        setCpfModalError('')
        setPhoneModalError('')
        setPasswordModalError('')
        setPasswordConfModalError('')

        try {
            await api.patch('/atualizar_usuario', {
                nome: currentUser.name,
                email: currentUser.email,
                cpf: currentUser.cpf,
                telefone: currentUser.phone,
                senha: currentUser.password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }

        setUser({ ...currentUser })
        setModalType(<UserUpdateSuccess />)
    }

    function handleChange(e) {
        clearModalInputError(e.target.name)
        const value = e.target.value;
        setCurrentUser({ ...currentUser, [e.target.name]: value })
        if (e.target.name === 'phone') { return setPhoneValue(value) }
        if (e.target.name === 'cpf') { return setCpfValue(value) }
    }

    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value)
        clearModalInputError(e.target.name)
    }

    useEffect(() => {
        handleCpfFormat(user.cpf)
        handlePhoneFormat(user.phone)
        return () => {
        }
        // eslint-disable-next-line
    }, [modalType])

    return (
        <form className='general-form update-user-form' onSubmit={(e) => handleUpdateUser(e)}>
            <img
                src={closeBtn}
                alt='close'
                onClick={() => setModalType('')}
                className='close-btn'
            />
            <h1 className='form-title title-1'>Edite seu cadastro</h1>
            <label className='modal-label update-user-label'>
                Nome*
                <input
                    className='modal-input update-user-input-large'
                    type='text'
                    placeholder='Digite seu nome'
                    name='name'
                    value={currentUser.name}
                    onChange={(e) => handleChange(e)}
                    style={nameModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                />
                {nameModalError &&
                    <span className='modal-warning-message'>{nameModalError}</span>
                }
            </label>
            <label className='modal-label update-user-label'>
                E-mail*
                <input
                    className='modal-input update-user-input-large'
                    type='text'
                    placeholder='Digite seu e-mail'
                    name='email'
                    value={currentUser.email}
                    onChange={(e) => handleChange(e)}
                    style={emailModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                />
                {emailModalError &&
                    <span className='modal-warning-message'>{emailModalError}</span>
                }
            </label>
            <div className='update-user-input-line update-user-label'>
                <label className='modal-label'>
                    CPF
                    <input
                        className='modal-input update-user-small'
                        type='text'
                        placeholder='Digite seu CPF'
                        name='cpf'
                        value={cpfValue}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleCpfFormat(e.target.value)}
                        onFocus={() => setCpfValue(currentUser.cpf)}
                        style={cpfModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {cpfModalError &&
                        <span className='modal-warning-message'>{cpfModalError}</span>
                    }
                </label>
                <label className='modal-label'>
                    Telefone
                    <input
                        className='modal-input update-user-small'
                        type='text'
                        placeholder='Digite seu telefone'
                        name='phone'
                        value={phoneValue}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handlePhoneFormat(e.target.value)}
                        onFocus={() => setPhoneValue(currentUser.phone)}
                        style={phoneModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {phoneModalError &&
                        <span className='modal-warning-message'>{phoneModalError}</span>
                    }
                </label>
            </div>
            <label className='modal-label update-user-label'>
                Nova Senha*
                <input
                    className='modal-input update-user-input-large'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Digite seu nova senha'
                    name='password'
                    value={currentUser.password}
                    onChange={(e) => handleChange(e)}
                    style={passwordModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                />
                <img
                    className='password-eye'
                    src={showPassword ? openEye : closedEye}
                    alt='eye-icon'
                    onClick={() => setShowPassword(!showPassword)}
                />
                {passwordModalError &&
                    <span className='modal-warning-message'>{passwordModalError}</span>
                }
            </label>
            <label className='modal-label update-user-label'>
                Confirmar Senha*
                <input
                    className='modal-input update-user-input-large'
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    placeholder='Confirme sua nova senha'
                    name='confirm-password'
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPassword(e)}
                    style={passwordConfModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                />
                <img
                    className='password-eye'
                    src={showPasswordConfirmation ? openEye : closedEye}
                    alt='eye-icon'
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                />
                {passwordConfModalError &&
                    <span className='modal-warning-message'>{passwordConfModalError}</span>
                }
            </label>
            <button className='update-user-submit-btn pink-btn'>Aplicar</button>
        </form>
    )
}