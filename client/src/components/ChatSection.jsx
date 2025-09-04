import { IoArrowBack } from "react-icons/io5";
import Announcement from "./Announcement";
import MessageBubble from "./MessageBubble";
import ImageBubble from "./ImageBubble";
import InputSection from "./InputSection";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdDownload } from "react-icons/io";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

export default function ChatSection({
  socket,
  username,
  messages,
  responsiveCSS,
  setResponsiveCSS,
}) {
  const [element, setElement] = useState(false);
  const handleBack = () => {
    setResponsiveCSS(!responsiveCSS);
  };
  const handleClick = (e, data) => {
    const id = e.target.closest("li").id;
    if (id === "menu") {
      setElement(!element);
    } else if (id === "copy") {
      setElement(!element);
    } else if (id === "download") {
      saveAs(data.image, data.fileName);
      setElement(!element);
    }
    console.log(id);
  };
  useEffect(() => {}, []);
  return (
    <div
      className={`chat-section ${
        responsiveCSS ? "for-dynamic-chat-section" : ""
      }`}
    >
      <div className="chat-section-header">
        <div className="back-logo" onClick={handleBack}>
          <IoArrowBack size={32} />
        </div>
        <span>Room Name</span>
      </div>
      <div className="messages-section">
        {messages.map((elem, index) => {
          if (typeof elem === "string") {
            return <Announcement key={index} content={elem} />;
          } else {
            return (
              <ul
                key={index}
                className={`message-bubble ${
                  elem.senderId === socket.id ? "sent" : "received"
                }`}
              >
                <div
                  className="sender-name"
                  style={{
                    display: `${elem.senderId === socket.id ? "none" : "flex"}`,
                  }}
                >
                  <p>{elem.sender}</p>
                  <div
                    className="bubble-icons"
                    onClick={(e) => handleClick(e, elem)}
                  >
                    <li id="menu">
                      <CiMenuKebab />
                    </li>
                    <span
                      onMouseLeave={() => setElement(!element)}
                      className={`bubble-icons-group ${
                        element ? "flex" : "none"
                      }`}
                    >
                      <li
                        id="copy"
                        style={{ display: `${elem.message ? "flex" : "none"}` }}
                      >
                        Copy
                      </li>
                      <li
                        id="download"
                        style={{ display: `${elem.image ? "flex" : "none"}` }}
                      >
                        <IoMdDownload />
                      </li>
                    </span>
                  </div>
                </div>
                {elem.image ? (
                  <ImageBubble data={elem} />
                ) : elem.message ? (
                  <MessageBubble data={elem} />
                ) : (
                  ""
                )}
              </ul>
            );
          }
        })}
      </div>
      <InputSection socket={socket} username={username} />
    </div>
  );
}
