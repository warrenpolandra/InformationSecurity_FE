'use client'
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import "../styles.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [image, setImage] = useState(""); // State to store the image data URL

  const handleRegister = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      alert("Password and confirm password do not match.");
      return;
    }

    if (localStorage.getItem(username)) {
      alert("Username is already in use. Please choose another one.");
    } else {
      localStorage.setItem(username, JSON.stringify({ username, password,email, image }));
      alert("Registration successful. Please log in.");
      // Redirect to the login page after successful registration
      window.location.href = "/auth/login";
    }
  };

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const imageDataURL = e.target.result;
        setImage(imageDataURL);
      };
  
      reader.readAsDataURL(file);
    }
  };  

  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">Create Account</h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleRegister}>
                        {/* Add an input for image upload */}
                        {/* <div className="form-floating mb-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </div> */}
                        {/* Rest of the form */}
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <label>Username</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label>Email</label>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <label>Password</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                              />
                              <label>Confirm Password</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </div>
                        <div className="mt-4 mb-0">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-block">
                              Create Account
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link href="/auth/login">Have an account? Go to login</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Register;