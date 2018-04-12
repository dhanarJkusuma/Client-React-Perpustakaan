import { AUTH_LOGIN } from '../types';
import api from '../api';

export const login = (credentials) => (dispatch) =>
  api.user.login(credentials).then(res => {
    localStorage.eLibraToken = res.token;
  })

  export const signup = (payload) => (dispatch) =>
    api.user.signup(payload).then(res => {
      localStorage.eLibraToken = res.token;
    })

export const checkToken = (token) => (dispatch) => api.auth.checkToken(token);
