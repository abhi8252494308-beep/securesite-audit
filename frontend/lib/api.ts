import axios from 'axios';
import {
  API_CONFIG,
  logApiRequest,
  logApiResponse,
  logApiError,
} from './api-config';

const api = axios.create(API_CONFIG);

api.interceptors.request.use(
  (config) => {
    logApiRequest({
      method: config.method || 'get',
      url: config.url || '',
      baseURL: config.baseURL,
      data: config.data,
    });
    return config;
  },
  (error) => {
    logApiError(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    logApiResponse({
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      config: {
        method: response.config.method || 'get',
        url: response.config.url || '',
        baseURL: response.config.baseURL,
      },
    });
    return response;
  },
  (error) => {
    logApiError(error);
    return Promise.reject(error);
  }
);

export default api;