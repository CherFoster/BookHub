import React from "react";
import './styles/Signup.css';

function Signup() {


    return (
        <div class="signup-box">
            <h2>Signup</h2>
            <form>
                <div class="user-box">
                    <input type="text" id="username" name="username" required />
                    <label for="username">Create a Username</label>
                </div>
                <div class="user-box">
                    <input type="password" id="password" name="password" required />
                    <label for="password">Create a Password</label>
                </div>
                <button type="submit" class="submit-button">
                    SIGNUP
                </button>
            </form>
        </div>
      );
    }
    
    export default Signup;