import '../styles/Signup.css';
import React from "react";

function Signup() {


    return (
        <div className="signup-box">
            <h2>Signup</h2>
            <form>
                <div className="user-box">
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="username">Create a Username</label>
                </div>
                <div className="user-box">
                    <input type="password" id="password" name="password" required />
                    <label htmlFor="password">Create a Password</label>
                </div>
                <button type="submit" className="submit-button">
                    SIGNUP
                </button>
            </form>
        </div>
      );
    }
    
    export default Signup;