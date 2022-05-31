import './styles.css'
import Sidebar from '../../components/Sidebar'
import UserBox from '../../components/UserBox'
import useConsumer from '../../hooks/useConsumer'
import HomeData from '../../components/HomeData'
import ClientsData from '../../components/ClientsData'
import { useEffect, useState } from 'react'
import { ModalContextProvider } from '../../context/modal_context'
import Modal from '../../components/modals'

export default function Dashboard() {
    const { pageOption, setPageOption, modalType, isClientAdded, setIsClientAdded } = useConsumer()
    const [dashboardTitle, setDashboardTitle] = useState('')
    const [titleConfig, setTitleConfig] = useState({
        fontFamily: '', fontSize: '', fontWeight: 0, color: ''
    })
    const [localContainer, setLocalContainer] = useState(<HomeData />)

    function selectPage() {
        if (pageOption === 'home') {
            setDashboardTitle('Resumo das cobranças')
            setTitleConfig({
                fontFamily: "'Montserrat', sans serif",
                fontSize: '2.6rem',
                fontWeight: 600,
                color: 'var(--cinza-100)'
            })
            setLocalContainer(<HomeData />)
            return
        }
        if (pageOption === 'clients') {
            setDashboardTitle('Clientes')
            setTitleConfig({
                fontFamily: "'Inter', sans serif",
                fontSize: '1.6rem',
                fontWeight: 400,
                color: 'var(--verde-medio)',
                alignSelf: 'flex-end'
            })
            setLocalContainer(<ClientsData />)
            return
        }
        if (pageOption === 'billing') {
            setPageOption('home')
            return
        }
    }


    useEffect(() => {
        if (isClientAdded) {
            setTimeout(() => {
                setIsClientAdded(false)
            }, 3000)
        }
        //eslint-disable-next-line
    }, [isClientAdded])

    useEffect(() => {
        selectPage()
        return () => {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageOption])


    return (
        <div className='dashboard-full-page'>
            <Sidebar />
            <div className='dashboard-page'>
                <header className='dashboard-header'>
                    <div className='dashboard-title' style={titleConfig}>{dashboardTitle}</div>
                    <UserBox />
                </header>
                {localContainer}
            </div>
            {modalType
                &&
                <ModalContextProvider>
                    <Modal />
                </ModalContextProvider>

            }
        </div>
    )
}