import axios from "axios";
const server_URL = import.meta.env.VITE_SERVER_URL;

const httpClient = axios.create({
  baseURL: server_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
