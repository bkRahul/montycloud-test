import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://content.guardianapis.com/'
});

export default instance;