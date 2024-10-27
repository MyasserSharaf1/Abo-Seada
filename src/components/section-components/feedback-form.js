import React, { Component } from 'react';
import { initializeApp } from "firebase/app";
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
const db = getFirestore(app);
class FeedbackForm extends Component {
  componentDidMount() {
    const $ = window.$;
    const form = $('#feedback-form');
    const formMessages = $('.form-message');

    $(form).submit((e) => {
      e.preventDefault();

      const formData = new FormData(form[0]);
      const feedbackData = {
        name: formData.get('name'),
        email: formData.get('email'),
        feedback: formData.get('feedback'),
        rate: formData.get('rate'),
      };

      // Save feedback data to Firestore
      addDoc(collection(db, 'Feedback'), feedbackData)
        .then(() => {
          // On success
          $(formMessages).removeClass('error');
          $(formMessages).addClass('success');
          $(formMessages).text('Feedback submitted successfully.');

          // Clear the form
          $('#feedback-form')[0].reset();
        })
        .catch((error) => {
          // On error
          $(formMessages).removeClass('success');
          $(formMessages).addClass('error');
          $(formMessages).text(`Error: ${error.message}`);
        });
    });
  }

  render() {
    return (
      <div className="feedback-area mb-120 mb--100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="form-box feedback-form-box box-shadow white-bg">
                <h4 className="title-2">Feedback Form</h4>
                <form id="feedback-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-item input-item-name ltn__custom-icon">
                        <input type="text" name="name" placeholder="Enter your name" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-email ltn__custom-icon">
                        <input type="email" name="email" placeholder="Enter email address" required />
                      </div>
                    </div>
                  </div>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea name="feedback" placeholder="Enter your feedback (up to 300 words)" maxLength="300" required />
                  </div>
                  <div className="input-item">
                    <select className="nice-select" name="rate" required>
                      <option value="">Rate our service</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="btn-wrapper mt-0">
                    <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">
                      Submit Feedback
                    </button>
                  </div>
                  <p className="form-message mb-0 mt-20" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default FeedbackForm;

