import './style.css';
import FormLogin from '../../components/FormLogin';
import SideBarLogin from '../../components/SideBarLogin';
import { useState } from 'react'

function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    return (
        <div className='container-main-login'>
            <SideBarLogin />
            <FormLogin
                form={form}
                setForm={setForm}
            />
        </div>
    )
}

export default Login;