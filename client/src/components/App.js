import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import LoginPage from "./LoginPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((res) => {
      if (res.ok){
        res.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <LoginPage onLogin={setUser} />;

  return (
    <div>
      <Router>
        <Routes>
          ?
        </Routes>
      </Router>
      

    </div>
  );

}

export default App;
