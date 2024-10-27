import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword
  } from 'firebase/auth'
  import { getFirestore, collection, addDoc } from 'firebase/firestore';

  
const firebaseConfig = {
  apiKey: "AIzaSyBsicCTmMLWPMSyHxOfMnr_SVQ8m-rCoUM",
  authDomain: "abu-seada-office.firebaseapp.com",
  projectId: "abu-seada-office",
  storageBucket: "abu-seada-office.appspot.com",
  messagingSenderId: "567437272231",
  appId: "1:567437272231:web:a444f7e762df0f69c8a782"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);
  
  class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: null,
        successMessage: null, // Initialize successMessage state variable
      };
    }    
    
    
    handleSubmit = async (e) => {
      e.preventDefault();
    
      const { firstName, lastName, userName, email, password, confirmPassword } = this.state;
    
      if (password !== confirmPassword) {
        this.setState({ error: 'Passwords do not match. Please try again.' });
        return;
      }
    
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Add the user to Firestore collection with additional details
        await addDoc(collection(db, 'User'), {
          uid: user.uid,
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          userName: userName,
        });
    
        console.log('User created successfully:', user);
        // Redirect or handle successful signup (e.g., show success message)
        this.setState({ 
          firstName: '', 
          lastName: '', 
          userName: '',
          email: '', 
          password: '', 
          confirmPassword: '', 
          error: null,
          successMessage: 'Your account has been created successfully!'
        }); // Clear form after successful signup
      } catch (error) {
        console.error('Error creating user:', error);
        this.setState({ error: error.message });
      }
    }
    
  
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    render() {
      const { email, password, confirmPassword, error, successMessage } = this.state;
  
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
  {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
  <input type="text" name="firstName" placeholder="First Name*" value={this.state.firstName} onChange={this.handleChange} />
  <input type="text" name="lastName" placeholder="Last Name*" value={this.state.lastName} onChange={this.handleChange} />
  <input type="text" name="userName" placeholder="Username*" value={this.state.userName} onChange={this.handleChange} />
  <input type="text" name="email" placeholder="Email*" value={this.state.email} onChange={this.handleChange} />
  <input type="password" name="password" placeholder="Password*" value={this.state.password} onChange={this.handleChange} />
  <input type="password" name="confirmPassword" placeholder="Confirm Password*" value={this.state.confirmPassword} onChange={this.handleChange} />
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
