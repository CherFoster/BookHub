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

    useEffect(() => {
        // Load submitted reviews from localStorage when the component mounts
        const storedReviews = localStorage.getItem('submittedReviews');
        if (storedReviews) {
            setSubmittedReviews(JSON.parse(storedReviews));
        }
    
        // Load showReviewForm state from localStorage
        const storedShowReviewForm = localStorage.getItem('showReviewForm');
        if (storedShowReviewForm) {
            setShowReviewForm(JSON.parse(storedShowReviewForm));
        }
    
        fetch(`/books/${id}`)
            .then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        setBook(data);
                        setStatus(data.status);
    
                        // Check if user exists and has an 'id' property before filtering reviews
                        if (user && user.id) {
                            const userReviews = data.reviews.filter((review) => review.user_id === user.id);
                            setSubmittedReviews(userReviews);
                        }
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

      function handleReviewSubmit(reviewData) {
        // Update submitted reviews and store them in localStorage
        const updatedReviews = [...submittedReviews, reviewData];
        setSubmittedReviews(updatedReviews);
        localStorage.setItem('submittedReviews', JSON.stringify(updatedReviews));
    
        setShowReviewForm(false); // Hide the review form after submission

        // Store the updated showReviewForm state in localStorage
        localStorage.setItem('showReviewForm', JSON.stringify(false));
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
            value={status} // Connect the value to the 'status' state
            onChange={(e) => setStatus(e.target.value)} // Update the 'status' state on change
            >
              <option value="read">Read</option>
              <option value="want-to-read">Want to Read</option>
            </select>
            <button className='save' onClick={handleStatusChange}>Save</button>
            <button className='delete' onClick={handleDelete}>Delete Book</button>
          </div>
          <div className='review-form'>
           {showReviewForm && <ReviewForm onReviewSubmit={handleReviewSubmit} bookId={id} />}
        </div>
          <div className='submitted-reviews'>
            {submittedReviews.map((review, index) => (
              <div key={index} className='review'>
                <p className='review'>Review: {review.review}</p>
                <p className='rating'>Rating: {review.rating}</p>
                </div>
              ))}
            </div>
        </div>
        </div>
      );
    }

export default BookById;