import axios from "axios";

const httpClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://straitpay.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("userInfo"))
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")!).token
      }`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default httpClient;
