import '../styles/BookById.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';

function BookById() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [status, setStatus] = useState('');
    const [submittedReviews, setSubmittedReviews] = useState([]);

    useEffect(() => {
        fetch(`/books/${id}`).then((res) => {
          if (res.ok){
            res.json().then((data) => {
                setBook(data)
                setStatus(data.status)
            })
          }
        });
      }, [id]);

    function handleDelete() {
        fetch(`/books/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if(res.ok) {
                navigate(`/books?q=${status}`)
            }
        });
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
        setSubmittedReviews([...submittedReviews, reviewData])
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
            <p className="details">{book.description}</p>
          
          <div className="book-action">
          <select
              name="status"
            //   value={formik.values.status}
            //   onChange={formik.handleChange}
            >
              <option value="read">Read</option>
              <option value="want-to-read">Want to Read</option>
            </select>
            <button className='save' onClick={handleStatusChange}>Save</button>
            <button className='delete' onClick={handleDelete}>Delete Book</button>
          </div>
          <div className='review-form'>
            <ReviewForm onReviewSubmit={handleReviewSubmit} bookId={id}/>
          </div>
          <div className='submitted-reviews'>
            {submittedReviews.map((review, index) => (
              <div key={index} className='review'>
                <p>Review: {review.review}</p>
                <p>Rating: {review.rating}</p>
                </div>
              ))}
            </div>
        </div>
        </div>
      );
    }

export default BookById;