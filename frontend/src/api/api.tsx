import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('shark_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.data.message === 'Token invalid') {
        Cookies.remove('shark_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);
