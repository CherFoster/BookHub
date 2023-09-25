import '../styles/Signup.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

function SignupForm({ onLogin }) {
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        username: yup.string().required("Username required"),
        password: yup.string().required("Password required"),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            fetch('/signup', {
                method:"POST",
                headers: {
                  "Content-Type" : "application/json",
                },
                body: JSON.stringify(values)
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((err) => {
                        throw new Error(err.errors || "An error occurred");
                    });
                }
            }).then((user) => {
                onLogin(user);
                navigate("/");
            }).catch((error) => {
                setErrors({ username: error.message });
            }).finally(() => {
                setSubmitting(false); // Set submitting to false after the request is complete.
            });
        }
    });

    return (
        <div className="signup-box">
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="user-box">
                    <input
                    type="text" 
                    id="username"
                    name="username"
                    value={formik.values.username} 
                    required 
                    onChange={formik.handleChange}/>
                    <label>Create a Username</label>
                </div>
                <div className="user-box">
                    <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    required
                    onChange={formik.handleChange}/>
                    <label>Create a Password</label>
                </div>
                <button type="submit" className="submit-button">
                    {formik.isSubmitting ? "Loading..." : "Sign Up"}
                </button>
                <div className="error-messages">
                    {formik.errors.username && (
                        <p className="error">{formik.errors.username}</p>
                    )}
                </div>
            </form>
        </div>
      );
    }
    
    export default SignupForm;