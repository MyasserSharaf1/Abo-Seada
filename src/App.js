import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopGridV1 from './components/shop-components/shop-grid-v1';
import ShopDetails from './components/shop-components/shop-details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopGridV1 />} />
        <Route path="/shop-details/:id" element={<ShopDetails />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
