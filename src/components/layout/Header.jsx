import { Phone, Mail, Heart, Menu, X, Linkedin, Facebook, HandHeart, ChevronDown } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import logo from '../../assets/logo/logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const navigate = useNavigate();
  const closeTimeoutRef = useRef(null);

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

  return (
    <>
      {/* Indian Flag Top Bar */}
      <div className="relative overflow-hidden">
        {/* Flag Stripes */}
        <div className="flex flex-col">
          {/* Saffron Stripe */}
          <div className="bg-brand-orange h-2"></div>
          {/* White Stripe */}
          <div className="bg-white h-10 relative flex items-center">
            {/* Contact Info and Social Media */}
            <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center text-sm relative z-10">
              <div className="flex items-center gap-4">
                <a href="tel:+917030910122" className="flex items-center gap-1 hover:text-brand-orange text-brand-black transition-colors duration-300">
                  <Phone size={14} />
                  <span className="hidden sm:inline">+91 7030910122</span>
                </a>
                <a href="mailto:contact@safetyresearchfoundation.org" className="flex items-center gap-1 hover:text-brand-orange text-brand-black transition-colors duration-300">
                  <Mail size={14} />
                  <span className="hidden md:inline">contact@safetyresearchfoundation.org</span>
                </a>
              </div>
              
              {/* Social Media Icons - Smaller on mobile */}
              <div className="flex items-center gap-1 sm:gap-3">
                <a href="https://www.linkedin.com/in/safety-research-foundation-397695183/" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-primary/10 p-1 sm:p-2 rounded-lg group-hover:bg-primary/20 transition">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                </a>
                <a href="https://www.facebook.com/people/Safety-Research-Foundation/100069078591353/" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-primary/10 p-1 sm:p-2 rounded-lg group-hover:bg-primary/20 transition">
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                </a>
                <a href="https://x.com/ResearchSafety" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-primary/10 p-1 sm:p-2 rounded-lg group-hover:bg-primary/20 transition">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
          {/* Green Stripe */}
          <div className="bg-brand-green h-2"></div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-[100] w-full">
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
                  Focus Area
                  {/* <ChevronDown size={14} className={`transition-transform ${openDropdown === 'focus' ? 'rotate-180' : ''}`} /> */}
                </NavLink>
                {/* {openDropdown === 'focus' && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-100 z-50">
                    <NavLink 
                      to="/core-intervention" 
                      className="block px-4 py-2 text-brand-black hover:bg-primary/10 hover:text-primary transition"
                    >
                      Core Intervention
                    </NavLink>
                    <NavLink 
                      to="/current-project" 
                      className="block px-4 py-2 text-brand-black hover:bg-primary/10 hover:text-primary transition"
                    >
                      Current Project
                    </NavLink>
                  </div>
                )} */}
              </div>
              
              <NavLink to="/events" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed whitespace-nowrap ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                Spotlight
              </NavLink>

              <NavLink to="/contact" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed whitespace-nowrap ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                Contact Us
              </NavLink>
              <button onClick={navigateToGetInvolved} className="bg-brand-green hover:bg-brand-green/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold transition inline-flex items-center gap-1.5 shadow-md whitespace-nowrap">
                <Heart size={14} fill="currentColor" />
                Get Involved
              </button>
              <button onClick={navigateToPledge} className="bg-brand-green hover:bg-brand-green/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold transition inline-flex items-center gap-1.5 shadow-md whitespace-nowrap">
                <HandHeart size={14} />
                Take a Pledge
              </button>
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
                
                {/* Mobile Our Focus Area Dropdown */}
                <div>
                  <NavLink 
                    to="/focus"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setMobileDropdown(null);
                    }}
                    className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'} flex items-center gap-1 w-full justify-between`}
                  >
                    <span>Focus Area</span>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMobileDropdown(mobileDropdown === 'focus' ? null : 'focus');
                      }}
                      className="p-1"
                    >
                      <ChevronDown size={16} className={`transition-transform ${mobileDropdown === 'focus' ? 'rotate-180' : ''}`} />
                    </button>
                  </NavLink>
                  {mobileDropdown === 'focus' && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      <NavLink 
                        to="/core-intervention" 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-brand-black hover:text-primary transition py-1"
                      >
                        Core Intervention
                      </NavLink>
                      <NavLink 
                        to="/current-project" 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-brand-black hover:text-primary transition py-1"
                      >
                        Current Project
                      </NavLink>
                    </div>
                  )}
                </div>
                
                <NavLink to="/events" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  Spotlight
                </NavLink>

                <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  Contact Us
                </NavLink>
                <button onClick={navigateToGetInvolved} className="bg-brand-green hover:bg-brand-green/90 text-white px-4 py-2 rounded-full font-semibold transition flex items-center justify-center gap-1">
                  <Heart size={16} fill="currentColor" />
                  Get Involved
                </button>
                <button onClick={navigateToPledge} className="bg-brand-green hover:bg-brand-green/90 text-white px-4 py-2 rounded-full font-semibold transition flex items-center justify-center gap-1">
                  <HandHeart size={16} />
                  Take a Pledge
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
