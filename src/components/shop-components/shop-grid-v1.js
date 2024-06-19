import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, setDoc ,Timestamp} from 'firebase/firestore';

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
const auth = getAuth(app);

function ShopGridV1() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(colRef);
        const propertyData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProperties(propertyData);
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

  const addToWishlist = async (property) => {
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      console.warn('User is not signed in. Please sign in to add to wishlist.');
      // Implement sign-in logic here (e.g., redirect to sign-in page)
      return;
    }
  
    const uid = currentUser.uid;
    console.log(uid);
  
    try {
      const userRef = doc(db, 'User', uid);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        // Create the user document if it doesn't exist
        await setDoc(userRef, {});
      }
  
      const wishlistRef = collection(userRef, 'Wishlist');
      const propertyWithTimestamp = {
        ...property,
        addedAt: Timestamp.now()
      };
      await addDoc(wishlistRef, propertyWithTimestamp);
      alert('Property added to wishlist successfully!');
    } catch (error) {
      console.error('Error adding property to wishlist:', error);
      alert('Failed to add property to wishlist. Please try again later.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="ltn__product-area ltn__product-gutter mb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__product-tab-content-inner ltn__product-grid-view">
              <div className="row">
                {properties.map((property) => (
                  <div className="col-lg-4 col-sm-6 col-12" key={property.id}>
                    <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5 text-center---">
                      <div className="product-img">
                        <Link
                          to={{
                            pathname: `/shop-details/${property.id}`,
                            state: { propertyData: property, documentId: property.id }
                          }}
                        >
                          <img src={property.coverPhoto?.url} alt={property.coverPhoto?.title} />
                        </Link>
                        <div className="real-estate-agent">
                          <div className="agent-img">
                            <Link
                              to={{
                                pathname: `/team-details/${property.ownerAgent?.id}`,
                                state: { propertyData: property }
                              }}
                            >
                              <img src={property.ownerAgent?.user_image} alt="#" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="product-info">
                        <div className="product-badge">
                          <ul>
                            <li className="sale-badge">{property.purpose}</li>
                          </ul>
                        </div>
                        <h2 className="product-title go-top">
                        <Link
                          to={{
                            pathname: `/shop-details/${property.id}`,
                            state: { propertyData: property, documentId: property.id }
                          }}
                        >{property.title}</Link>
                        </h2>
                        <h2 className="product-title go-top">
                        <Link
                          to={{
                            pathname: `/shop-details/${property.id}`,
                            state: { propertyData: property, documentId: property.id }
                          }}
                        >{property.title_l1}</Link>
                        </h2>
                        <div className="product-img-location">
                          <ul>
                            <li className="go-top">
                              <Link to="/contact"><i className="flaticon-pin" /> Belmont Gardens, Chicago</Link>
                            </li>
                          </ul>
                        </div>
                        <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                          <li><span>{property.rooms}</span> Bedrooms</li>
                          <li><span>{property.baths}</span> Bathrooms</li>
                          <li><span>{property.area}</span> square Ft</li>
                        </ul>
                        <div className="product-hover-action">
                          <ul>
                            <li>
                              <button onClick={() => addToWishlist(property)} title="Add to Wishlist">
                                <i className="flaticon-heart-1" />
                              </button>
                            </li>
                            <li>
                              <span className="go-top">
                                <Link
                                  to={{
                                    pathname: `/shop-details/${property.id}`,
                                    state: { propertyData: property, documentId: property.id }
                                  }}
                                >
                                  <i className="flaticon-add" />
                                </Link>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="product-info-bottom">
                        <div className="product-price">
                          <span>
                            {property.price}
                            {property.purpose === 'for-rent' && <label>/Month</label>}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopGridV1;
