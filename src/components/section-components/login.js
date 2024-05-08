import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBu4EgPTNk8ZW3VwJ3p7_J42O0coyrRIyM",
	authDomain: "askundb.firebaseapp.com",
	projectId: "askundb",
	storageBucket: "askundb.appspot.com",
	messagingSenderId: "873898080051",
	appId: "1:873898080051:web:0c24b0114fcd9f4d1c3046"
  };


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get auth instance
const auth = getAuth();
auth.languageCode = 'en';
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

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
        // Handle Google sign-in success
        const user = result.user;
        console.log('Google Sign-in Successful:', user);
        this.setState({ isAuthenticated: true });
      })
      .catch((error) => {
        // Handle Google sign-in error
        console.error('Google Sign-in Error:', error);
        this.setState({ error: error.message });
      });
  }

  handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // Handle Facebook sign-in success
        const user = result.user;
        console.log('Facebook Sign-in Successful:', user);
        this.setState({ isAuthenticated: true });
      })
      .catch((error) => {
        // Handle Facebook sign-in error
        console.error('Facebook Sign-in Error:', error);
        this.setState({ error: error.message });
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential);
      this.setState({ isAuthenticated: true });
      // Clear form after successful login
      this.setState({ email: '', password: '', error: null });
    } catch (error) {
      console.error('Error logging in:', error);
      // Set specific error message for user feedback
      this.setState({ error: error.message });
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
      console.error('Error sending password reset email:', error);
      this.setState({ error: error.message });
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
                </div>
                {/* Google Sign-In Button */}
                <div className="btn-wrapper go-top">
                  <button onClick={this.handleGoogleSignIn} className="theme-btn-1 btn black-btn">
                    Sign in with Google
                  </button>
                </div>
                {/* Facebook Sign-In Button */}
                <div className="btn-wrapper go-top">
                  <button onClick={this.handleFacebookSignIn} className="theme-btn-1 btn black-btn">
                    Sign in with Facebook
                  </button>
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
