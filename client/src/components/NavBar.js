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
                <button as={Link} to='/'>Home</button>
                <button as={Link} to="/books/new">Add a Book</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )

}

export default NavBar;