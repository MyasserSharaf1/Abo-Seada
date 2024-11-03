import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

const AboutV1 = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'services'));
        const servicesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services: ", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="ltn__about-us-area pt-120 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <img
                src="https://media.istockphoto.com/id/1096860416/photo/accountant-working-with-us-tax-forms.jpg?s=612x612&w=0&k=20&c=iTeEa7-FrsAdM2DGPxnx_T7dyoW9MKK_4hauIEFNTAo="
                alt="صورة عنا"
              />
              <div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
                <div className="ltn__video-img ltn__animation-pulse1"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2--- mb-20">
                <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">
                  عنا
                </h6>
                <h1 className="section-title">خدماتنا</h1>
              </div>
              <ul className="ltn__list-item-half clearfix">
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <li key={index}>
                      <i className={`flaticon-${service.icon}`} />
                      {service.arname} {/* This can remain as is if service names are already in Arabic */}
                    </li>
                  ))
                ) : (
                  <li>جاري تحميل الخدمات...</li>
                )}
              </ul>
              
              <div className="ltn__callout bg-overlay-theme-05 mt-30"></div>
              <div className="btn-wrapper animated go-top">
                <Link to="/arservice" className="theme-btn-1 btn btn-effect-1">
                  عرض الخدمات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutV1;
