import './style.css';
import sideBar from '../../assets/side-bar-login.svg';


function SideBarLogin() {
    return (
        <div className='container-side-bar'>
            <div className='content-side-bar'>
                <div className='content-opacity'>
                    <div className='content-side-bar-text'>
                        <p>
                            Gerencie todos os pagamentos da sua empresa em um só lugar.
                        </p>
                    </div>


                </div>
                <img src={sideBar} alt='side bar' />
            </div>
        </div>
    )
}

export default SideBarLogin;