import './styles.css'
import clientInDebtIcon from '../../assets/client_in_debt_icon.svg'
import okClientIcon from '../../assets/ok_client_icon.svg'
import { inDebtClientsArray, okClientsArray } from '../../assets/fakeArrays'
import ClientRows from '../ClientRows'

export function ClientsOk() {
    return (
        <div className='client-list'>
            <header className='client-header'>
                <div className='icon-name-header'>
                    <img src={clientInDebtIcon} alt='in_debt_client' />
                    Clientes Inadimplentes
                </div>
                <div className='number-of-clients' style={{ backgroundColor: '#ffefef', color: '#971d1d' }}>10</div>
            </header>
            <ClientRows
                data={inDebtClientsArray}
            />
        </div>
    )
}

export function ClientsInDebt() {
    return (
        <div className='client-list'>
            <header className='client-header'>
                <div className='icon-name-header'>
                    <img src={okClientIcon} alt='ok_client' />
                    Clientes em dia
                </div>
                <div className='number-of-clients' style={{ backgroundColor: '#eef6f6', color: '#1fa7af' }}>10</div>
            </header>
            <ClientRows
                data={okClientsArray}
            />
        </div>
    )
}