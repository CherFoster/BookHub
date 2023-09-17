import '../styles/LoginPage.css';
import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

function LoginPage({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="login-page">
            <div className="title-container">
                <h1>Welcome to BookHub</h1>
            </div>
            {showLogin ? (
                <>
                    <LoginForm onLogin={onLogin}/>
                    <br></br>
                    <p>
                      Don't have an account?
                        <button onClick={() => setShowLogin(false)}>
                          Sign Up 
                        </button>
                    </p>
                </>
            ) : (
                <>
                    <SignupForm onLogin={onLogin} />
                    <br></br>
                    <p>
                        Already have an account?
                          <button onClick={() => setShowLogin(true)}>
                            Log In
                          </button>
                    </p>
                </>
            )}
        </div>
    );
}

export default LoginPage;