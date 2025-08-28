import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";

export default function Navbar({ username, setUsername }) {
  const [displayStyle, setDisplayStyle] = useState(true);
  const [changeTabStyle, setChangeTabStyle] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const toggleDisplay = (e) => {
    console.log("object");
    if (e.target.textContent !== "Change Username") {
      setDisplayStyle(!displayStyle);
    } else if (e.target.textContent === "Change Username") {
      setChangeTabStyle(!changeTabStyle);
      setDisplayStyle(!displayStyle);
    }
  };
  return (
    <nav className="navbar">
      <ul>ChatApp</ul>
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
        <div className="change-username-tab-inputsection">
          <input
            type="text"
            name=""
            id=""
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={() => {
              setUsername(inputValue);
              setChangeTabStyle(!changeTabStyle);
            }}
          >
            Set Username
          </button>
        </div>
      </div>
    </nav>
  );
}
