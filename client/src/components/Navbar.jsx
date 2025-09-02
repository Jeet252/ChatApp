import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Panchaiti from "../assets/Panchaiti.png";

export default function Navbar({
  socket,
  username,
  setUsername,
  inputValue,
  setInputValue,
}) {
  const [displayStyle, setDisplayStyle] = useState(true);
  const [changeTabStyle, setChangeTabStyle] = useState(true);

  const toggleDisplay = (e) => {
    if (e.target.textContent !== "Change Username") {
      setDisplayStyle(!displayStyle);
    } else if (e.target.textContent === "Change Username") {
      setChangeTabStyle(!changeTabStyle);
      setDisplayStyle(!displayStyle);
    }
  };

  const handleSetUsername = (e) => {
    e.preventDefault();
    setUsername(inputValue);
    setChangeTabStyle(!changeTabStyle);

    sessionStorage.setItem("Username", JSON.stringify(inputValue));
    socket.emit("Change Username", {
      oldUsername: username,
      newUsername: inputValue,
    });
  };

  return (
    <nav className="navbar">
      <ul>
        <li className="brand-logo">
          <img src={Panchaiti} alt="Panchaiti" />
        </li>
        <li className="brand-name">Panchaiti</li>
      </ul>
      <ul onClick={(e) => toggleDisplay(e)}>
        <li>{username}</li>

        <li>
          <CiMenuKebab />
        </li>
        <li
          className="change-username-section"
          style={{ display: `${displayStyle ? "none" : "flex"}` }}
        >
          Change Username
        </li>
      </ul>
      <div
        className="change-username-tab"
        style={{ display: `${changeTabStyle ? "none" : "flex"}` }}
      >
        <form
          onSubmit={(e) => handleSetUsername(e)}
          className="change-username-tab-inputsection"
        >
          <p>Username require Minimum 3 or Maximum 10 Character</p>
          <input
            minLength={3}
            maxLength={10}
            type="text"
            name=""
            id=""
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Set Username</button>
        </form>
      </div>
    </nav>
  );
}
