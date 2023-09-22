import '../styles/Home.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Home({ user }) {
  return (
    <div className='home-container'>
      <h2>Welcome to BookHub, {user.username}!</h2>
      <h4>
        Your all-in-one companion for managing your reading experience.
        <br />
        With BookHub, you can effortlessly upload, track, and review the books
        you've read
        <br />
        and want to read, making it easier than ever to dive into your next
        literary adventure.
        <br />
        <br />
        Check out the links below to view your books, or start adding books by clicking the 
        <br/>
        "Add a book" button at the top of the page.
      </h4>
      <div className='links'>
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