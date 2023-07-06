import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
});

api.interceptors.request.use((config) => {
  const token = cookies['caparao.token'];
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
