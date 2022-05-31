import './styles.css'

export default function BillingRows({ data }) {
    return (
        <>
            <div className='billing-table-label'>
                <span className='billing-column'>Cliente</span>
                <span className='billing-column'>ID da cob.</span>
                <span className='billing-column'>Valor</span>
            </div>
            {
                data.map((bill) => (
                    <div className='billing-row' key={bill.id}>
                        <span className='billing-column'>{bill.name}</span>
                        <span className='billing-column'>{bill.chargeId}</span>
                        <span className='billing-column'>{bill.value}</span>
                    </div>
                ))
            }
            <footer className='billing-footer'>
                <button className='billing-footer-list-btn'>
                    Ver todos
                </button>
            </footer>
        </>
    )
}