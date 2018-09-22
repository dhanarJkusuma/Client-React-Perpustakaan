import axios from 'axios';
import { BASE_URL } from './env';

function getCredentialsAxios(){
  // Set config defaults when creating the instance
  var instance = axios.create({
    baseURL: `${BASE_URL}`
  });

  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = `BEEHIVE ${localStorage.eLibraToken}`;
  return instance;
}


export default {
  user: {
    login: (credentials) => axios.post(`${BASE_URL}/api/v1/auth/login`, credentials).then(res => res.data),
    signup: (payload) => axios.post(`${BASE_URL}/api/v1/auth/register`, payload).then(res => res.data)
  },
  book: {
    fetch: (page, size) => getCredentialsAxios().get(`/api/v1/book?page=` + page + `&size=` + size).then(res => res.data),
    search: (query, page, size) => getCredentialsAxios().get(`/api/v1/book/search?query=` + query + `&page=` + page + `&size=` + size).then(res => res.data)
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
