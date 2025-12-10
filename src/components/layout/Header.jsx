import { Phone, Mail, Heart, Menu, X, Linkedin, Facebook, HandHeart, ChevronDown, DollarSign } from 'lucide-react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import logo from '../../assets/images/SRF logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const closeTimeoutRef = useRef(null);

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

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
              </div>
            </nav>
          )}
        </div>

      </header>
    </>
  );
}
