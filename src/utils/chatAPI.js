import axios from "axios";

const chatAPI = axios.create({
  baseURL: "https://chat-app-back-chat.onrender.com",
});

chatAPI.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default chatAPI;
