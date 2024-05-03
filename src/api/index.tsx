import axios from 'axios';

export function createClient() {
  return axios.create({
    baseURL: 'https://auth-app-server-pm6d.onrender.com',
    withCredentials: true,
  });
};
