import '../styles.css'
import { arrayPaid } from '../../../assets/fakeArrays'
import BillingRows from '../../BillingRows'


export default function PaidBillings() {
    return (
        <div className='billing-list'>
            <header className='billing-header'>
                Cobranças Pagas
                <div className='number-of-billings' style={{ backgroundColor: '#eef6f6', color: '#1fa7af' }}>10</div>
            </header>
            <BillingRows
                data={arrayPaid}
            />
        </div>
    )
}