import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsicCTmMLWPMSyHxOfMnr_SVQ8m-rCoUM",
  authDomain: "abu-seada-office.firebaseapp.com",
  projectId: "abu-seada-office",
  storageBucket: "abu-seada-office.appspot.com",
  messagingSenderId: "567437272231",
  appId: "1:567437272231:web:a444f7e762df0f69c8a782",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth instance and Firestore instance
const auth = getAuth(app);
const db = getFirestore(app);
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      resetEmail: '',
      error: null,
      isAuthenticated: false // Initialize isAuthenticated to false
    };
  }

  handleSignInSuccess = async (user) => {
    console.log('Sign-in Successful:', user);
    this.setState({ isAuthenticated: true });

    // Check if the user exists in the 'User' collection
    const userRef = doc(db, 'Users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Create a new user document
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
    }
  }

  handleSignInError = (error) => {
    console.error('Sign-in Error:', error);
    this.setState({ error: error.message });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    console.log('Attempting sign-in with:', email, password); // Debugging line

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      this.handleSignInSuccess(userCredential.user);
    } catch (error) {
      this.handleSignInError(error);
    }
  }

  handleResetPassword = async (e) => {
    e.preventDefault();

    const { resetEmail } = this.state;

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      console.log('Password reset email sent to:', resetEmail);
      this.setState({ resetEmail: '', error: null });
    } catch (error) {
      this.handleSignInError(error);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, password, resetEmail, error, isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="ltn__login-area pb-65">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="account-login-inner">
                  <form onSubmit={this.handleSubmit} className="ltn__form-box contact-form-box">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <input type="text" name="email" placeholder="Email*" value={email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password*" value={password} onChange={this.handleChange} />
                    <div className="btn-wrapper mt-0">
                      <button className="theme-btn-1 btn btn-block" type="submit">SIGN IN</button>
                    </div>
                  </form>
                  
                </div>
              </div>
              
            </div>
          </div>
        </div>
        {/* Password reset modal */}
        <div className="ltn__modal-area ltn__add-to-cart-modal-area----">
          <div className="modal fade" id="ltn_forget_password_modal" tabIndex={-1}>
            <div className="modal-dialog modal-md" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="ltn__quick-view-modal-inner">
                    <div className="modal-product-item">
                      <div className="row">
                        <div className="col-12">
                          <div className="modal-product-info text-center">
                            <h4>FORGOT PASSWORD?</h4>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <p className="added-cart">Enter your registered email to reset your password.</p>
                            <form onSubmit={this.handleResetPassword} className="ltn__form-box">
                              <input type="text" name="resetEmail" placeholder="Type your registered email*" value={resetEmail} onChange={this.handleChange} />
                              <div className="btn-wrapper mt-0">
                                <button className="theme-btn-1 btn btn-full-width-2" type="submit">Submit</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Login;
