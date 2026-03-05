import { useState, useEffect, useRef } from 'react';

const LANGUAGES = [
    { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

export default function LanguageTranslator() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('en');
    const dropdownRef = useRef(null);
    const langSelectRef = useRef(null); // Reference to the native Google select

    useEffect(() => {
        // 1. Check if we already have a translation cookie to set active state
        const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
        if (match && match[1]) {
            // The cookie is usually /en/hi or /auto/ta
            const parts = match[1].split('/');
            if (parts.length === 3) {
                const activeLang = parts[2];
                if (LANGUAGES.some(l => l.code === activeLang)) {
                    setActive(activeLang);
                }
            }
        }

        // 2. Initialize Google Translate Script
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,ta,kn',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                },
                'google_translate_element'
            );
        };

        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    // Click outside to close custom dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectLanguage = (code) => {
        setOpen(false);
        if (code === active) return;

        const domain = window.location.hostname;

        // Remove cookies first to prevent conflicting multiple cookies
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

        // If English, we just reload without setting a new cookie
        if (code !== 'en') {
            // Set the translation cookie
            document.cookie = `googtrans=/en/${code}; path=/; domain=${domain}`;
            document.cookie = `googtrans=/en/${code}; path=/; domain=.${domain}`;
            document.cookie = `googtrans=/en/${code}; path=/`;
        }

        // Force reload to completely clear translation and apply the cookie
        window.location.reload();
    };

    const activeLanguage = LANGUAGES.find((l) => l.code === active) || LANGUAGES[0];

    return (
        <>
            {/* Hidden Native Google Translate element container */}
            {/* We use an offscreen position instead of display:none because GT needs to be rendered to work */}
            <div
                id="google_translate_element"
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    top: '-9999px',
                    visibility: 'hidden'
                }}
            />

            {/* Floating Button - Bottom Right Round */}
            <div
                ref={dropdownRef}
                style={{
                    position: 'fixed',
                    right: '24px',
                    bottom: '28px',
                    zIndex: 99999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}
                className="notranslate"
            >
                {/* Dropdown menu - opens upward */}
                {open && (
                    <div
                        style={{
                            position: 'absolute',
                            right: '0',
                            bottom: '70px',
                            background: 'white',
                            borderRadius: '14px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)',
                            overflow: 'hidden',
                            minWidth: '180px',
                            border: '1px solid rgba(0,0,0,0.07)',
                            animation: 'gt-slideUp 0.2s ease',
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                padding: '10px 16px 8px',
                                fontSize: '11px',
                                fontWeight: '700',
                                color: '#6b7280',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                borderBottom: '1px solid #f3f4f6',
                                fontFamily: 'system-ui, sans-serif',
                            }}
                        >
                            🌐 Select Language
                        </div>

                        {LANGUAGES.map((lang) => {
                            const isActive = active === lang.code;
                            return (
                                <button
                                    key={lang.code}
                                    onClick={() => selectLanguage(lang.code)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        padding: '10px 16px',
                                        background: isActive
                                            ? 'linear-gradient(90deg, #e0f2fe 0%, #f0fdf4 100%)'
                                            : 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'background 0.15s',
                                        fontFamily: 'system-ui, sans-serif',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.currentTarget.style.background = '#f9fafb';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <span style={{ fontSize: '18px' }}>{lang.flag}</span>
                                    <span
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '13px',
                                                fontWeight: isActive ? '700' : '500',
                                                color: isActive ? '#0369a1' : '#1f2937',
                                                lineHeight: '1.2',
                                            }}
                                        >
                                            {lang.nativeLabel}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: '11px',
                                                color: '#6b7280',
                                                lineHeight: '1.2',
                                            }}
                                        >
                                            {lang.label}
                                        </span>
                                    </span>
                                    {isActive && (
                                        <span
                                            style={{
                                                marginLeft: 'auto',
                                                color: '#0369a1',
                                                fontSize: '14px',
                                                fontWeight: '700',
                                            }}
                                        >
                                            ✓
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Main Floating Button - Round with glow */}
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    title="Translate Language"
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: open
                            ? '#1e4a96'
                            : '#2A62BC',
                        border: '3px solid rgba(255,255,255,0.35)',
                        cursor: 'pointer',
                        boxShadow: open
                            ? '0 0 0 6px rgba(42,98,188,0.3), 0 8px 28px rgba(42,98,188,0.5)'
                            : '0 0 0 4px rgba(42,98,188,0.2), 0 6px 24px rgba(42,98,188,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.25s ease',
                        gap: '2px',
                        padding: '0',
                        animation: open ? 'none' : 'gt-pulse 2.5s infinite',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 0 0 8px rgba(42,98,188,0.25), 0 10px 32px rgba(42,98,188,0.55)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(42,98,188,0.2), 0 6px 24px rgba(42,98,188,0.4)';
                    }}
                >
                    {/* Globe icon SVG */}
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span
                        style={{
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.9)',
                            fontWeight: '700',
                            fontFamily: 'system-ui, sans-serif',
                            letterSpacing: '0.03em',
                            textTransform: 'uppercase',
                        }}
                    >
                        {activeLanguage.code === 'en' ? 'EN' : activeLanguage.code.toUpperCase()}
                    </span>
                </button>
            </div>

            {/* Animation keyframes */}
            <style>{`
        @keyframes gt-slideIn {
          from { opacity: 0; transform: translateY(-50%) translateX(10px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }

        @keyframes gt-slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes gt-pulse {
          0%   { box-shadow: 0 0 0 0px rgba(42,98,188,0.9), 0 0 0 0px rgba(42,98,188,0.5), 0 6px 24px rgba(42,98,188,0.6); }
          70%  { box-shadow: 0 0 0 20px rgba(42,98,188,0), 0 0 0 10px rgba(42,98,188,0.1), 0 8px 28px rgba(42,98,188,0.4); }
          100% { box-shadow: 0 0 0 0px rgba(42,98,188,0), 0 0 0 0px rgba(42,98,188,0), 0 6px 24px rgba(42,98,188,0.6); }
        }
        
        /* Force hide all Google Translate injections unconditionally */
        body > .skiptranslate, 
        .goog-te-banner-frame.skiptranslate,
        .goog-te-balloon-frame,
        #goog-gt-tt,
        .goog-te-spinner-pos {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        
        /* Reset any body shift caused by Google Translate */
        body {
          top: 0 !important;
          position: static !important;
        }
      `}</style>
        </>
    );
}
