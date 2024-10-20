// src/context/TranslationContext.js
import React, { createContext, useState } from 'react';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  const translateText = async (text) => {
    const targetLanguage = language === 'en' ? 'ar' : 'en';
    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: targetLanguage,
          format: 'text'
        })
      });

      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      return text;  // return the original text on error
    }
  };

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);

    // Translate existing translations
    const translatedTexts = await Promise.all(
      Object.keys(translations).map(async (key) => {
        const translated = await translateText(translations[key]);
        return { [key]: translated };
      })
    );
    
    const updatedTranslations = translatedTexts.reduce((acc, cur) => ({ ...acc, ...cur }), {});
    setTranslations(updatedTranslations);
  };

  const translateContent = async (key, text) => {
    if (!translations[key]) {
      const translated = await translateText(text);
      setTranslations((prev) => ({ ...prev, [key]: translated }));
      return translated;
    }
    return translations[key];
  };

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage, translateContent }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationContext;
