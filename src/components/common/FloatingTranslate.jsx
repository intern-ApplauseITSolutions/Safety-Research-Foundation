import React, { useState, useEffect } from 'react';
import { Languages, X, Check } from 'lucide-react';

const FloatingTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' }
  ];

  useEffect(() => {
    // Load Google Translate script
    const loadGoogleTranslate = () => {
      // Check if script already exists
      if (document.getElementById('google-translate-script')) {
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      
      // Initialize callback
      window.googleTranslateElementInit = function() {
        if (typeof window.google !== 'undefined' && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,mr,kn,ta,te,gu,bn,ml,pa,or,as',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            },
            'google_translate_element_floating'
          );
        }
      };

      document.body.appendChild(script);
    };

    loadGoogleTranslate();

    // Check current language from cookie
    const checkCurrentLanguage = () => {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('googtrans='));
      
      if (cookieValue) {
        const langCode = cookieValue.split('/')[2];
        if (langCode) {
          setCurrentLang(langCode);
        }
      }
    };

    checkCurrentLanguage();
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Method 1: Try to use the select element
    const trySelectMethod = () => {
      const selectElement = document.querySelector('.goog-te-combo');
      if (selectElement) {
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      return false;
    };

    // Method 2: Use cookies to set language
    const useCookieMethod = () => {
      const domain = window.location.hostname;
      const cookieValue = `/en/${langCode}`;
      
      // Set the cookie
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;
      document.cookie = `googtrans=${cookieValue}; path=/`;
      
      // Reload the page to apply translation
      window.location.reload();
    };

    // Try select method first, if it fails use cookie method
    if (!trySelectMethod()) {
      // Wait a bit and try again
      setTimeout(() => {
        if (!trySelectMethod()) {
          // If still fails, use cookie method
          useCookieMethod();
        }
      }, 1000);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[200] bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group"
        aria-label="Translate"
      >
        <Languages className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 bg-brand-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
          भाषा
        </span>
      </button>

      {/* Floating Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[200] bg-white rounded-2xl shadow-2xl w-96 max-w-[calc(100vw-3rem)] max-h-[calc(100vh-10rem)] animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-gray-900">Select Language</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 px-6 pb-4">
            Choose your preferred language to translate the entire website
          </p>

          {/* Language List */}
          <div className="max-h-[400px] overflow-y-auto px-6 custom-scrollbar">
            <div className="space-y-2 pb-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-3.5 rounded-lg transition-all duration-200 flex items-center justify-between hover:shadow-md ${
                    currentLang === lang.code
                      ? 'bg-primary text-white shadow-md'
                      : 'hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  <div className="flex-1">
                    <div className="font-semibold text-base">{lang.name}</div>
                    <div className={`text-base mt-0.5 ${currentLang === lang.code ? 'text-white/90' : 'text-gray-600'}`}>
                      {lang.nativeName}
                    </div>
                  </div>
                  {currentLang === lang.code && (
                    <Check className="w-5 h-5 flex-shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Hidden Google Translate Widget */}
          <div id="google_translate_element_floating" className="hidden"></div>

          {/* Info */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Click on any language to translate the entire website
            </p>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[199]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2A6BC7;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
      `}</style>
    </>
  );
};

export default FloatingTranslate;
