import { useEffect, useMemo, useState } from "react";
import ChatSection from "../components/ChatSection";
import Navbar from "../components/Navbar";
import PeopleSection from "../components/PeopleSection";
import { io } from "socket.io-client";

export default function Home() {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const messageData = JSON.parse(sessionStorage.getItem("Message Data")) || [];
  const [username, setUsername] = useState(
    JSON.parse(sessionStorage.getItem("Username"))
  );
  const [messages, setMessages] = useState([...messageData]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("id : ", socket.id, " is connected");

      socket.on("message", (msg) => {
        const newData = [...messages, msg];
        console.log(newData);
        setMessages((prevMessages) => {
          const newData = [...prevMessages, msg];
          console.log(newData);
          sessionStorage.setItem("Message Data", JSON.stringify(newData));
          return newData;
        });
      });
    });

    socket.on("disconnect", () => {
      console.log("id : ", socket.id, " is connected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <>
      <Navbar username={username} setUsername={setUsername} />
      <div className="app-section">
        <PeopleSection />
        <ChatSection socket={socket} messages={messages} username={username} />
      </div>
    </>
  );
}
