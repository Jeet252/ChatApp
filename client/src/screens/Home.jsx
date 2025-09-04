import { useEffect, useMemo, useState } from "react";
import ChatSection from "../components/ChatSection";
import Navbar from "../components/Navbar";
import PeopleSection from "../components/PeopleSection";
import { io } from "socket.io-client";

export default function Home({ username, setUsername }) {
  const socket = useMemo(
    () => io(import.meta.env.VITE_API_URL, { transports: ["websocket"] }),
    []
  );
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState(new Map());
  const [messages, setMessages] = useState([]);
  const [responsiveCSS, setResponsiveCSS] = useState(true);

  const recieveMessages = (data) => {
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
    } else if (data.image) {
      const blob = new Blob([data.image], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setMessages((prevMessages) => {
        const newData = [
          ...prevMessages,
          {
            senderId: data.senderId,
            sender: data.sender,
            image: url,
            fileName: "Panchaiti" + data.fileId,
          },
        ];
        return newData;
      });
    } else {
      setMessages((prevMessages) => {
        const newData = [...prevMessages, data.announcement];
        return newData;
      });
    }
  };

  useEffect(() => {
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
        recieveMessages(data);
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [username]);

  return (
    <>
      <div>
        <Navbar
          socket={socket}
          username={username}
          setUsername={setUsername}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <div className="app-section">
          <PeopleSection
            users={users}
            responsiveCSS={responsiveCSS}
            setResponsiveCSS={setResponsiveCSS}
            socket={socket}
          />
          <ChatSection
            responsiveCSS={responsiveCSS}
            setResponsiveCSS={setResponsiveCSS}
            socket={socket}
            messages={messages}
            username={username}
          />
        </div>
      </div>
    </>
  );
}
