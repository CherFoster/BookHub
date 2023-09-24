import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import NavBar from "./NavBar";
import Home from "./Home";
import BooksList from './BooksList';
import AddBookForm from './AddBookForm';
import BookById from "./BookById";
import BookTags from "./BookTags";

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books')
    .then((res) => res.json())
    .then((data) => {
      setBooks(data)
    });
  }, [])

  useEffect(() => {
    fetch("/check_session").then((res) => {
      if (res.ok){
        res.json().then((user) => setUser(user));
      }
    });
  }, []);

  const addBook = (book) => {
    setBooks((current) => {
      // Ensure current is an array by using Array.from
      const currentArray = Array.isArray(current) ? current : [];
      return [...currentArray, book];
    });
  };

  if (!user) return <LoginPage onLogin={setUser} />;

  return (
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/home" element={<Home user={user} books={books}/>} />
          <Route path="/books/new" element={<AddBookForm addBook={addBook}/>} />
          <Route path="/books/:id" element={<BookById />} />
          <Route path="/books/read" element={<BooksList status="read" />} />
          <Route path="/books/want-to-read" element={<BooksList status="want-to-read" />} />
          <Route path="/tag" element={<BookTags />} />
          <Route path="/tag/:genre" element={<BookTags />} />
        </Routes>
      </>
  );
}

export default App;
