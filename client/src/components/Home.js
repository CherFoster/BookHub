import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BooksList from './BooksList'; 

function Home({ user }) {
    return (
      <div className='home-container'>
        <h2>Welcome to BookHub, {user.username}!</h2>
        <div className='links'>
          <div className='link'>
            <h3>
              <Link to="/books">All Books</Link>
            </h3>
          </div>
          <div className='link'>
            <h3>
              <Link to="/books/read">Books You've Read</Link>
            </h3>
          </div>
          <div className='link'>
            <h3>
              <Link to="/books/want-to-read">Books You Want to Read</Link>
            </h3>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;