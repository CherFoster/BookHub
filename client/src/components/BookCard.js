import '../styles/BookCard.css';
import React from 'react';
import {Link} from 'react-router-dom';

function BookCard({ book }) {
    const { id, title, author, genre, status, image } = book;
  
    return (
      <div className="book-card">
        <Link to={`/books/${id}`} className="book-card__link">
          <div
            className="book-card__cover"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="book-card__title">{title}</div>
            <div className="book-card__info">
              {/* <h3 className="book-card__title">{title}</h3> */}
              <p className="book-card__author">By: {author}</p>
              <p className="book-card__genre">{genre}</p>
              <p className="book-card__status">{status}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  
  export default BookCard;