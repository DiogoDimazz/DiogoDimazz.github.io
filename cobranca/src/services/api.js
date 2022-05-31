import axios from 'axios';

export default axios.create({
    baseURL: 'https://cobranca-desafio-05.herokuapp.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});