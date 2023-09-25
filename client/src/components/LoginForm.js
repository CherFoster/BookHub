import '../styles/Login.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

function LoginForm({ onLogin }) {
  const navigate = useNavigate();


  const formSchema = yup.object().shape({
      username: yup.string().required("Please enter a username"),
      password: yup.string().required("Please enter a password"),
  });

  const formik = useFormik({
      initialValues: {
          username: "",
          password: "",
      },
      validationSchema: formSchema,
      onSubmit: (values, { setSubmitting, setErrors }) => {
          fetch("/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
          }).then((res) => {
              setSubmitting(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((err) => {
                        throw new Error(err.errors || ["An error occurred"]);
                    });
                }
              }).then((user) => {
                  onLogin(user);
                  navigate("/");
                }).catch((error) => {
                    setErrors({ username: error.message });
              });
            }
          });

  return (
      <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={formik.handleSubmit}>
              <div className="user-box">
                  <input
                      type="text"
                      name="username"
                      value={formik.values.username}
                      required
                      onChange={formik.handleChange}
                  />
                  <label>Username</label>
              </div>
              <div className="user-box">
                  <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      required
                      onChange={formik.handleChange}
                  />
                  <label>Password</label>
              </div>
              <button type="submit" className="submit-button">
                  {formik.isSubmitting ? "Loading..." : "Login"}
              </button>
              <div className='error-messages'>
                  {formik.errors.username && (
                      <p className="error">{formik.errors.username}</p>
                  )}
              </div>
          </form>
      </div>
  );
}

export default LoginForm;