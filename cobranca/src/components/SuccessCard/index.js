import { useNavigate } from 'react-router-dom';
import iconSucess from '../../assets/success_icon.svg';
import SignupTab from '../SignupTab';
import './style.css';


function SucessCad() {
    const navigate = useNavigate();

    function handleToLogin() {
        console.log('ouvindo');
        navigate('/')
    }

    return (
        <div className='container-sucess'>
            <div className='content-sucess'>
                <img src={iconSucess} alt='icon' />
                <h1>Cadastro realizado com sucesso!</h1>
            </div>

            <button onClick={() => handleToLogin()}
                className='signup-pink-btn'
            >Ir para o Login</button>
            <SignupTab />
        </div>
    )
}

export default SucessCad;