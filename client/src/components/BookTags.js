import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookCard from './BookCard';

function BookTags() {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [matchingBooks, setMatchingBooks] = useState([]);
  const [error, setError] = useState(null);

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
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Fetch matching books when the selected genre changes
  useEffect(() => {
    if (genre) {
      // Fetch books for the selected genre
      fetch(`/tag/${genre}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('An error occurred while fetching books.');
          }
        })
        .then((data) => {
          setMatchingBooks(data);
          console.log('Matching books:', data); 
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      // Reset matching books when no genre is selected
      setMatchingBooks([]);
    }
  }, [genre]);

  // Handle search when the "Search" button is clicked
  const handleSearch = () => {
    if (selectedGenre) {
      // Construct the URL for the selected genre
      const url = `/tag/${selectedGenre}`;
      // Navigate to the selected genre's route
      navigate(url);
    }
  };

  return (
    <div>
      <h3>Search by Genre</h3>
      <div>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Select a genre</option>
          {Array.from(new Set(genres)).map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

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
        <p>No matching books found.</p>
      )}
    </div>
  );
}

export default BookTags;
{/* filter through duplicates of the same genre */}
{/* creates a new array by converting it to a Set and then back to an array */}