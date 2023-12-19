import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4009',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export default instance;
