import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import { Link } from "react-router-dom"; 


function NavBar({ user, setUser }) {
    const navigate = useNavigate();

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                setUser(null)
                navigate("/login")
            }
        });
    }

    return (
        <div className='navbar'>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/books/new" className="nav-link">Add a Book</Link>
                <Link to="/tag" className="nav-link">Search by Genre</Link>
                <button onClick={handleLogout} className="nav-link">Logout</button>
            </div>
        </div>
    )
}

export default NavBar;