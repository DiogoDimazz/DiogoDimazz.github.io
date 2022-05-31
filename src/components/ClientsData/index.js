import './styles.css'
import { ReactComponent as ClientsIcon } from '../../assets/clients_icon_component.svg'
import clientFilterBtn from '../../assets/client_filter_btn.svg'
import searchIcon from '../../assets/search_icon.svg'
import ClientsList from '../ClientsList'
import FormRegisterClient from '../FormRegisterClient'
import useConsumer from '../../hooks/useConsumer'
import closeFeedBack from '../../assets/close_feedback.svg'
import addedClientIcon from '../../assets/added_client_icon.svg'
import { useEffect } from 'react'

export default function ClientsData() {
    const { setModalType, isClientAdded, setIsClientAdded } = useConsumer()

    useEffect(() => {
        if (isClientAdded) {
            setTimeout(() => {
                setIsClientAdded(false)
            }, 3000)
        }
        //eslint-disable-next-line
    }, [isClientAdded])

    return (
        <div className='clients-data'>
            <header className='clients-header'>
                <div className='clients-header--left'>
                    <ClientsIcon
                        style={{ stroke: 'var(--cinza-200', fill: 'none', width: '3.2rem' }}
                    />
                    <h2 className='client-header--tag'>Clientes</h2>
                </div>
                <div className='clients-header--right'>
                    <button className='pink-btn' onClick={() => setModalType(<FormRegisterClient />)}>+ Adicionar Cliente</button>
                    <img src={clientFilterBtn} alt='filter_btn' />
                    <input className='search-input' />
                    <img src={searchIcon} alt='search_icon' className='search-icon' />
                </div>
            </header >
            <ClientsList />
            {isClientAdded &&
                <div className='client-added-feedback'>
                    <img className='added-client-icon' src={addedClientIcon} alt='client added' />
                    <span className='added-client-text'>Cadastro concluído com sucesso</span>
                    <img onClick={() => setIsClientAdded(false)} className='close-feedback' src={closeFeedBack} alt='close' />
                </div>
            }

        </div >
    )
}