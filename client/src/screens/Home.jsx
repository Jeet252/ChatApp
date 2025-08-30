import { useEffect, useMemo, useState } from "react";
import ChatSection from "../components/ChatSection";
import Navbar from "../components/Navbar";
import PeopleSection from "../components/PeopleSection";
import { io } from "socket.io-client";

export default function Home() {
  const socket = useMemo(() => io(import.meta.env.VITE_API_URL), []);
  const [users, setUsers] = useState(new Map());
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(
    JSON.parse(sessionStorage.getItem("Username"))
  );
  const [isHigherInnerWidth, setIsHigherInnerWidth] = useState(
    window.innerWidth < 750 // false for pc
  );
  const [forResponsiveDesign, setForResponsiveDesign] = useState([
    {
      display: "flex",
    },
    {
      display: `${isHigherInnerWidth ? "none" : "flex"}`,
    },
  ]);

  useEffect(() => {
    setIsHigherInnerWidth(window.innerWidth < 750);
    socket.on("connect", () => {
      socket.emit("Connection Established", username);
      socket.on("Users in Room", (data) => {
        setUsers(() => {
          const newData = new Map(data);
          newData.delete(socket.id);
          return newData;
        });
      });
      socket.on("message", (data) => {
        if (data.oldUsername) {
          setMessages((prevMessages) => {
            const newData = [
              ...prevMessages,
              `${data.oldUsername} has change username to ${data.newUsername}`,
            ];
            return newData;
          });
        } else if (typeof data === "string" || data.message) {
          setMessages((prevMessages) => {
            const newData = [...prevMessages, data];
            return newData;
          });
        } else {
          setMessages((prevMessages) => {
            const newData = [...prevMessages, data.announcement];
            return newData;
          });
        }
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
        <PeopleSection
          users={users}
          rooms={rooms}
          forResponsiveDesign={forResponsiveDesign}
          setForResponsiveDesign={setForResponsiveDesign}
          socket={socket}
        />
        <ChatSection
          forResponsiveDesign={forResponsiveDesign}
          setForResponsiveDesign={setForResponsiveDesign}
          socket={socket}
          messages={messages}
          username={username}
        />
      </div>
    </>
  );
}
