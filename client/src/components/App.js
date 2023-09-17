import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import LoginPage from "./LoginPage";
import NavBar from "./NavBar";

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
      <Router>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          
        </Routes>
      </Router>
      
  );

}

export default App;
