import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home({ user }) {
    const [readBooks, setReadBooks] = useState([]);
    const [wantToReadBooks, setWantToReadBooks] = useState([]);

    useEffect(() => {
        fetch('/books/read')
        .then((res) => res.json())
        .then((data) => {
            setReadBooks(data)
        })
    }, []);

    useEffect(() => {
        fetch('/books/want-to-read')
        .then((res) => res.json())
        .then((data) => {
            setWantToReadBooks(data)
        })
    }, []);

    return (
        <div className='home-container'>
          <h2>Welcome to BookHub, {user.username}!</h2>
          <div className='links'>
            <div className='link'>
              <h3>
                <Link to="/read">Books You've Read</Link>
              </h3>
              <ul>
                {readBooks.map((book) => (
                  <li key={book.id}>
                    {book.title} by {book.author}
                  </li>
                ))}
              </ul>
            </div>
    
            <div className='link'>
              <h3>
                <Link to="/want-to-read">Books You Want to Read</Link>
              </h3>
              <ul>
                {wantToReadBooks.map((book) => (
                  <li key={book.id}>
                    {book.title} by {book.author}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    
export default Home;