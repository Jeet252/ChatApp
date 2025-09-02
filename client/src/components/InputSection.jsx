import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { FaRegImage } from "react-icons/fa";

export default function InputSection({ socket, username }) {
  const [inputValue, setInputValue] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [inputType, setInputType] = useState({
    type: "text",
    click: false,
  });

  const handleClick = (e) => {
    let id = e.target.closest("span").id;
    let newData = { ...inputType };
    console.log(id);
    if (id === "plus") {
      setInputType({ ...newData, click: !newData.click });
    } else if (id === "image") {
      setInputType({ click: !newData.click, type: id });
    } else if (id === "text") {
      setInputType({ click: !newData.click, type: id });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileValue) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result;
        await socket.emit("message", {
          sender: username,
          senderId: socket.id,
          image: new Uint8Array(result),
        });
        setFileValue("");
      };
      reader.readAsArrayBuffer(fileValue);
    } else if (inputValue.trim() !== "" && inputValue !== "") {
      socket.emit("message", {
        sender: username,
        message: inputValue,
        senderId: socket.id,
      });
      setInputValue("");
    }
  };

  return (
    <form className="message-input-section" onSubmit={handleSubmit}>
      <div className="icons-container">
        <div className="toggle-input-icons" onClick={handleClick}>
          <div
            className="toggle-input-icons-container"
            style={{ display: `${inputType.click ? "flex" : "none"}` }}
          >
            <span id="image">
              <FaRegImage size={20} />
            </span>
            <span id="text">
              <IoText />
            </span>
          </div>
          <span id="plus" className="plus-icon">
            <GoPlus
              size={28}
              style={{
                transform: inputType.click ? "rotate(225deg)" : "rotate(0deg)",
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </span>
        </div>
      </div>
      {inputType.type === "image" && (
        <input
          accept="image/*"
          className="input-image"
          type="file"
          onChange={(e) => setFileValue(e.target.files[0])}
        />
      )}
      {inputType.type === "text" && (
        <input
          type="text"
          className="input-text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
      <button type="submit" className="send-message-btn">
        <IoIosSend />
      </button>
    </form>
  );
}
