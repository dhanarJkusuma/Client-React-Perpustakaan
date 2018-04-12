import axios from 'axios';
import { BASE_URL } from './env';

const headerToken =
  {
    'Content-Type': 'application/json',
    'Authorization': `VEINTECH ${localStorage.eLibraToken}`
  }


function getCredentialsAxios(){
  // Set config defaults when creating the instance
  var instance = axios.create({
    baseURL: `${BASE_URL}`
  });

  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = `VEINTECH ${localStorage.eLibraToken}`;
  return instance;
}


export default {
  user: {
    login: (credentials) => axios.post(`${BASE_URL}/api/v1/auth/login`, credentials).then(res => res.data),
    signup: (payload) => axios.post(`${BASE_URL}/api/v1/auth/register`, payload).then(res => res.data)
  },
  book: {
    fetch: () => getCredentialsAxios().get('/api/v1/book').then(res => res.data)
  },
  transaction: {
    create: (payload) => getCredentialsAxios().post('/api/v1/transaction', payload),
    getIncompleteTransaction: () => getCredentialsAxios().get('/api/v1/transaction/in-complete').then(res => res.data),
    completeTransaction: (transactionId, payload) => getCredentialsAxios().put(`/api/v1/transaction/return/${transactionId}`, payload)
  },
  auth: {
    checkToken: (token) => getCredentialsAxios().get(`/api/v1/auth/check-token?token=${token}`).then(res => res.data)
  }
}
