import React, { Component } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
    let imagealt = 'صورة';

    if (loading) {
      return <div>جاري التحميل...</div>;
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
                  شهادات العملاء
                </h6>
                <h1 className="section-title">آراء العملاء</h1>
              </div>
            </div>
          </div>
          <div className="row ltn__testimonial-slider-5-active slick-arrow-1">
            {feedbacks.length === 0 ? (
              <div className="col-lg-12 text-center">
                <p>لا توجد آراء متاحة</p>
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
                          <label>{feedback.rate} نجوم</label>
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
