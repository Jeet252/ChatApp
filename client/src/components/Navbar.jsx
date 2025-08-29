import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Panchaiti from "../assets/Panchaiti.png";

export default function Navbar({ username, setUsername }) {
  const [displayStyle, setDisplayStyle] = useState(true);
  const [changeTabStyle, setChangeTabStyle] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const toggleDisplay = (e) => {
    if (e.target.textContent !== "Change Username") {
      setDisplayStyle(!displayStyle);
    } else if (e.target.textContent === "Change Username") {
      setChangeTabStyle(!changeTabStyle);
      setDisplayStyle(!displayStyle);
    }
  };

  const fetchUsername = async () => {
    try {
      const response = await fetch(
        "https://apilearning.netlify.app/.netlify/functions/api/wordle-words"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch username");
      }
      const data = await response.json();
      return data[Math.floor(Math.random() * (340 - 0 + 1)) + 0];
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const handleSetUsername = (e) => {
    e.preventDefault();
    setUsername(inputValue);
    setChangeTabStyle(!changeTabStyle);
  };

  useEffect(() => {
    (async () => {
      if (!username) {
        const tempUsername = await fetchUsername();
        setUsername(tempUsername);
        sessionStorage.setItem("Username", JSON.stringify(tempUsername));
      }
    })();
  }, []);
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
