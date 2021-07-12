import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

//Verifier que le token n'est pas null avant de faire ca
export function refreshHeaders() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
} 

refreshHeaders();

export default axios;