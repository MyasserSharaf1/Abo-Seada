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

class TrainingSection extends Component {
  componentDidMount() {
    this.initializeFormSubmission();
  }

  initializeFormSubmission = () => {
    const $ = window.$;
    const form = $('#resume-form');
    const formMessages = $('.form-message');

    $(form).submit(async (e) => {
      e.preventDefault();

      const formData = new FormData(form[0]);
      const resumeLink = formData.get('resumeLink'); // Get the URL input

      try {
        // Validate the URL
        if (!resumeLink.startsWith("https://")) {
          throw new Error("Please provide a valid URL starting with 'https://'.");
        }

        // Prepare data for Firestore
        const traineeData = {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          position: formData.get('position'),
          linkedin: formData.get('linkedin'),
          resumeURL: resumeLink, // Store the URL instead of the file
          message: formData.get('message'),
          seen: false, // Default value
        };

        // Save trainee data to Firestore
        await addDoc(collection(db, 'Trainees'), traineeData);

        // On success
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');
        $(formMessages).text('Resume submitted successfully.');

        // Clear the form
        $('#resume-form')[0].reset();
      } catch (error) {
        // On error
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');
        $(formMessages).text(`Error: ${error.message}`);
      }
    });
  };

  render() {
    return (
      <div className="ltn__contact-message-area mb-120 mb--100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__form-box contact-form-box box-shadow white-bg">
                <h4 className="title-2">Submit Your Resume</h4>
                <form id="resume-form">
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
                    <div className="col-md-6">
                      <div className="input-item input-item-phone ltn__custom-icon">
                        <input type="text" name="phone" placeholder="Enter phone number" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                        <input type="text" name="position" placeholder="Position applying for" required />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                      <h6 className="title-2">LinkedIn Profile</h6>
                        <input type="url" name="linkedin" placeholder="                         (optional)" />
                      </div>
                    </div>
                    <div className="col-md-6">
                    <div className="input-item">
  <h6 className="title-2">Submit Your Resume</h6>
  <input type="url" name="resumeLink" placeholder="Google Drive or Dropbox link" required />
  <small className="form-text text-muted">
    Please provide a valid link to your resume on Google Drive or Dropbox only.
  </small>
</div>

                    </div>
                  </div>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea name="message" placeholder="Additional information (optional)" defaultValue="" />
                  </div>
                  <div className="btn-wrapper mt-0">
                    <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">
                      Submit Resume
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

export default TrainingSection;
