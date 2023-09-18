// import React, { useEffect, useState } from 'react';

// function BooksList({ status }) {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetch(`/books/${status}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setBooks(data);
//       });
//   }, [status]);

//   return (
//     <div>
//       <ul>
//         {books.map((book) => (
//           <li key={book.id}>
//             {book.title} by {book.author}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default BooksList;