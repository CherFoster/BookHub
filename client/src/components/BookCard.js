import React from 'react';

function BookCard({ book }) {
    const { title, author, description, image, genre, status } = book;
  
    return (
      <div className="book-card">
        <img src={image} alt={title} />
        <div className='book-info'>
          <h3>{title}</h3>
          <p>By: {author}</p>
          <p>{description}</p>
          <p>{genre}</p>
          <p>{status}</p>
        </div>
      </div>
    );
  }
  
  export default BookCard;