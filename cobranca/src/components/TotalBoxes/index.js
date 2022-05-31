import './styles.css'
import paidBillingsIcon from '../../assets/paid_billings_icon.svg'
import expiredBillingsIcon from '../../assets/expired_billings_icon.svg'
import futureBillingsIcon from '../../assets/future_billings_icon.svg'

export function TotalPaidBillings() {
    return (
        <div className='total-paid'>
            <img src={paidBillingsIcon} alt='cobranças pagas' />
            <div className='total-info'>
                <span className='total-info-tag'>Cobranças Pagas</span>
                <span className='total-info-numbers'>R$ 30.000</span>
            </div>
        </div>
    )
}

export function TotalExpiredBillings() {
    return (
        <div className='total-expired'>
            <img src={expiredBillingsIcon} alt='cobranças pagas' />
            <div className='total-info'>
                <span className='total-info-tag'>Cobranças Vencidas</span>
                <span className='total-info-numbers'>R$ 30.000</span>
            </div>
        </div>
    )
}

export function TotalFutureBillings() {
    return (
        <div className='total-future'>
            <img src={futureBillingsIcon} alt='cobranças pagas' />
            <div className='total-info'>
                <span className='total-info-tag'>Cobranças Previstas</span>
                <span className='total-info-numbers'>R$ 30.000</span>
            </div>
        </div>
    )
}