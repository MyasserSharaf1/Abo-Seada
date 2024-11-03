import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
const db = getFirestore(app);

class AboutV5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arname: "",
      no_of_customer: ""
      // Other state variables if needed
    };
  }

  async componentDidMount() {
    try {
      const querySnapshot = await getDocs(collection(db, "Office"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.setState({
            arname: data.arname || "اسم المكتب الافتراضي",
          no_of_customer : data.no_of_customer || "عدد افتراضي"
        });
      });
    } catch (error) {
      console.error("Error fetching office data:", error);
    }
  }

  render() {
    let publicUrl = process.env.PUBLIC_URL + '/'
    const { arname, no_of_customer } = this.state;

    return (
      <div className="ltn__about-us-area pb-115 go-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 align-self-center">
              <div className="about-us-img-wrap ltn__img-shape-left  about-img-left">
                <img src="https://www.novisign.com/wp-content/uploads/2019/03/digital-signage-for-accounting-office.jpg"
                  alt="Image" />
              </div>
            </div>
            <div className="col-lg-7 align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2--- mb-20">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">معلومات عنا</h6>
                  <h1 className="section-title"> {arname} <span>.</span></h1>
                  <p>يتعامل معنا أكثر من {no_of_customer} عميل في مصر</p>
                </div>
                <div className="about-us-info-wrap-inner about-us-info-devide---">
                </div>
                <div className="btn-wrapper animated">
                  <Link to="/arabout" className="theme-btn-1 btn btn-effect-1 text-uppercase">معلومات عنا</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutV5;
