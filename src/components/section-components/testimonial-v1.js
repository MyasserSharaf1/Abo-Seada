import React, { Component } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu4EgPTNk8ZW3VwJ3p7_J42O0coyrRIyM",
  authDomain: "askundb.firebaseapp.com",
  projectId: "askundb",
  storageBucket: "askundb.appspot.com",
  messagingSenderId: "873898080051",
  appId: "1:873898080051:web:0c24b0114fcd9f4d1c3046"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

class Testimonial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const feedbacksCollection = collection(db, 'Feedback');
      const feedbacksSnapshot = await getDocs(feedbacksCollection);
      const feedbacksList = feedbacksSnapshot.docs.map(doc => doc.data());

      this.setState({
        feedbacks: feedbacksList,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching feedbacks: ', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { feedbacks, loading } = this.state;
    let publicUrl = process.env.PUBLIC_URL + '/';
    let imagealt = 'image';

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div
        className="ltn__testimonial-area section-bg-1--- bg-image-top pt-115 pb-70"
        data-bs-bg={publicUrl + 'assets/img/bg/20.jpg'}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area ltn__section-title-2--- text-center">
                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                  Our Testimonial
                </h6>
                <h1 className="section-title">Clients Feedback</h1>
              </div>
            </div>
          </div>
          <div className="row ltn__testimonial-slider-5-active slick-arrow-1">
            {feedbacks.length === 0 ? (
              <div className="col-lg-12 text-center">
                <p>No feedback found</p>
              </div>
            ) : (
              feedbacks.map((feedback, index) => (
                <div className="col-lg-4" key={index}>
                  <div className="ltn__testimonial-item ltn__testimonial-item-7">
                    <div className="ltn__testimoni-info">
                      <p>
                        <i className="flaticon-left-quote-1" />
                        {feedback.feedback}
                      </p>
                      <div className="ltn__testimoni-info-inner">
                        <div className="ltn__testimoni-img">
                          <img
                            src={publicUrl + "assets/img/testimonial/1.jpg"}
                            alt={imagealt}
                          />
                        </div>
                        <div className="ltn__testimoni-name-designation">
                          <h5>{feedback.name}</h5>
                          <label>{feedback.email}</label>
                          <label>{feedback.rate} Stars</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Testimonial;
