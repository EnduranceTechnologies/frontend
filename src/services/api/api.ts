import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL;

export const API = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get('clinic_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.data.message === 'Token invalid') {
        Cookies.remove('clinic_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);