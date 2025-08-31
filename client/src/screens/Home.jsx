import { useEffect, useMemo, useState } from "react";
import ChatSection from "../components/ChatSection";
import Navbar from "../components/Navbar";
import PeopleSection from "../components/PeopleSection";
import { io } from "socket.io-client";
import SvgLoader from "../components/SvgLoader";

export default function Home() {
  const socket = useMemo(() => io(import.meta.env.VITE_API_URL), []);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(new Map());
  const [messages, setMessages] = useState([]);
  const [responsiveCSS, setResponsiveCSS] = useState(true);
  const [username, setUsername] = useState(
    JSON.parse(sessionStorage.getItem("Username"))
  );

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
      {isLoading ? (
        <div className="homePage-loading">
          <SvgLoader label={"Server"} />
        </div>
      ) : (
        <div>
          <Navbar
            socket={socket}
            username={username}
            setUsername={setUsername}
            setIsLoading={setIsLoading}
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
      )}
    </>
  );
}
