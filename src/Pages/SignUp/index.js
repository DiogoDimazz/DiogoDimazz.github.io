import FormAddNameEmail from '../../components/FormAddNameEmail';
import FormAddSenha from '../../components/FormAddSenha';
import SucessCad from '../../components/SuccessCard';
import SignupStepper from '../../components/Stepper';
import useConsumer from '../../hooks/useConsumer';
import './style.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate()
    const {
        activeStep,
        setActiveStep,
        signupOk, setSignupOk,
        setSignupForm
    } = useConsumer()

    // async function createUser() {

    //     try {


    //         const response = await api.post('/usuario', responseData());

    //         console.log(response.data);

    //         if (response.data > 204) {
    //             return;
    //         }

    //     } catch (error) {

    //     }
    // }

    const handleNext = () => {
        setActiveStep((activeStep + 1));
    };

    useEffect(() => {
        if (signupOk) {
            setSignupOk(false)
            setSignupForm({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            setTimeout(() => {
                setActiveStep(0)
                navigate('/');
            }, 5000);
        }
        return () => {
        }
    });

    return (
        <div className='container-sign-up'>
            <div className='content-vertical'>
                <SignupStepper />
            </div>
            <div className='content-dados'>
                {
                    activeStep === 0 &&
                    <FormAddNameEmail
                        handleNext={handleNext}
                    />
                }
                {
                    activeStep === 1 &&
                    <FormAddSenha
                        handleNext={handleNext}
                    />
                }
                {
                    activeStep === 2 &&
                    <SucessCad />
                }
            </div>
        </div>
    )
}

export default SignUp;