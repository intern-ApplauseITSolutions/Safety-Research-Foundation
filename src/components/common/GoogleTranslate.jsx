import React, { useEffect } from 'react';
import { Languages } from 'lucide-react';

const GoogleTranslate = ({ showLabel = true, className = '' }) => {
  useEffect(() => {
    // Add custom styles for Google Translate widget
    const style = document.createElement('style');
    style.innerHTML = `
      #google_translate_element .goog-te-gadget-simple {
        background-color: rgba(255, 255, 255, 0.2) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        color: white !important;
      }
      #google_translate_element .goog-te-gadget-simple .goog-te-menu-value span {
        color: white !important;
      }
      #google_translate_element .goog-te-gadget-simple .goog-te-menu-value span:first-child {
        color: white !important;
      }
    `;
    document.head.appendChild(style);

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

    // Cleanup - Reset translation when leaving the page
    return () => {
      // Reset page language back to English using Google Translate API
      if (window.google && window.google.translate) {
        const select = document.querySelector('#google_translate_element select');
        if (select && select.value !== '' && select.value !== 'en') {
          // Reset to English (empty value = original language)
          select.value = '';
          // Trigger change event to apply reset
          const changeEvent = new Event('change', { bubbles: true });
          select.dispatchEvent(changeEvent);
          
          // Also try to use Google Translate API directly
          try {
            if (window.google.translate.TranslateElement && window.google.translate.TranslateElement.getInstance) {
              const instance = window.google.translate.TranslateElement.getInstance();
              if (instance && instance.restore) {
                instance.restore();
              }
            }
          } catch (e) {
            console.log('Could not restore translation:', e);
          }
        }
        // Remove translation classes from body and html
        document.body.classList.remove('translated-ltr', 'translated-rtl');
        document.documentElement.classList.remove('translated-ltr', 'translated-rtl');
        document.documentElement.lang = 'en';
        // Remove iframe overlay
        const iframe = document.querySelector('.goog-te-banner-frame');
        if (iframe) {
          iframe.style.display = 'none';
        }
        // Hide translate bar
        const translateBar = document.querySelector('.skiptranslate');
        if (translateBar) {
          translateBar.style.display = 'none';
        }
      }
      // Remove custom style
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <div className="flex items-center gap-1 text-white">
          <Languages className="w-4 h-4" />
          <span className="text-sm font-medium">Translate:</span>
        </div>
      )}
      <div id="google_translate_element" className="[&_*]:!text-white [&_select]:!bg-white/20 [&_select]:!text-white [&_select]:!border-white/30"></div>
    </div>
  );
};

export default GoogleTranslate;
