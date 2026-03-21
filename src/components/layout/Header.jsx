import { Phone, Mail, Heart, Menu, X, Linkedin, Facebook, HandHeart, ChevronDown, DollarSign, Globe } from 'lucide-react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import logo from '../../assets/images/SRF logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const closeTimeoutRef = useRef(null);

  const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'mr', label: 'मराठी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'ml', label: 'മലയാളം' },
  ];

  const getActiveLang = () => {
    const match = document.cookie.match(/(?:^|;)\s*googtrans=\/en\/([^;]*)/);
    return match ? match[1] : 'en';
  };

  const selectLang = (code) => {
    setLangOpen(false);
    const domain = window.location.hostname;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    if (code !== 'en') {
      document.cookie = `googtrans=/en/${code}; path=/; domain=${domain}`;
      document.cookie = `googtrans=/en/${code}; path=/; domain=.${domain}`;
      document.cookie = `googtrans=/en/${code}; path=/`;
    }
    window.location.reload();
  };

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Initialize Google Translate script
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,ta,kn,bn,mr,te,gu,ml',
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

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.lang-dropdown-wrapper')) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleMouseEnter = (dropdown) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const navigateToGetInvolved = () => {
    navigate('/get-involved');
    setIsMenuOpen(false);
  };

  const navigateToPledge = () => {
    navigate('/pledge');
    setIsMenuOpen(false);
  };

  const navigateToDonate = () => {
    navigate('/donate');
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }} />
      <style>{`
        body > .skiptranslate, .goog-te-banner-frame, .goog-te-balloon-frame, #goog-gt-tt, .goog-te-spinner-pos { display: none !important; }
        body { top: 0 !important; position: static !important; }
      `}</style>

      {/* Main Header */}
      <header className="bg-white shadow-lg fixed top-0 z-[90] w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Safety Research Foundation" className="h-12 md:h-16" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-baseline gap-4 xl:gap-5 text-sm xl:text-base">
              <NavLink to="/" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed whitespace-nowrap ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed whitespace-nowrap ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                About
              </NavLink>

              {/* Our Focus Area Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('focus')}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink
                  to="/focus"
                  className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed whitespace-nowrap ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'} inline-flex items-center gap-1`}
                >
                  Our Approach
                </NavLink>
              </div>

              <NavLink to="/events" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed whitespace-nowrap ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                Spotlight
              </NavLink>

              <NavLink to="/contact" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed whitespace-nowrap ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                Contact Us
              </NavLink>

              <NavLink to="/get-involved" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed whitespace-nowrap ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                Get Involved
              </NavLink>

              <button onClick={navigateToDonate} className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold transition inline-flex items-center gap-1.5 shadow-md whitespace-nowrap">
                <Heart size={14} fill="currentColor" />
                Donate
              </button>
              <button onClick={navigateToPledge} className="bg-brand-green hover:bg-brand-green/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold transition inline-flex items-center gap-1.5 shadow-md whitespace-nowrap">
                <HandHeart size={14} />
                Take a Pledge
              </button>

              {/* Language Selector */}
              <div className="relative lang-dropdown-wrapper notranslate">
                <button
                  onClick={() => setLangOpen(p => !p)}
                  className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold transition inline-flex items-center gap-1.5 shadow-md whitespace-nowrap"
                >
                  <Globe size={14} />
                  {getActiveLang() === 'en' ? 'EN' : getActiveLang().toUpperCase()}
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[140px]">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => selectLang(lang.code)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-primary/10 hover:text-primary ${getActiveLang() === lang.code ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-brand-black hover:text-primary">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col gap-4">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  Home
                </NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  About
                </NavLink>

                <NavLink to="/focus" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  Our Approach
                </NavLink>

                <NavLink to="/events" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  Spotlight
                </NavLink>

                <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  Contact Us
                </NavLink>

                <NavLink to="/get-involved" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  Get Involved
                </NavLink>

                <button onClick={navigateToDonate} className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full font-semibold transition flex items-center justify-center gap-1">
                  <Heart size={16} fill="currentColor" />
                  Donate
                </button>
                <button onClick={navigateToPledge} className="bg-brand-green hover:bg-brand-green/90 text-white px-4 py-2 rounded-full font-semibold transition flex items-center justify-center gap-1">
                  <HandHeart size={16} />
                  Take a Pledge
                </button>

                {/* Language Selector - Mobile */}
                <div className="notranslate">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Select Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => selectLang(lang.code)}
                        className={`px-3 py-2 rounded-full text-sm font-semibold transition border ${getActiveLang() === lang.code
                          ? 'bg-primary text-white border-primary'
                          : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-primary/10 hover:text-primary'
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          )}
        </div>

      </header>
    </>
  );
}
