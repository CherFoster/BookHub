import '../styles/Login.css';
import React, { useState } from "react";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((res) => {
          setIsLoading(false);
          if (res.ok) {
            res.json().then((user) => onLogin(user));
          } else {
                res.json().then((err) => {
                    setErrors(err.errors || ["An error occured"]);
            });
          }
        });
      }

    return (
        <div className="login-box">
            <h2>Login</h2>
            <form onSumbit={handleSubmit}>
                <div className="user-box">
                    <input 
                    type="text" 
                    name="" 
                    value={username}
                    required 
                    onChange={(e) => setUsername(e.target.value)} />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input 
                    type="password" 
                    name="" 
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)} />
                    <label>Password</label>
                </div>
                <button type="submit" className="submit-button">
                    {isLoading ? "Loading..." : "Login"}
                </button>
                <div className='error-messages'>
                    {errors.map((error) => (
                        <p key={error}>{error}</p>))}
                </div>
            </form>
        </div>
    );
}

export default Login;