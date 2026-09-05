export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://securesite-audit.onrender.com/api/v1';

export const API_CONFIG = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};

export function logApiRequest(config: {
  method: string;
  url: string;
  baseURL?: string;
  data?: unknown;
}) {
  const fullUrl = `${config.baseURL || ''}${config.url}`;
  console.log(`[API Request] ${config.method.toUpperCase()} ${fullUrl}`, config.data ? { data: config.data } : '');
}

export function logApiResponse(response: {
  status: number;
  statusText: string;
  data: unknown;
  config: { method: string; url: string; baseURL?: string };
}) {
  const fullUrl = `${response.config.baseURL || ''}${response.config.url}`;
  console.log(`[API Response] ${response.config.method.toUpperCase()} ${fullUrl} - Status: ${response.status} ${response.statusText}`);
  if (response.data && typeof response.data === 'object') {
    console.log(`[API Response Body]`, response.data);
  }
}

export function logApiError(error: {
  message: string;
  code?: string;
  config?: { method: string; url: string; baseURL?: string };
  response?: { status: number; statusText: string; data: unknown };
}) {
  if (error.response) {
    const fullUrl = `${error.config?.baseURL || ''}${error.config?.url || ''}`;
    console.error(`[API Error] ${error.config?.method?.toUpperCase() || ''} ${fullUrl} - Status: ${error.response.status} ${error.response.statusText}`);
    console.error('[API Error Response Body]', error.response.data);
  } else if (error.code === 'ECONNABORTED') {
    const fullUrl = `${error.config?.baseURL || ''}${error.config?.url || ''}`;
    console.error(`[API Timeout] ${error.config?.method?.toUpperCase() || ''} ${fullUrl} - Request timed out`);
  } else if (error.message === 'Network Error') {
    const fullUrl = `${error.config?.baseURL || ''}${error.config?.url || ''}`;
    console.error(`[API Network Error] ${error.config?.method?.toUpperCase() || ''} ${fullUrl} - ${error.message}`);
  } else {
    console.error('[API Error]', error.message);
  }
}