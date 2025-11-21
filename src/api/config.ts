import axios, { InternalAxiosRequestConfig } from 'axios';
const ROOT_URL =
  import.meta.env.MODE === "development"
    ? String(import.meta.env.VITE_ROOT_URL_STAGING).replace(/\/+$/, '')
    : String(import.meta.env.VITE_ROOT_URL_PRODUCTION).replace(/\/+$/, '');

 console.log('ROOT_URL', ROOT_URL);
const BASE_URL = `${ROOT_URL}/api`;
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 20 * 1000,
});

client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      try {
        if (config.headers && typeof (config.headers as any).set === 'function') {
          (config.headers as any).set('Authorization', `Bearer ${authToken}`);
        } else {
          (config.headers as any) = {
            ...(config.headers as any),
            Authorization: `Bearer ${authToken}`,
          };
        }
      } catch (err) {
        (config.headers as any) = {
          ...(config.headers as any),
          Authorization: `Bearer ${authToken}`,
        };
      }
    }

    return config;
  },
  (err) => {
    console.log('axios-config-err', err);
    return Promise.reject(err);
  },
);

export {
  ROOT_URL,
  BASE_URL,
  client,
};
