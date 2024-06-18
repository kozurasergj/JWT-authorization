import axios from 'axios'

export const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

export default $api
