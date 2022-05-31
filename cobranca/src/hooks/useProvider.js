import { useState } from "react";
import { allClients } from '../assets/fakeArrays'

function useProvider() {
    const [modalType, setModalType] = useState('')
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cpf: '',
        phone: ''
    })
    const [isClientAdded, setIsClientAdded] = useState(false)
    const [pageOption, setPageOption] = useState('home')
    const [listType, setListType] = useState(0)
    const [activeStep, setActiveStep] = useState(0);
    const [signupOk, setSignupOk] = useState(false)
    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''

    });
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfError, setPasswordConfError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useState('')
    const [arrayClients, setArrayClients] = useState([...allClients])


    function clearInputError(value) {
        if (value === 'name') { return setNameError('') }
        if (value === 'email') { return setEmailError('') }
        if (value === 'password') { return setPasswordError('') }
        if (value === 'confirmPassword') { return setPasswordConfError('') }
    }


    return {
        modalType, setModalType,
        user, setUser,
        isClientAdded, setIsClientAdded,
        pageOption, setPageOption,
        listType, setListType,
        activeStep, setActiveStep,
        signupForm, setSignupForm,
        nameError, setNameError,
        emailError, setEmailError,
        passwordError, setPasswordError,
        passwordConfError, setPasswordConfError,
        clearInputError,
        errorMessage, setErrorMessage,
        signupOk, setSignupOk,
        token, setToken,
        arrayClients, setArrayClients
    }
}

export default useProvider