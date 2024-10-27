import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase configuration
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

// Get auth instance and Firestore instance
const auth = getAuth(app);
const db = getFirestore(app);
auth.languageCode = 'en';
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const facebookProvider = new FacebookAuthProvider();
//facebookProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');
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

  handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        this.handleSignInSuccess(result.user);
      })
      .catch((error) => {
        this.handleSignInError(error);
      });
  }

  handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        this.handleSignInSuccess(result.user);
      })
      .catch((error) => {
        this.handleSignInError(error);
      });
  }

  handleAppleSignIn = () => {
    signInWithPopup(auth, appleProvider)
      .then((result) => {
        this.handleSignInSuccess(result.user);
      })
      .catch((error) => {
        this.handleSignInError(error);
      });
  }

  handleSignInSuccess = async (user) => {
    console.log('Sign-in Successful:', user);
    this.setState({ isAuthenticated: true });

    // Check if the user exists in the 'User' collection
    const userRef = doc(db, 'User', user.uid);
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
                  <div className="go-to-btn mt-20">
                    <a href="#" title="Forgot Password?" data-bs-toggle="modal" data-bs-target="#ltn_forget_password_modal"><small>FORGOTTEN YOUR PASSWORD?</small></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="account-create text-center pt-50">
                  <h4>DON'T HAVE AN ACCOUNT?</h4>
                  <p>Add items to your wishlist, get personalized recommendations, check out more quickly, track your orders, register</p>
                  <div className="btn-wrapper go-top">
                    <Link to="/register" className="theme-btn-1 btn black-btn">CREATE ACCOUNT</Link>
                  </div>
                  <div className="btn-wrapper go-top">
                    <button
                      onClick={this.handleGoogleSignIn}
                      className="theme-btn-1 btn white-btn"
                      style={{
                        backgroundColor: '#ffffff', // White background
                        color: '#000000', // Black text color
                        border: '1px solid #f0c14b', // Thin yellow border
                        borderRadius: '20px', // Curved corners
                        padding: '12px 20px', // Padding
                        fontSize: '16px', // Font size
                        cursor: 'pointer', // Cursor style
                        transition: 'background-color 0.3s ease, border-color 0.3s ease', // Transition for background and border color
                        marginBottom: '10px' // Space below the button
                      }}
                    >
                      <i className="fab fa-google" style={{ marginRight: '10px' }} /> Sign in with Google
                    </button>
                  </div>
                  <div className="btn-wrapper go-top">
                    <button
                      onClick={this.handleFacebookSignIn}
                      className="theme-btn-1 btn white-btn"
                      style={{
                        backgroundColor: '#ffffff', // White background
                        color: '#000000', // Black text color
                        border: '1px solid #f0c14b', // Thin yellow border
                        borderRadius: '20px', // Curved corners
                        padding: '12px 20px', // Padding
                        fontSize: '16px', // Font size
                        cursor: 'pointer', // Cursor style
                        transition: 'background-color 0.3s ease, border-color 0.3s ease', // Transition for background and border color
                        marginBottom: '10px' // Space below the button
                      }}
                    >
                      <i className="fab fa-facebook-f" style={{ marginRight: '10px' }} /> Sign in with Facebook
                    </button>
                  </div>
                  <div className="btn-wrapper go-top">
                    <button
                      onClick={this.handleAppleSignIn}
                      className="theme-btn-1 btn white-btn"
                      style={{
                        backgroundColor: '#ffffff', // White background
                        color: '#000000', // Black text color
                        border: '1px solid #f0c14b', // Thin yellow border
                        borderRadius: '20px', // Curved corners
                        padding: '12px 20px', // Padding
                        fontSize: '16px', // Font size
                        cursor: 'pointer', // Cursor style
                        transition: 'background-color 0.3s ease, border-color 0.3s ease', // Transition for background and border color
                        marginBottom: '10px' // Space below the button
                      }}
                    >
                      <i className="fab fa-apple" style={{ marginRight: '10px' }} /> Sign in with Apple
                    </button>
                  </div>
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
