import '../styles.css'
import { arrayExpired } from '../../../assets/fakeArrays'
import BillingRows from '../../BillingRows'


export default function ExpiredBillings() {
    return (
        <div className='billing-list'>
            <header className='billing-header'>
                Cobranças Vencidas
                <div className='number-of-billings' style={{ backgroundColor: '#ffefef', color: '#971d1d' }}>08</div>
            </header>
            <BillingRows
                data={arrayExpired}
            />
        </div>
    )
}