// src/contexts/LanguageContext.js
import React, { useState, createContext } from 'react';

// Create a context
export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ar'); // Default language is Arabic

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'ar' ? 'en' : 'ar'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
