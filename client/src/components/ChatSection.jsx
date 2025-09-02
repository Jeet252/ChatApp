import { IoArrowBack } from "react-icons/io5";
import Announcement from "./Announcement";
import MessageBubble from "./MessageBubble";
import ImageBubble from "./ImageBubble";
import InputSection from "./InputSection";

export default function ChatSection({
  socket,
  username,
  messages,
  responsiveCSS,
  setResponsiveCSS,
}) {
  const handleBack = () => {
    setResponsiveCSS(!responsiveCSS);
  };

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
          } else if (elem.image) {
            return <ImageBubble data={elem} key={index} socket={socket} />;
          } else if (elem.message) {
            return <MessageBubble key={index} data={elem} socket={socket} />;
          }
        })}
      </div>
      <InputSection socket={socket} username={username} />
    </div>
  );
}
