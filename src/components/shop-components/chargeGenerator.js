//chargeGenerator.js

import React, { useState, useEffect } from "react";
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
const ChargeGenerator = () => {
  const url = "https://api.commerce.coinbase.com/charges";
  const [hostedUrl, setHostedUrl] = useState("");
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  // const location = useLocation();
  // const { totalPrice } = location.state || { totalPrice: 0 };

  useEffect(() => {
    const fetchChargeData = async () => {
      const chargeData = await createCharge();
      if (chargeData && chargeData.data && chargeData.data.hosted_url) {
        setHostedUrl(chargeData.data.hosted_url);
      }
    };

    fetchChargeData();
  }, []);

  const handleClick = () => {
    if (hostedUrl) {
      window.location.href = hostedUrl;
    }
  };
  const requestBody = {
    local_price: {
      amount: `${getTotalPrice()}`, //price of charge
      currency: "USD", //currency
    },
    pricing_type: "fixed_price",

    name: "Askun crypto",
    description: "Small description",
    redirect_url: "https:/google.com", //optional redirect URL

    metadata: {
      id: "Customer id",
      email: "amsoliman7@gmail.com",
      address: "5 AAST Sheraton",
    },
  };

  const payload = {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CC-Api-Key": "0554d96b-1262-4c70-834f-043e6d160da8",
    },
    body: JSON.stringify(requestBody),
  };

  async function createCharge() {
    try {
      const response = await fetch(url, payload);
      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating charge:", error);
    }
  }
  function getTotalPrice() {
    return totalPrice;
  }
  return (
    <div>
      <button onClick={handleClick} disabled={!hostedUrl}>
        Pay with Crypto {totalPrice}
      </button>
    </div>
  );
};

export default ChargeGenerator;
