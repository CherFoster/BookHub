import React, { useEffect, useState } from 'react';

function BookList({ status }) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`/books?q=${status}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
  }, []);

  if (books.length === 0) {
    return <div>No books found for this status.</div>;
  }

  return (
    <div className="book-list">
      <h2>{status === 'read' ? 'Read Books' : 'Want to Read Books'}</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;