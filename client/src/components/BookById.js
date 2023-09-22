import '../styles/BookById.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookById() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [status, setStatus] = useState('');
    const [isInfoVisible, setIsInfoVisible] = useState(true);

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

    function handleStatusChange(){
        fetch(`/books/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({status}),
        }).then((res) => {
            if(res.ok) {
                navigate(`/books?q=${status}`)
            }
        });
      }

    function toggleInfoVisibility() {
        setIsInfoVisible(!isInfoVisible);
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
            <a className="book-title-link" href="#">
              {book.title}
            </a>
            <span className="author-line">by {book.author}</span>
            <p className="details">{book.description}</p>
          </div>
          <div className="book-action">
            <p>Status: {book.status}</p>
            <label htmlFor="status">Change Status:</label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <button onClick={handleStatusChange}>Save</button>
            <button onClick={handleDelete}>Delete Book</button>
          </div>
        </div>
      );
    }

export default BookById;