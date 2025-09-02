import "./App.css";
import "./ResponsiveCSS.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import { useEffect, useState } from "react";
import SvgLoader from "./components/SvgLoader";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(
    JSON.parse(sessionStorage.getItem("Username"))
  );

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

  useEffect(() => {
    (async () => {
      if (!username) {
        setIsLoading(true);
        const tempUsername = await fetchUsername();
        setUsername(tempUsername);
        sessionStorage.setItem("Username", JSON.stringify(tempUsername));
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
              <div className="homePage-loading">
                <SvgLoader label={"Server"} />
              </div>
            ) : (
              <Home username={username} setUsername={setUsername} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
