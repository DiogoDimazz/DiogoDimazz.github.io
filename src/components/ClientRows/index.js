import './styles.css'

export default function ClientRows({ data }) {


    return (
        <>
            <div className='client-table-label'>
                <span className='client-column'>Cliente</span>
                <span className='client-column client-middle-column'>Data venc.</span>
                <span className='client-column'>Valor</span>
            </div>
            {data.map((client) => (
                <div className='client-row' key={client.id}>
                    <span className='client-column'>{client.name}</span>
                    <span className='client-column client-middle-column'>{client.date}</span>
                    <span className='client-column'>{client.value}</span>
                </div>
            ))}
            <footer className='client-list-footer'>
                <button className='client-footer-list-btn'>
                    Ver todos
                </button>
            </footer>
        </>
    )
}