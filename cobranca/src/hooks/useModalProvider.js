import { useState } from "react";

function useModalProvider() {
    const [phoneValue, setPhoneValue] = useState('')
    const [isPhoneOk, setIsPhoneOk] = useState(true)
    const [cpfValue, setCpfValue] = useState('')
    const [isCpfOk, setIsCpfOk] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
    const [nameModalError, setNameModalError] = useState('')
    const [emailModalError, setEmailModalError] = useState('')
    const [passwordModalError, setPasswordModalError] = useState('')
    const [passwordConfModalError, setPasswordConfModalError] = useState('')
    const [cpfModalError, setCpfModalError] = useState('')
    const [phoneModalError, setPhoneModalError] = useState('')

    function handlePhoneFormat(value) {
        if (isNaN(value)) { return setIsPhoneOk(false) }
        if (value.length === 0) { return setIsPhoneOk(true) }

        if (value.length < 8 || value.length > 11) { return setIsPhoneOk(false) }

        if (isNaN(value)) {
            return setIsPhoneOk(false)
        }

        if (value.length === 8) {
            setPhoneValue(`${value.slice(0, 4)} -${value.slice(4)} `)
        }
        if (value.length === 9) {
            setPhoneValue(`${value.slice(0, 1)}.${value.slice(1, 5)} -${value.slice(5)} `)
        }
        if (value.length === 10) {
            setPhoneValue(`(${value.slice(0, 2)}) ${value.slice(2, 6)} -${value.slice(6)} `)
        }
        if (value.length === 11) {
            setPhoneValue(`(${value.slice(0, 2)}) ${value.slice(2, 3)}.${value.slice(3, 7)} -${value.slice(7)} `)
        }

        setIsPhoneOk(true)
    }

    function handleCpfFormat(value) {
        if (isNaN(value)) { return setIsCpfOk(false) }
        if (value.length !== 0 && value.length !== 11) { return setIsCpfOk(false) }
        if (value.length === 11) {
            setCpfValue(`${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`)
        }
        return setIsCpfOk(true)
    }

    function clearModalInputError(value) {
        if (value === 'name') { return setNameModalError('') }
        if (value === 'email') { return setEmailModalError('') }
        if (value === 'cpf') { return setCpfModalError('') }
        if (value === 'phone') { return setPhoneModalError('') }
        if (value === 'password') { return setPasswordModalError('') }
        if (value === 'confirm-password') { return setPasswordConfModalError('') }
    }

    return {
        phoneValue, setPhoneValue,
        isPhoneOk, setIsPhoneOk,
        cpfValue, setCpfValue,
        isCpfOk, setIsCpfOk,
        showPassword, setShowPassword,
        showPasswordConfirmation, setShowPasswordConfirmation,
        nameModalError, setNameModalError,
        emailModalError, setEmailModalError,
        passwordModalError, setPasswordModalError,
        passwordConfModalError, setPasswordConfModalError,
        cpfModalError, setCpfModalError,
        phoneModalError, setPhoneModalError,
        handlePhoneFormat,
        handleCpfFormat,
        clearModalInputError
    }
}

export default useModalProvider