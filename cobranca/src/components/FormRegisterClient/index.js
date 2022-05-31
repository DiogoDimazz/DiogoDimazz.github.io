import './styles.css'
import closeBtn from '../../assets/close_btn.svg'
import useConsumer from '../../hooks/useConsumer'
import useModalConsumer from '../../hooks/useModalConsumer'
import signupClientIcon from '../../assets/clients_icon.svg'
import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function FormRegisterClient() {
    const { setModalType, setIsClientAdded, token, arrayClients, setArrayClients } = useConsumer()
    const {
        phoneValue, setPhoneValue,
        isPhoneOk,
        cpfValue, setCpfValue,
        isCpfOk,
        nameModalError, setNameModalError,
        emailModalError, setEmailModalError,
        cpfModalError, setCpfModalError,
        phoneModalError, setPhoneModalError,
        handlePhoneFormat, handleCpfFormat,
        clearModalInputError,
    } = useModalConsumer()
    const [newClient, setNewClient] = useState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        adress: '',
        complement: '',
        cep: '',
        district: '',
        city: '',
        state: ''
    })
    const [cepValue, setCepValue] = useState('')

    function handleChange(e) {
        clearModalInputError(e.target.name)
        const value = e.target.value;
        setNewClient({ ...newClient, [e.target.name]: value })
        if (e.target.name === 'phone') { return setPhoneValue(value) }
        if (e.target.name === 'cpf') { return setCpfValue(value) }
        if (e.target.name === 'cep') { return setCepValue(value) }
    }

    function handleCep(e) {
        const value = e.target.value
        if (value.length !== 8) { return }
        setCepValue(`${value.slice(0, 2)}.${value.slice(2, 5)}-${value.slice(5)}`)
        fetch(`https://viacep.com.br/ws/${value}/json/`).then((response) => {
            const promiseBody = response.json()

            promiseBody.then((data) => {
                if (data.erro) { return }
                setNewClient({
                    ...newClient,
                    adress: data.logradouro,
                    complement: data.complemento,
                    district: data.bairro,
                    city: data.localidade,
                    state: data.uf
                })
            })
        })
    }

    async function handleSignupClient(e) {
        e.preventDefault()
        let formOk = true
        if (!newClient.name) {
            setNameModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!newClient.email) {
            setEmailModalError('Este campo deve ser preenchido')
            formOk = false
        }
        if (!isCpfOk || !newClient.cpf) {
            setCpfModalError('CPF inválido')
            formOk = false
        }

        if (!isPhoneOk || !newClient.phone) {
            setPhoneModalError('Telefone inválido')
            formOk = false
        }

        if (!formOk) { return }

        setNameModalError('')
        setEmailModalError('')
        setCpfModalError('')
        setPhoneModalError('')

        try {
            const response = await api.post('/cadastro', {
                nome: newClient.name,
                email: newClient.email,
                cpf: newClient.cpf,
                telefone: newClient.phone,
                cep: newClient.cep,
                logradouro: newClient.adress,
                complemento: newClient.complement,
                bairro: newClient.district,
                cidade: newClient.city,
                estado: newClient.state
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response);
            setArrayClients([...arrayClients, newClient])
            setTimeout(() => {
                setIsClientAdded(true)
            }, 1000)
            setModalType('')
        } catch (error) {
            console.log(error);
        }

    }

    function handleReset() {
        setNewClient({
            name: '',
            email: '',
            cpf: '',
            phone: '',
            adress: '',
            complement: '',
            cep: '',
            district: '',
            city: '',
            state: ''
        })
        setCepValue('')
        setCpfValue('')
        setPhoneValue('')
    }

    useEffect(() => {
        return () => {
        }
    }, [arrayClients])

    return (
        <form className='general-form signup-client-form' onSubmit={(e) => handleSignupClient(e)}>
            <img
                src={closeBtn}
                alt='close'
                onClick={() => setModalType('')}
                className='close-btn'
            />
            <div className='title-signup-client-form'>
                <img src={signupClientIcon} alt='client-icon' />
                <h1 className='title-1'>Cadastro do Cliente</h1>
            </div>
            <label className='modal-label'>
                Nome*
                <input
                    className='modal-input signup-client-input-large'
                    type='text'
                    placeholder='Digite seu nome'
                    name='name'
                    value={newClient.name}
                    onChange={(e) => handleChange(e)}
                    style={nameModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                />
                {nameModalError &&
                    <span className='modal-warning-message'>{nameModalError}</span>
                }
            </label>
            <label className='modal-label'>
                E-mail*
                <input
                    className='modal-input signup-client-input-large'
                    type='text'
                    placeholder='Digite seu e-mail'
                    name='email'
                    value={newClient.email}
                    onChange={(e) => handleChange(e)}
                    style={emailModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                />
                {emailModalError &&
                    <span className='modal-warning-message'>{emailModalError}</span>
                }
            </label>
            <div className='signup-client-input-line'>
                <label className='modal-label'>
                    CPF*
                    <input
                        className='modal-input signup-client-input-small'
                        type='text'
                        placeholder='Digite seu CPF'
                        name='cpf'
                        value={cpfValue}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleCpfFormat(e.target.value)}
                        onFocus={() => setCpfValue(newClient.cpf)}
                        style={cpfModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {cpfModalError &&
                        <span className='modal-warning-message'>{cpfModalError}</span>
                    }
                </label>
                <label className='modal-label'>
                    Telefone*
                    <input
                        className='modal-input signup-client-input-small'
                        type='text'
                        placeholder='Digite seu telefone'
                        name='phone'
                        value={phoneValue}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handlePhoneFormat(e.target.value)}
                        onFocus={() => setPhoneValue(newClient.phone)}
                        style={phoneModalError ? { borderColor: '#E70000' } : { borderColor: '#d0d5dd' }}
                    />
                    {phoneModalError &&
                        <span className='modal-warning-message'>{phoneModalError}</span>
                    }
                </label>
            </div>
            <label className='modal-label'>
                Endereço
                <input
                    className='modal-input signup-client-input-large'
                    type='text'
                    placeholder='Digite o endereço'
                    name='adress'
                    value={newClient.adress}
                    onChange={(e) => handleChange(e)}
                />
            </label>
            <label className='modal-label'>
                Complemento
                <input
                    className='modal-input signup-client-input-large'
                    type='text'
                    placeholder='Digite o complemento'
                    name='complement'
                    value={newClient.complement}
                    onChange={(e) => handleChange(e)}
                />
            </label>
            <div className='signup-client-input-line'>
                <label className='modal-label'>
                    CEP
                    <input
                        className='modal-input signup-client-input-small'
                        type='text'
                        placeholder='Digite o CEP'
                        name='cep'
                        value={cepValue}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleCep(e)}
                        onFocus={() => setCepValue(newClient.cep)}
                    />
                </label>
                <label className='modal-label'>
                    Bairro
                    <input
                        className='modal-input signup-client-input-small'
                        type='text'
                        placeholder='Digite o bairro'
                        name='district'
                        value={newClient.district}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            <div className='signup-client-input-line'>
                <label className='modal-label'>
                    Cidade
                    <input
                        className='modal-input signup-client-input-cidade'
                        type='text'
                        placeholder='Digite o Cidade'
                        name='city'
                        value={newClient.city}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
                <label className='modal-label'>
                    UF
                    <input
                        className='modal-input signup-client-input-uf'
                        type='text'
                        placeholder='Digite a UF'
                        name='state'
                        value={newClient.state}
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            <div className='btn-line'>
                <button className='signup-client-reset-btn' type='button' onClick={handleReset}>Cancelar</button>
                <button className='signup-client-submit-btn pink-btn'>Aplicar</button>
            </div>
        </form>
    )
}