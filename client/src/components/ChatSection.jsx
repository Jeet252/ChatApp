import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function ChatSection({
  socket,
  username,
  messages,
  forResponsiveDesign,
  setForResponsiveDesign,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleBack = () => {
    let newdesign = [...forResponsiveDesign];
    newdesign[0] = { display: "none" };
    newdesign[1] = { display: "flex" };
    setForResponsiveDesign(newdesign);
  };
  const handleSend = () => {
    socket.emit("message", { sender: username, message: inputValue });
    setInputValue("");
  };
  return (
    <div className="chat-section" style={forResponsiveDesign[0]}>
      <div className="chat-section-header">
        <div className="back-logo" onClick={handleBack}>
          <IoArrowBack size={32} />
        </div>
        <span>Room Name</span>
      </div>
      <div className="messages-section">
        {messages.map((elem, index) =>
          typeof elem === "string" ? (
            <p key={index} className="message-string">
              {elem}
            </p>
          ) : (
            <ul
              key={index}
              className={`message-bubble ${
                elem.sender === username ? "sent" : "received"
              }`}
            >
              <span
                className="sender-name"
                style={{
                  display: `${elem.sender === username ? "none" : "flex"}`,
                }}
              >
                {elem.sender}
              </span>
              <span>{elem.message}</span>
            </ul>
          )
        )}
      </div>
      <div className="message-input-section">
        <input
          type="text"
          className="input-message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSend} className="send-message-btn">
          Send
        </button>
      </div>
    </div>
  );
}
