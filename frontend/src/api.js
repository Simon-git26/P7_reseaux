import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

export function refreshHeaders() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
} 

refreshHeaders();

export default axios;