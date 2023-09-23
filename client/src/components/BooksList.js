import '../styles/BookList.css';
import React, { useEffect, useState } from 'react';
import BookCard from './BookCard'; 

function BookList({ status }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch(`/books?q=${status}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
  }, [status]);

  if (isLoading) {
    return <div>Loading books...</div>;
  }

  if (books.length === 0) {
    return <div>No books found.</div>;
  }

  return (
    <div className="book-list">
      <div className="book-cards">
      <h1>{status.charAt(0).toUpperCase() + status.slice(1)} Books</h1>
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