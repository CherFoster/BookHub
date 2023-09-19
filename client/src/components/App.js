import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import NavBar from "./NavBar";
import Home from "./Home";
import BooksList from './BooksList';
import AddBookForm from './AddBookForm';
import AllBooks from "./AllBooks";

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  console.log(books);

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

  if (!user) return <LoginPage onLogin={setUser} />;

  return (
      <>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/home" element={<Home user={user} books={books}/>} />
          <Route path="/books" element={<AllBooks books={books} />} />
          <Route path="/books/new" element={<AddBookForm />} />
          <Route path="/books/read" element={<BooksList status="read" />} />
          <Route path="/books/want-to-read" element={<BooksList status="want-to-read" />} />
        </Routes>
      </>
  );
}

export default App;
