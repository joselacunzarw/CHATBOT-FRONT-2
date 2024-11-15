import axios from 'axios';
import { config } from '../config';

const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('chatUser') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error API:', error.response || error);
    if (error.response?.status === 401) {
      localStorage.removeItem('chatUser');
      window.location.href = '/';
    }
    throw new Error(error.response?.data?.error || 'Error al enviar mensaje');
  }
);

export const chatApi = {
  async sendMessage(
    question: string,
    history: { content: string; role: 'user' | 'assistant' }[]
  ) {
    try {
      const response = await api.post('/consultar', {
        question,
        history,
        user_data: JSON.parse(localStorage.getItem('chatUser') || '{}')
      });
      return {
        reply: response.data.response || response.data.reply,
      };
    } catch (error: any) {
      console.error('Error al enviar mensaje:', error);
      throw new Error(error.message || 'Error al enviar mensaje');
    }
  },

  async getUserMetrics() {
    try {
      const response = await api.get('/api/user/metrics');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.error || 'Error al obtener métricas'
      );
    }
  },
};