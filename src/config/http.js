import config from './config';
import axios from 'axios';
import authService from '../services/authService';

const httpAll = axios.create({
  baseURL: config.serverUrl + config.api,
  headers: {
    'Content-Type': 'application/json'
  }
});

const httpFormData = axios.create({
  baseURL: config.serverUrl + config.api,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json'
  }
});

httpAll.interceptors.request.use(
  (req) => {
    const authTokenPayload = authService.getToken();
    console.log('authTokenPayload', authTokenPayload);
    if (authTokenPayload) {
      req.headers['Authorization'] = `Bearer ${authTokenPayload}`;
    }
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

const http = {
  httpAll,
  httpFormData
};

export default http;
