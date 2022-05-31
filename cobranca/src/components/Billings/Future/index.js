import '../styles.css'
import { arrayFuture } from '../../../assets/fakeArrays'
import BillingRows from '../../BillingRows'


export default function FutureBillings() {
    return (
        <div className='billing-list'>
            <header className='billing-header'>
                Cobranças Previstas
                <div className='number-of-billings' style={{ backgroundColor: '#fcf6dc', color: '#c5a605' }}>05</div>
            </header>
            <BillingRows
                data={arrayFuture}
            />
        </div>
    )
}

