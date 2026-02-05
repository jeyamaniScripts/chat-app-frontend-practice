import { io } from "socket.io-client";

// export const socket = io("http://localhost:4000", {
//   autoConnect: false,
//   withCredentials: true,
// });
export const socket = io("https://chat-app-chatservice.onrender.com", {
  autoConnect: false,
  withCredentials: true,
});
