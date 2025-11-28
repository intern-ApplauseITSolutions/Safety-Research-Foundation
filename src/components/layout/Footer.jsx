import { MapPin, Phone, Mail, Shield, Linkedin, Facebook } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import footerLogo from '../../assets/logo/footer_logo.jpg';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-primary text-white py-8 sm:py-10 md:py-12 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none"></div>
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* About */}
            <div>
              <div className="mb-3 sm:mb-4">
                <img src={footerLogo} alt="Safety Research Foundation" className="h-12 sm:h-14 md:h-16 w-auto" />
              </div>
              <p className="text-sm sm:text-base text-white leading-relaxed mb-4 sm:mb-6">
                Dedicated to promoting road safety awareness, education, and training to reduce accidents and save lives across India.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-2 sm:gap-3">
                <a href="https://www.linkedin.com/in/safety-research-foundation-397695183/" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-white/30 transition">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </a>
                <a href="https://www.facebook.com/people/Safety-Research-Foundation/100069078591353/" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-white/30 transition">
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </a>
                <a href="https://x.com/ResearchSafety" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-white/30 transition">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Quick Links</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => `text-sm sm:text-base transition-all duration-300 pb-1 border-b-2 border-dashed inline-block ${
                      isActive 
                        ? 'text-white border-white' 
                        : 'text-white border-transparent hover:text-white hover:border-white/50'
                    }`}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => `text-sm sm:text-base transition-all duration-300 pb-1 border-b-2 border-dashed inline-block ${
                      isActive 
                        ? 'text-white border-white' 
                        : 'text-white border-transparent hover:text-white hover:border-white/50'
                    }`}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/focus" 
                    className={({ isActive }) => `text-sm sm:text-base transition-all duration-300 pb-1 border-b-2 border-dashed inline-block ${
                      isActive 
                        ? 'text-white border-white' 
                        : 'text-white border-transparent hover:text-white hover:border-white/50'
                    }`}
                  >
                    Our Focus
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/events" 
                    className={({ isActive }) => `text-sm sm:text-base transition-all duration-300 pb-1 border-b-2 border-dashed inline-block ${
                      isActive 
                        ? 'text-white border-white' 
                        : 'text-white border-transparent hover:text-white hover:border-white/50'
                    }`}
                  >
                    News & Events
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/contact" 
                    className={({ isActive }) => `text-sm sm:text-base transition-all duration-300 pb-1 border-b-2 border-dashed inline-block ${
                      isActive 
                        ? 'text-white border-white' 
                        : 'text-white border-transparent hover:text-white hover:border-white/50'
                    }`}
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Contact Info</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3 group">
                  <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-white/30 transition">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0" />
                  </div>
                  <p className="text-white text-xs sm:text-sm">
                   Office No.504, S.No.128 Seasons Business Square, Seasons Road, Sanewadi, Aundh, Pune – 411007 Maharashtra.
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 group">
                  <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-white/30 transition">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0" />
                  </div>
                  <a href="mailto:contact@safetyresearchfoundation.org" className="text-white hover:text-brand-orange transition text-xs sm:text-sm whitespace-nowrap">
                    contact@safetyresearchfoundation.org
                  </a>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 group">
                  <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-white/30 transition">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0" />
                  </div>
                  <a href="tel:+917030910122" className="text-white hover:text-brand-orange transition text-xs sm:text-sm">
                    +91 7030910122
                  </a>
                </div>
              </div>
            </div>

            {/* Small Map - Added on Right */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Find Us</h3>
              <div className="bg-white/10 rounded-lg overflow-hidden w-full h-32 sm:h-40 md:h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.5991351!3d12.9622691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15db5f616a8b%3A0x7b2b0b0b0b0b0b0b!2sRegus%20Global%20Tech%20Park!5e0!3m2!1sen!2sin!4v1696234567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-6 sm:pt-8 text-center">
            <p className="text-white text-xs sm:text-sm">
              &copy; 2025-2026 Safety Research Foundation. All rights reserved. | 
              <span className="text-white font-medium"> Committed to making Indian roads safer.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
