import React from "react";
import { Link } from 'react-router-dom';

function AllBooks( {books }) {
    return (
        <div className="all-books">
          <div className="book-list">
            {books.map((book) => (
              <div className="book" key={book.id}>
                <Link to={`/books/${book.id}`} className="book-link">
                  <h2>{book.title}</h2>
                  <h2>{book.author}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
export default AllBooks;