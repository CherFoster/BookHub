// import { useHistory } from 'react-router-dom';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';

function NavBar({ user, setUser }) {
    // const history = useHistory();
    const [menu, setMenu] = useState(false)

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
        {!menu?
        <div onClick={() => setMenu(!menu)}>
            <GiHamburgerMenu size={30}/>
        </div> :
        <ul>
            <li onClick={() => setMenu(!menu)}>x</li>
            <li><Link to='/'>Home</Link></li>
            <li><Link to="/books/new">Add a Book</Link></li>
            <li><Link to='/login'> Login/Signup</Link></li>
            <li onClick={handleLogout}> Logout </li>
        </ul>
        }
    </div>
    )

}

export default NavBar;