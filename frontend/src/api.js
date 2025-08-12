import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

export default API;
