import Axios, { AxiosRequestConfig } from 'axios';

import storage from '@/utils/storage';

// import { API_URL } from '@/config';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (config.headers === undefined) {
    config.headers = {};
  }
  if (token) {
    //config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: 'API_URL',
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.error?.message;

    console.log(message);

    return Promise.reject(error);
  }
);
