import '../styles/BookById.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';

function BookById({ user }) {
  const {id} = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(true);
  const [reviewFormData, setReviewFormData] = useState({
    review: '', 
    rating: 0,
  });

  useEffect(() => {
    fetch(`/books/${id}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setBook(data);
            setStatus(data.status);
            setSubmittedReviews(data.reviews);
            setShowReviewForm(data.reviews.length === 0);
          });
        }
      });
    }, [id, user]);

  function handleDelete() {
    fetch(`/books/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if(res.ok) {
        navigate(`/`)
      }
    })
  }

  function handleStatusChange() {
    fetch(`/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status}),
    }).then((res) => {
      if(res.ok) {
        navigate(`/`)
      }
    });
  }

  function handleReviewSubmit() {
    fetch(`/books/${id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    })
    .then((res) => {
      if (res.ok) {
        // Clear the review form after successful submission
        setReviewFormData({
          review: '',
          rating: 0,
        });
        // Fetch the updated book details, including reviews, from the server
        fetch(`/books/${id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Failed to fetch book data after review submission');
          }
        })
        .then((data) => {
          setBook(data);
          setStatus(data.status);
          setSubmittedReviews(data.reviews);
        })
        .catch((error) => {
          console.error(error);
        });
      }
    });
  }


  if (!book) {
    return <div>Loading...</div>;
  }
    
  return (
    <div className="book">
      <div className="book-cover">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="book-info">
        <div className="book-title">{book.title}</div>
          <span className="author-line"> by {book.author}</span>
          <p className="details" >{book.description}</p>
          
        <div className="book-action">
          <select
          name="status"
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          >
            <option value="read">Read</option>
            <option value="want-to-read">Want to Read</option>
            </select>
          <button className='save' onClick={handleStatusChange}>Save</button>
          <button className='delete' onClick={handleDelete}>Delete Book</button>
        </div>
        <div className='review-form'>
          {showReviewForm && (
            <ReviewForm
              onReviewSubmit={handleReviewSubmit}
              bookId={id}
              reviewFormData={reviewFormData}
              setReviewFormData={setReviewFormData} />
              )}
          </div>
          <div className='submitted-reviews'>
            {submittedReviews.map((review, index) => (
              <div key={index} className='review'>
                <p className='review'>Review: {review.review}</p>
                <p className='rating'>Rating: {review.rating}/10</p>
              </div>
              ))}
          </div>
      </div>
    </div>
    );
  }

export default BookById;