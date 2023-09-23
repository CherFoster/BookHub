import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function ReviewForm({bookId, onReviewSubmit}) {
    const [isFormVisible, setIsFormVisible] = useState(true);

    const formSchema = yup.object().shape({
        rating: yup.number().required('Rating is required')
        .min(1, 'Rating must be between 1 and 10')
        .max(10, 'Rating must be between 1 and 10')
    });

    const formik = useFormik({
        initialValues: {
            review: '',
            rating: '',
        },
        validationSchema: formSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const reviewData = {
                review: values.review,
                rating: values.rating,
            };
            fetch(`/books/${bookId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            })
            .then((res) => {
                if(res.ok) {
                    console.log('Review submitted successfully');
                    onReviewSubmit(reviewData);
                    setIsFormVisible(false);
                } else {
                    console.error('Failed to submit review');
                }
            })
        }
    })
    return (
        <div className='form-box'>
            {isFormVisible ? (
              <div>
                <h3>Add a Review</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className='user-input'>
                        <textarea 
                            rows="10"
                            cols="50"
                            name='review'
                            value={formik.values.review}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className='user-input'>
                    <label>Rating: </label>
                        <input 
                            type='number'
                            min='1'
                            max='10'
                            name="rating"
                            value={formik.values.rating}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <button type='submit' disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
                </div>
            ) : (
                <p>Review submitted! Thank you.</p>
              )}
        </div>
    )
}

export default ReviewForm;