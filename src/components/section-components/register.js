import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app"; // Import the entire Firebase library
import {
	getAuth,
	createUserWithEmailAndPassword,
  } from 'firebase/auth'
  
const firebaseConfig = {
	apiKey: "AIzaSyBu4EgPTNk8ZW3VwJ3p7_J42O0coyrRIyM",
	authDomain: "askundb.firebaseapp.com",
	projectId: "askundb",
	storageBucket: "askundb.appspot.com",
	messagingSenderId: "873898080051",
	appId: "1:873898080051:web:0c24b0114fcd9f4d1c3046"
  };

// Automatic Initialization (recommended)
const app = initializeApp(firebaseConfig);
const auth = getAuth() // Access the auth module

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: null, // To store any signup errors
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match. Please try again.' });
      return;
    }

    try {
     // const userCredential = await auth.createUserWithEmailAndPassword(email, password);
	 const userCredential  = createUserWithEmailAndPassword(auth, email, password)
      console.log('User created successfully:', userCredential.user);
      // Redirect or handle successful signup (e.g., show success message)
      this.setState({ email: '', password: '', confirmPassword: '' }); // Clear form after successful signup
    } catch (error) {
      console.error('Error creating user:', error);
      this.setState({ error: error.message }); // Set specific error message for user feedback
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, password, confirmPassword, error } = this.state;

    return (
      <div className="ltn__login-area pb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area text-center">
                <h1 className="section-title">Register <br />Your Account</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
                  Sit aliquid,  Non distinctio vel iste.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="account-login-inner">
                <form action="#" className="ltn__form-box contact-form-box" onSubmit={this.handleSubmit}>
                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                  <input type="text" name="email" placeholder="Email*" value={email} onChange={this.handleChange} />
                  <input type="password" name="password" placeholder="Password*" value={password} onChange={this.handleChange} />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password*" value={confirmPassword} onChange={this.handleChange} />
                  <label className="checkbox-inline">
                    <input type="checkbox" defaultValue />&nbsp;
                    I consent to Herboil processing my personal data in order to send personalized marketing material in accordance with the consent form and the privacy policy.
                  </label>
                  <label className="checkbox-inline">
                    <input type="checkbox" defaultValue /> &nbsp;
                    By clicking "create account", I consent to the privacy policy.
                  </label>
                  <div className="btn-wrapper">
                    <button className="theme-btn-1 btn reverse-color btn-block" type="submit">CREATE ACCOUNT</button>
                  </div>
                </form>
                <div className="by-agree text-center">
                  <p>By creating an account, you agree to our:</p>
                  <p><a href="#">TERMS OF CONDITIONS  &nbsp; &nbsp; | &nbsp; &nbsp;  PRIVACY POLICY</a></p>
                  <div className="go-to-btn mt-50 go-top">
                    <Link to="/login">ALREADY HAVE AN ACCOUNT ?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
