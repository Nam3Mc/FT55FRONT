import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export const useWebsocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const socket = io(url);
    setSocket(socket);
    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("disconnect", () => {
      setConnected(false);
    });
    socket.on("newMessage", (data: any) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.close();
    };
  }, [url]);
  const sendMessage = (message: any) => {
    const serverMessage = {
      message,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };
    socket?.emit("sendMessage", message);
  };

  return; //aca va todo el renderizado de la pagina
};
