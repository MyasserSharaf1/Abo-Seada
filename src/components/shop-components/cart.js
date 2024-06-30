import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBu4EgPTNk8ZW3VwJ3p7_J42O0coyrRIyM",
  authDomain: "askundb.firebaseapp.com",
  projectId: "askundb",
  storageBucket: "askundb.appspot.com",
  messagingSenderId: "873898080051",
  appId: "1:873898080051:web:0c24b0114fcd9f4d1c3046",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const CartV1 = ({ btnStatus }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  // let btnStatus = props.btnStatus;
  const fetchData = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const uid = currentUser.uid;
        const cartRef = collection(doc(db, "User", uid), "Cart");
        const snapshot = await getDocs(cartRef);
        const cartData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCartItems(cartData);

        const totalPrice = cartData.reduce(
          (total, item) => total + (item.price || 0),
          0
        );
        setTotalPrice(totalPrice);
      } else {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        setCartItems(guestCart);

        const totalPrice = guestCart.reduce(
          (total, item) => total + (item.price || 0),
          0
        );
        setTotalPrice(totalPrice);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const removeCartItem = async (id) => {
    const currentUser = auth.currentUser;

    try {
      if (currentUser) {
        const uid = currentUser.uid;
        const itemRef = doc(db, "User", uid, "Cart", id);
        await deleteDoc(itemRef);
        fetchData();
      } else {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const updatedCart = guestCart.filter((item) => item.id !== id);
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);

        const totalPrice = updatedCart.reduce(
          (total, item) => total + (item.price || 0),
          0
        );
        setTotalPrice(totalPrice);
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
      setError(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="liton__shoping-cart-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping-cart-inner">
              <div className="shoping-cart-table table-responsive">
                <table className="table">
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td
                          className="cart-product-remove"
                          onClick={() => removeCartItem(item.id)}
                        >
                          x
                        </td>
                        <td className="cart-product-image">
                          <Link to={`/product-details/${item.id}`}>
                            <img
                              src={item.coverPhoto?.url}
                              alt={item.coverPhoto?.title}
                            />
                          </Link>
                        </td>
                        <td className="cart-product-info">
                          <h4>
                            <Link to={`/product-details/${item.id}`}>
                              {item.title}
                            </Link>
                          </h4>
                        </td>
                        <td className="cart-product-price">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="shoping-cart-total mt-50">
                <h4>Cart Total</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Order Total</strong>
                      </td>
                      <td>
                        <strong>{totalPrice}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {btnStatus ? (
                  <div className="btn-wrapper text-right go-top">
                    <Link
                      to="/checkout"
                      className="theme-btn-1 btn btn-effect-1"
                    >
                      Proceed to checkout
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartV1;
