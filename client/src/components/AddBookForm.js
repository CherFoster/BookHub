import '../styles/AddBookForm.css';
import React, { useState } from 'react';

function AddBookForm({ onAddBook }) {
    const [bookData, setBookData] = useState({
      title: '',
      author: '',
      description: '',
      image: '',
      status: 'want-to-read',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setBookData({ ...bookData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddBook(bookData);
      // reset the form fields
      setBookData({
        title: '',
        author: '',
        description: '',
        image: '',
        status: 'want-to-read',
      });
    };
  
    return (
      <div className="add-box">
        <h2>Add Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="title"
              value={bookData.title}
              required
              onChange={handleChange}
            />
            <label>Title</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="author"
              value={bookData.author}
              required
              onChange={handleChange}
            />
            <label>Author</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="description"
              value={bookData.description}
              required
              onChange={handleChange}
            />
            <label>Description</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="image"
              value={bookData.image}
              required
              onChange={handleChange}
            />
            <label>Image URL</label>
          </div>
          <div className="user-box">
            <select
              name="status"
              value={bookData.status}
              onChange={handleChange}
            >
              <option value="read">Read</option>
              <option value="want-to-read">Want to Read</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            {bookData.isLoading ? 'Loading...' : 'Add Book'}
          </button>
        </form>
      </div>
    );
  }
  

export default AddBookForm;