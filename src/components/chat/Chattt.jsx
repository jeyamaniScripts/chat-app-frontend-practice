import React, { useEffect } from "react";
import { socket } from "../../socket";
import { useUser } from "../../context/UserContext";
const Chattt = () => {
  //   console.log(socket);
  const { user, setChats } = useUser();

  // 🔌 SOCKET CONNECT
  useEffect(() => {
    if (!user?.token) return;
    // console.log("soc", socket.connect);

    if (!socket.connected) {
      socket.auth = { token: user.token };
      console.log(socket);

      socket.connect();
    }
    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });
    return () => socket.off("connect");
  }, [user?.token]);

  return <div>Chattt</div>;
};

export default Chattt;
