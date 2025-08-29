import { useEffect, useState } from "react";

export default function ChatSection({ socket, username, messages }) {
  const [inputValue, setInputValue] = useState("");
  const handleSend = () => {
    socket.emit("message", { sender: username, message: inputValue });
    setInputValue("");
  };
  return (
    <div className="chat-section">
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
