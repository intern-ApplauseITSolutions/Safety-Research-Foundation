import React, { useEffect } from 'react';
import { Languages } from 'lucide-react';

const GoogleTranslate = ({ showLabel = true, className = '' }) => {
  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,mr,kn,ta,te,gu,bn,ml,pa,or,as', // English, Hindi, Marathi, Kannada, Tamil, Telugu, Gujarati, Bengali, Malayalam, Punjabi, Odia, Assamese
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    addScript();

    // Cleanup
    return () => {
      // Remove the translate bar if it exists
      const translateBar = document.querySelector('.skiptranslate');
      if (translateBar && translateBar.parentNode) {
        translateBar.parentNode.removeChild(translateBar);
      }
    };
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <div className="flex items-center gap-1 text-gray-700">
          <Languages className="w-4 h-4" />
          <span className="text-sm font-medium">Translate:</span>
        </div>
      )}
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
