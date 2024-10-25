import axios from 'axios';

export default function renderApi() {
  return axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}
