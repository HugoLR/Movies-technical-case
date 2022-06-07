import axios, { AxiosRequestConfig } from "axios";

export interface IApiRequestConfig extends AxiosRequestConfig {}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});

export default api;
