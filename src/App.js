import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TranslationProvider } from './Context/TranslationContext';
import HomePage from './components/home-v1';
import ServiceV5 from './components/section-components/service-v1';
function App() {
  return (
    <TranslationProvider>
      <Router>
        <HomePage />
        <ServiceV5 />
        {/* Add other pages here */}
      </Router>
    </TranslationProvider>
  );
}

export default App;
