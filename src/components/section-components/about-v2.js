import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getApps, getApp } from 'firebase/app';
import { initializeFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

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
const db = initializeFirestore(app);

class AboutV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestProperty: null,
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      const q = query(collection(db, 'PurchasedProperties'), orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latestProperty = querySnapshot.docs[0].data();
        this.setState({ latestProperty, isLoading: false });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching latest property:', error);
      this.setState({ error, isLoading: false });
    }
  }

  render() {
    const { latestProperty, isLoading, error } = this.state;

    return (
      <div className="ltn__about-us-area pt-120 pb-90 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="about-us-info-wrap">
                <div className="section-title-area ltn__section-title-2--- mb-30">
                  <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color"></h6>
                  <h1 className="section-title">Latest Sold Properties</h1>
                </div>
                {isLoading ? (
                  <p>Loading latest purchased property...</p>
                ) : error ? (
                  <p>Error fetching latest property: {error.message}</p>
                ) : latestProperty ? (
                  <div>
                    <h2>Latest Purchased Property</h2>
                    <ul className="ltn__list-item-2 ltn__list-item-2-before ltn__flat-info">
                      <li><span>{latestProperty.rooms} <i className="flaticon-bed" /></span> Bedrooms</li>
                      <li><span>{latestProperty.baths} <i className="flaticon-clean" /></span> Bathrooms</li>
                      <li><span>{latestProperty.carParking} <i className="flaticon-car" /></span> Car parking</li>
                      <li><span>{latestProperty.area} <i className="flaticon-square-shape-design-interface-tool-symbol" /></span> square Ft</li>
                    </ul>
                    <p>{latestProperty.description}</p>
                  </div>
                ) : (
                  <p>No purchased properties available.</p>
                )}
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="about-us-img-wrap about-img-right">
                {latestProperty && latestProperty.coverPhoto && latestProperty.coverPhoto.url ? (
                  <img src={latestProperty.coverPhoto.url} alt={latestProperty.coverPhoto.title} />
                ) : (
                  <p>No cover photo available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutV2;
