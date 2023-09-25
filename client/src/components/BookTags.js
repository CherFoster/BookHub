import '../styles/BookTags.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from './BookCard';

function BookTags() {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [matchingBooks, setMatchingBooks] = useState([]);

  // Fetch the list of genres when the component mounts
  useEffect(() => {
    fetch('/tag')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch genres');
        }
      })
      .then((data) => {
        setGenres(data);
      })
  }, []);

  // Fetch matching books when the selected genre changes
  useEffect(() => {
    if (genre) {
      fetch(`/tag/${genre}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } 
        })
        .then((data) => {
          setMatchingBooks(data);
          console.log('Matching books:', data); 
        })
    } else {
      // Reset matching books when no genre is selected
      setMatchingBooks([]);
    }
  }, [genre]);

  const handleSearch = () => {
    if (selectedGenre) {
        console.log('Searching for genre:', selectedGenre);
        navigate(`/tag/${selectedGenre}`);
    }
  };

  return (
    <div>
      <div className='custom-dropdown big'>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Select a genre</option>
          {/* filter through duplicates of the same genre */}
          {/* creates a new array by converting it to a Set and then back to an array */}
          {Array.from(new Set(genres)).map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      {matchingBooks.length > 0 ? (
        <div>
          <h3>Matching Books:</h3>
          <ul className="book-list">
            {matchingBooks.map((book) => (
              <li key={book.id}>
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        matchingBooks.length === 0 && <p>No matching books found.</p>
      )}
    </div>
  );
}

export default BookTags;