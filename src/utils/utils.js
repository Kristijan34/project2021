import axios from "axios";
const BASE_URL = "http://djakov.pythonanywhere.com";

axios.defaults.withCredentials = true;

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default api;
