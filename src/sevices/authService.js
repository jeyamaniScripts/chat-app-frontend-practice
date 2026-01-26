import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/user",
});

// LOGIN
export const loginUser = async (email, password) => {
  const { data } = await API.post("/login", { email, password });
  return data;
};

// REGISTER
export const registerUser = async (userData) => {
  const { data } = await API.post("/register", userData);
  return data;
};
