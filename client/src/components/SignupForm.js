import '../styles/Signup.css';
import React, { useState } from "react";

function SignupForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSumbit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password})
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
        <div className="signup-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleSumbit}>
                <div className="user-box">
                    <input
                    type="text" 
                    id="username"
                    name="username"
                    value={username} 
                    required 
                    onChange={(e) => setUsername(e.target.value)}/>
                    <label>Create a Username</label>
                </div>
                <div className="user-box">
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}/>
                    <label>Create a Password</label>
                </div>
                <button type="submit" className="submit-button">
                    {isLoading ? "Loading..." : "Sign Up"}
                </button>
                <div className='error-messages'>
                    {errors.map((error) => (
                        <p key={error}>{error}</p>))}
                </div>
            </form>
        </div>
      );
    }
    
    export default SignupForm;