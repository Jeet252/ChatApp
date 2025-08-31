import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function ChatSection({
  socket,
  username,
  messages,
  responsiveCSS,
  setResponsiveCSS,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleBack = () => {
    setResponsiveCSS(!responsiveCSS);
  };
  const handleSend = () => {
    if (inputValue !== "") {
      socket.emit("message", {
        sender: username,
        message: inputValue.trim(),
        senderId: socket.id,
      });
      setInputValue("");
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
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
        {messages.map((elem, index) =>
          typeof elem === "string" ? (
            <p key={index} className="message-string">
              {elem}
            </p>
          ) : (
            <ul
              key={index}
              className={`message-bubble ${
                elem.senderId === socket.id ? "sent" : "received"
              }`}
            >
              <span
                className="sender-name"
                style={{
                  display: `${elem.senderId === socket.id ? "none" : "flex"}`,
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
          onKeyDown={(e) => handleEnter(e)}
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
