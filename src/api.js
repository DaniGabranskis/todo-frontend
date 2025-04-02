import axios from 'axios';

const API = axios.create({
  baseURL: 'https://todo-backend-app-bke5evh2h9f2efba.westeurope-01.azurewebsites.net/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

