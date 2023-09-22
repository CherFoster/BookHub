import '../styles/BookList.css';
import React, { useEffect, useState } from 'react';
import BookCard from './BookCard'; 

function BookList({ status }) {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetch(`/books?q=${status}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        console.log(data);
      })
  }, [status]);

  if (books.length === 0) {
    return <div>No books found for this status.</div>;
  }

  return (
    <div className="book-list">
      <div className="book-cards">
      <h1>{status.charAt(0).toUpperCase() + status.slice(1)} Book List</h1>
        <ul>
            {books.map((book) => (
            <li key={book.id}>
                <BookCard book={book}/>
            </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default BookList;