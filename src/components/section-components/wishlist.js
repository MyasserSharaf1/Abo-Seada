import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import 'firebase/firestore';

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
const auth = getAuth(app);

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchWishlist = async (uid) => {
      try {
        const userRef = doc(db, 'User', uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().uid === uid) {
          const wishlistRef = collection(userRef, 'Wishlist');
          const wishlistSnapshot = await getDocs(wishlistRef);
          if (!wishlistSnapshot.empty) {
            const wishlistItems = wishlistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWishlist(wishlistItems);
          } else {
            setError({ message: 'You don\'t have a wishlist.' });
          }
        } else {
          setError({ message: 'User data not found or mismatched UID.' });
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchWishlist(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to view your wishlist.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="liton__wishlist-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping-cart-inner">
              <div className="shoping-cart-table table-responsive">
                <table className="table">
                  <tbody>
                    {wishlist.map(item => (
                      <tr key={item.id}>
                        <td className="cart-product-remove"></td>
                        <td className="cart-product-image">
                          <Link to="/product-details/">
                            <img src={item.coverPhoto?.url} alt={item.coverPhoto?.title} />
                          </Link>
                        </td>
                        <td className="cart-product-info">
                          <h4 className="go-top">
                            <Link to="/product-details/">{item.name}</Link>
                          </h4>
                        </td>
                        <td className="cart-product-price">${item.price}</td>
                        <td className="cart-product-stock">
                          {item.addedAt.toDate().toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="cart-product-add-cart">
                          <Link className="submit-button-1" to="#" title="Add to Cart" data-bs-toggle="modal" data-bs-target="#add_to_cart_modal">Add to Cart</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
