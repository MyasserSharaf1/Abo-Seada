import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
const colRef = collection(db, 'Properties');
const purchasedColRef = collection(db, 'PurchasedProperties');
const auth = getAuth(app);

function CounterV1() {
  const [properties, setProperties] = useState([]);
  const [totalArea, setTotalArea] = useState(0);
  const [propertiesSold, setPropertiesSold] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const propertyData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProperties(propertyData);

        // Calculate total area
        const totalArea = propertyData.reduce((acc, property) => acc + (property.area || 0), 0);
        setTotalArea(totalArea);

        // Fetch purchased properties count
        const purchasedSnapshot = await getDocs(purchasedColRef);
        setPropertiesSold(purchasedSnapshot.size);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();

    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="ltn__counterup-area section-bg-1 pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 align-self-center">
            <div className="ltn__counterup-item text-color-white---">
              <div className="counter-icon">
                <i className="flaticon-select" />
              </div>
              <h1><span className="counter">{totalArea}</span><span className="counterUp-icon">+</span> </h1>
              <h6>Total Area Sq</h6>
            </div>
          </div>
          
		  <div className="ltn__counterup-item text-color-white---">
              <div className="counter-icon">
                <i className="flaticon-office" />
              </div>
              <h1><span className="counter">{propertiesSold}</span><span className="counterUp-letter"></span><span className="counterUp-icon">+</span> </h1>
              <h6>properties Sold</h6>
            </div>
          <div className="col-md-3 col-sm-6 align-self-center">
            {/* Additional counter items can be added here */}
          </div>
          <div className="col-md-3 col-sm-6 align-self-center">
            {/* Additional counter items can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounterV1;
