import { Phone, Mail, Heart, Menu, X, Linkedin, Facebook, HandHeart } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/logo/logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToDonate = () => {
    navigate('/donate');
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
          {/* White Stripe with Ashoka Chakra */}
          <div className="bg-white h-10 relative flex items-center">
            {/* Ashoka Chakra */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg width="36" height="36" viewBox="0 0 100 100" className="text-gray-600/70">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3"/>
                {/* 24 spokes */}
                {Array.from({ length: 24 }, (_, i) => {
                  const angle = (i * 15) * Math.PI / 180;
                  const x1 = 50 + 18 * Math.cos(angle);
                  const y1 = 50 + 18 * Math.sin(angle);
                  const x2 = 50 + 43 * Math.cos(angle);
                  const y2 = 50 + 43 * Math.sin(angle);
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2.5"/>
                  );
                })}
                <circle cx="50" cy="50" r="8" fill="currentColor"/>
              </svg>
            </div>
            
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
            <nav className="hidden lg:flex items-center gap-6">
              <NavLink to="/" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                About
              </NavLink>
              <NavLink to="/focus" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                Our Focus
              </NavLink>
              <NavLink to="/events" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                News & Events
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                Contact Us
              </NavLink>
              <button onClick={navigateToDonate} className="bg-brand-green hover:bg-brand-green/90 text-white px-5 py-2 rounded-full font-semibold transition flex items-center gap-2 shadow-md">
                <Heart size={16} fill="currentColor" />
                Donate
              </button>
              <button onClick={navigateToPledge} className="bg-brand-green hover:bg-brand-green/90 text-white px-5 py-2 rounded-full font-semibold transition flex items-center gap-2 shadow-md">
                <HandHeart size={16} />
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
                <NavLink to="/focus" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  Our Focus
                </NavLink>
                <NavLink to="/events" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  News & Events
                </NavLink>
                <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-medium transition pb-1 border-b-2 border-dashed ${isActive ? 'text-primary border-primary' : 'text-brand-black hover:text-primary border-transparent hover:border-primary/30'}`}>
                  Contact Us
                </NavLink>
                <button onClick={navigateToDonate} className="bg-brand-green hover:bg-brand-green/90 text-white px-4 py-2 rounded-full font-semibold transition flex items-center justify-center gap-1">
                  <Heart size={16} fill="currentColor" />
                  Donate
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
