import React, { useState, useEffect } from 'react';

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
        <div>
          <h2>Welcome to BookHub, {user.username}!</h2>
          <div>
            <h3>Books You've Read</h3>
            <ul>
              {readBooks.map((book) => (
                <li key={book.id}>
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>
          </div>
    
          <div>
            <h3>Books You Want to Read</h3>
            <ul>
              {wantToReadBooks.map((book) => (
                <li key={book.id}>
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    
export default Home;