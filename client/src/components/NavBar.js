// import { useHistory } from 'react-router-dom';
import '../styles/NavBar.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
    // const history = useHistory();


    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                setUser(null)
                // history.push("/login")
            }
        });
    }

    return (
        <div className='navbar'>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/books/new" className="nav-link">Add a Book</Link>
                <button onClick={handleLogout} className="nav-link">Logout</button>
            </div>
        </div>
    )
}

export default NavBar;