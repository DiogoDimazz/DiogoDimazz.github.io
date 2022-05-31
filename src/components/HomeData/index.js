import './styles.css'
import { TotalPaidBillings, TotalExpiredBillings, TotalFutureBillings } from '../TotalBoxes'
import PaidBillings from '../Billings/Paid'
import ExpiredBillings from '../Billings/Expired'
import FutureBillings from '../Billings/Future'
import { ClientsOk, ClientsInDebt } from '../Client_status_lists'

export default function HomeData() {
    return (
        <div className='homedata'>
            <div className='homedata-line-1'>
                <TotalPaidBillings />
                <TotalExpiredBillings />
                <TotalFutureBillings />
            </div>
            <div className='homedata-line-2'>
                <ExpiredBillings />
                <FutureBillings />
                <PaidBillings />
            </div>
            <div className='homedata-line-3'>
                <ClientsOk />
                <ClientsInDebt />
            </div>
        </div>
    )
}