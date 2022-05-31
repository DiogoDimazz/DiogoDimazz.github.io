import './styles.css'
import clientOrderIcon from '../../assets/client_order_icon.svg'
import addBillingIcon from '../../assets/add_billing_icon.svg'
import statusOkClient from '../../assets/status_ok_client.svg'
import statusInDebtClient from '../../assets/status_in_debt_client.svg'
import useConsumer from '../../hooks/useConsumer'
import { useEffect } from 'react'

export default function ClientsList() {
    const { arrayClients } = useConsumer()

    useEffect(() => {
        console.log(arrayClients);

        return () => {
        }
    }, [arrayClients])

    return (
        <div className='clients-list'>
            <div className='clients-list--label'>
                <span className='clients-list--column'>
                    <img src={clientOrderIcon} alt='order' className='set-client-order-btn' />
                    Cliente
                </span>
                <span className='clients-list--column'>CPF</span>
                <span className='clients-list--column'>E-mail</span>
                <span className='clients-list--column'>Telefone</span>
                <span className='clients-list--column'>Status</span>
                <span className='clients-list--column'>Criar Cobrança</span>
            </div>
            {
                arrayClients.map((client) => (
                    <div className='clients-list--row'>
                        <span className='clients-list--column'>{client.name}</span>
                        <span className='clients-list--column'>{client.cpf}</span>
                        <span className='clients-list--column'>{client.email}</span>
                        <span className='clients-list--column'>{client.phone}</span>
                        <span className='clients-list--column'>
                            <img
                                className='client-status'
                                src={client.status ? statusOkClient : statusInDebtClient} alt='status' />
                        </span>
                        <span className='clients-list--column'>
                            <img className='add-billing-btn' src={addBillingIcon} alt='add_billing' />
                        </span>
                    </div>
                ))
            }
        </div>
    )
}