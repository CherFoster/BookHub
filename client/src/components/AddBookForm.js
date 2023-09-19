import '../styles/AddBookForm.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import * as yup from "yup"

function AddBookForm() {
    const [bookData, setBookData] = useState({
      title: '',
      author: '',
      description: '',
      genre: '',
      image: '',
      status: 'Want to read',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
      e.preventDefault();
      fetch('/books', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
      })
      .then((res) => {
        if (res.ok) {
          navigate('/home');
        } else {
          res.json().then((err) => setErrors(err.errors))
        }
      })
    }

    function handleChange(e) {
      const {name, value} = e.target;
      setBookData({...bookData, [name]: value})
    }
  
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
            <input
              type="text"
              name="genre"
              value={bookData.genre}
              required
              onChange={handleChange}
            />
            <label>Genre</label>
          </div>
          <div className="user-box">
            <select
              name="status"
              value={bookData.status}
              onChange={handleChange}
            >
              <option value="Read">Read</option>
              <option value="Want to read">Want to Read</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            {bookData.isLoading ? 'Loading...' : 'Add Book'}
          </button>
          <div className='error-messages'>
                    {errors.map((error) => (
                        <p key={error}>{error}</p>))}
                </div>
        </form>
      </div>
    );
  }
  

export default AddBookForm;



// import '../styles/AddBookForm.css';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from "formik";
// import * as yup from "yup";

// function AddBookForm({addBook}) {
//     const navigate = useNavigate();
//     const formSchema = yup.object().shape({
//       title: yup.string().required("Must enter a title"),
//       author: yup.string().required("Must enter an author"),
//     })

//     const formik = useFormik({
//       initialValues: {
//         title: '',
//         author:'',
//         description: '',
//         genre: '',
//         status: 'Want to read'
//       },
//       validationSchema: formSchema,
//       onSubmit: (values) => {
//         fetch('/books', {
//           method:"POST",
//           headers: {
//             "Content-Type" : "application/json",
//           },
//           body: JSON.stringify(values, null)
//         }).then((res) => {
//           if(res.ok) {
//             res.json().then(book => {
//               addBook(book)
//               navigate(`/books/${book.id}`)
//             })
//           }
//         })
//       }
//     })
  
//     return (
//       <div className="add-box">
//         <h2>Add Book</h2>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="user-box">
//             <input
//               type="text"
//               name="title"
//               value={formik.values.title}
//               required
//               onChange={formik.handleChange}
//             />
//             <label>Title</label>
//           </div>
//           <div className="user-box">
//             <input
//               type="text"
//               name="author"
//               value={formik.values.author}
//               required
//               onChange={formik.handleChange}
//             />
//             <label>Author</label>
//           </div>
//           <div className="user-box">
//             <input
//               type="text"
//               name="description"
//               value={formik.values.description}
//               required
//               onChange={formik.handleChange}
//             />
//             <label>Description</label>
//           </div>
//           <div className="user-box">
//             <input
//               type="text"
//               name="image"
//               value={formik.values.image}
//               required
//               onChange={formik.handleChange}
//             />
//             <label>Image URL</label>
//           </div>
//           <div className="user-box">
//             <input
//               type="text"
//               name="genre"
//               value={formik.values.genre}
//               required
//               onChange={formik.handleChange}
//             />
//             <label>Image URL</label>
//             </div>
//           <div className="user-box">
//             <select
//               name="status"
//               value={formik.values.status}
//               onChange={formik.handleChange}
//             >
//               <option value="read">Read</option>
//               <option value="want-to-read">Want to Read</option>
//             </select>
//           </div>
//           <button type="submit" className="submit-button">
//             {formik.isSubmitting ? 'Loading...' : 'Add Book'}
//           </button>
//         </form>
//       </div>
//     );
//   }
  

// export default AddBookForm;