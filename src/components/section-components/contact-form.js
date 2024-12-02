import React, { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

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

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],  // To store service options from Firestore
    };
  }

  componentDidMount() {
    this.fetchServices();
    this.initializeFormSubmission();
  }

  fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched services:', services); // Debugging line
      this.setState({ services });
    } catch (error) {
      console.error("Error fetching services: ", error);
    }
  };

  initializeFormSubmission = () => {
    const $ = window.$;
    const form = $('#contact-form');
    const formMessages = $('.form-messege');

    $(form).submit((e) => {
      e.preventDefault();

      const formData = new FormData(form[0]);
      const messageData = {
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        phone: formData.get('phone'),
        message: formData.get('message'),
      };

      // Save message data to Firestore
      addDoc(collection(db, 'Messages'), messageData)
        .then(() => {
          // On success
          $(formMessages).removeClass('error');
          $(formMessages).addClass('success');
          $(formMessages).text('Message sent successfully.');

          // Clear the form
          $('#contact-form')[0].reset();
        })
        .catch((error) => {
          // On error
          $(formMessages).removeClass('success');
          $(formMessages).addClass('error');
          $(formMessages).text(`Error: ${error.message}`);
        });
    });
  };

  render() {
    let publicUrl = process.env.PUBLIC_URL + '/';
    const { services } = this.state;

    return (
      <div className="ltn__contact-message-area mb-120 mb--100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__form-box contact-form-box box-shadow white-bg">
                <h4 className="title-2">Get A Quote</h4>
                <form id="contact-form">
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
                      <div className="input-item">
                        <select className="nice-select" name="service" required>
  <option>Select Service Type</option>
  {services.map((service) => (
    <option key={service.id} value={service.name}>
       {service.name} / {service.arname}
    </option>
  ))}
</select>

                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item input-item-phone ltn__custom-icon">
                        <input type="text" name="phone" placeholder="Enter phone number" required />
                      </div>
                    </div>
                  </div>
                  <div className="input-item input-item-textarea ltn__custom-icon">
                    <textarea name="message" placeholder="Enter message" defaultValue="" required />
                  </div>
                  <p>
                    <label className="input-info-save mb-0">
                      <input type="checkbox" name="agree" /> Save my name, email, and website in this browser for the next time I comment.
                    </label>
                  </p>
                  <div className="btn-wrapper mt-0">
                    <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">
                      request service
                    </button>
                  </div>
                  <p className="form-messege mb-0 mt-20" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;
