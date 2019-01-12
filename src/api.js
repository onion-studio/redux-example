import axios from 'axios';
import { getToken } from './token';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(function(config) {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export default api;
