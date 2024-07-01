import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import parse from 'html-react-parser';
import { getAuth, signOut, sendPasswordResetEmail, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

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
const auth = getAuth();
const db = getFirestore(app);

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetEmail: '',
      isAuthenticated: true,
      user: null,
      firstName: '',
      lastName: '',
      displayName: '',
      userName: '',
      email: '',
      error: null
    };
  }

  componentDidMount() {
    this.authListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'User', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.setState({
            isAuthenticated: true,
            user,
            firstName: userData.firstName,
            lastName: userData.lastName,
            displayName: userData.displayName,
            userName: userData.userName,
            email: user.email
          });
        }
      } else {
        this.setState({ isAuthenticated: false, user: null });
      }
    });
  }

  componentWillUnmount() {
    if (this.authListener) {
      this.authListener();
    }
  }

  handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        this.setState({ isAuthenticated: false, user: null });
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

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

  handleAccountChange = async (e) => {
    e.preventDefault();
    const { firstName, lastName, displayName, user } = this.state;

    try {
      await updateDoc(doc(db, 'User', user.uid), {
        firstName,
        lastName,
        displayName
      });

      await updateProfile(auth.currentUser, { displayName });
      console.log('Account details updated successfully');
    } catch (error) {
      console.error('Error updating account details:', error);
    }
  }

  render() {
    const { resetEmail, error, isAuthenticated, firstName, lastName, displayName, userName, email } = this.state;
    let publicUrl = process.env.PUBLIC_URL + '/';

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="liton__wishlist-area pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* PRODUCT TAB AREA START */}
              <div className="ltn__product-tab-area">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="ltn__tab-menu-list mb-50">
                        <div className="nav">
						<a className="active show" data-bs-toggle="tab" href="#ltn_tab_1_1">Dashboard <i className="fas fa-home" /></a>
						<Link to="/contact">Contact Us <i className="fas fa-user" /></Link>
						<Link to="/Feedback">FeedBack <i className="fas fa-user" /></Link>
						<a data-bs-toggle="tab" href="#ltn_tab_1_4">Account Details <i className="fas fa-user" /></a>
						<Link to="/wishlist">WishList <i className="fas fa-user" /></Link>	
						<Link to="/add-listing">Add Property <i className="fas fa-user" /></Link>	
						<Link to="/checkout">Payment <i className="fas fa-user" /></Link>	
						<a data-bs-toggle="tab" href="#ltn_tab_1_9">Change Password <i className="fa-solid fa-lock" /></a>
						<button onClick={this.handleSignOut}>Logout <i className="fas fa-sign-out-alt" /></button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="tab-content">
                        <div className="tab-pane fade active show" id="ltn_tab_1_1">
                          <div className="ltn__myaccount-tab-content-inner">
                            <h2>Welcome to Askun platform, {displayName || userName || 'User'}!</h2>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="ltn_tab_1_4">
                          <div className="ltn__myaccount-tab-content-inner">
                            <div className="ltn__form-box">
                              <form onSubmit={this.handleAccountChange}>
                                <div className="row mb-50">
                                  <div className="col-md-6">
                                    <label>First name:</label>
                                    <input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Last name:</label>
                                    <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Display Name:</label>
                                    <input type="text" name="displayName" value={displayName} onChange={this.handleChange} />
                                  </div>
                                  <div className="col-md-6">
                                    <label>Display Email:</label>
                                    <input type="email" name="email" value={email} disabled />
                                  </div>
                                </div>
                                <div className="btn-wrapper">
                                  <button type="submit" className="btn theme-btn-1 btn-effect-1 text-uppercase">Save Changes</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="ltn_tab_1_9">
                          <div className="ltn__myaccount-tab-content-inner">
                            <div className="account-login-inner">
                              {error && <div className="alert alert-danger" role="alert">{error}</div>}
                              <p className="added-cart">Enter your registered email to reset your password.</p>
                              <form onSubmit={this.handleResetPassword} className="ltn__form-box contact-form-box">
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
              {/* PRODUCT TAB AREA END */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyAccount;
