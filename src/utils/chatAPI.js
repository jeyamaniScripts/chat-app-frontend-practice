import axios from "axios";

const chatAPI = axios.create({
  baseURL: "http://localhost:4000",
});

chatAPI.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default chatAPI;
