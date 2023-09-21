import React from 'react';
import {Link} from 'react-router-dom';

function BookCard({ book }) {
    const { id, title, author, description, image, genre, status } = book;
  
    return (
        <div id={id}>
            <Link to={`/books/${id}`}> 
            <div className="book-card">
                <img src={image} alt={title} />
                <div className='book-info'>
                <h3>{title}</h3>
                <p>By: {author}</p>
                <p>{genre}</p>
                <p>{status}</p>
                </div>
            </div>
            </Link>
      </div>
    );
  }
  
  export default BookCard;