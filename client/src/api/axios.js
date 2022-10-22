import axios from 'axios';
const url = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4000/api';

const baseURL = url;

export default axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
