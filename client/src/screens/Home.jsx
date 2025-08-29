import { useEffect, useMemo, useState } from "react";
import ChatSection from "../components/ChatSection";
import Navbar from "../components/Navbar";
import PeopleSection from "../components/PeopleSection";
import { io } from "socket.io-client";

export default function Home() {
  const socket = useMemo(() => io(import.meta.env.VITE_API_URL), []);
  const messageData = JSON.parse(sessionStorage.getItem("Message Data")) || [];
  const [username, setUsername] = useState(
    JSON.parse(sessionStorage.getItem("Username"))
  );
  const [messages, setMessages] = useState([...messageData]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("Connection Established", username);
      socket.on("Change Username", (data) => {
        console.log(data);
      });
      socket.on("message", (msg) => {
        setMessages((prevMessages) => {
          const newData = [...prevMessages, msg];
          sessionStorage.setItem("Message Data", JSON.stringify(newData));
          return newData;
        });
      });
    });

    socket.on("disconnect");

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <>
      <Navbar socket={socket} username={username} setUsername={setUsername} />
      <div className="app-section">
        <PeopleSection />
        <ChatSection socket={socket} messages={messages} username={username} />
      </div>
    </>
  );
}
