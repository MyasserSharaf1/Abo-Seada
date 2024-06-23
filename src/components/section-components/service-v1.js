import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBu4EgPTNk8ZW3VwJ3p7_J42O0coyrRIyM",
  authDomain: "askundb.firebaseapp.com",
  projectId: "askundb",
  storageBucket: "askundb.appspot.com",
  messagingSenderId: "873898080051",
  appId: "1:873898080051:web:0c24b0114fcd9f4d1c3046"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ServiceV5 = () => {
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
    <div className="ltn__service-area section-bg-1 pt-115 pb-70 go-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2--- text-center">
              <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Services</h6>
              <h1 className="section-title">Our Core Services</h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {services.map((service) => (
            <div key={service.id} className="col-lg-4 col-sm-6 col-12">
              <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white box-shadow-1">
                <div className="ltn__feature-icon">
                  <span><i className={`flaticon-${service.icon}`} /></span>
                </div>
                <div className="ltn__feature-info">
                  <h3>
                    <Link to={{ pathname: "/service-details", state: { service } }}>
                      {service.name}
                    </Link>
                  </h3>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceV5;
