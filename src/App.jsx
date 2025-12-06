import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FocusPage from './pages/FocusPage';
import EventsPage from './pages/EventsPage';
import ImagesPage from './pages/ImagesPage';
import ContactPage from './pages/ContactPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import PledgePage from './pages/PledgePage';
import DonatePage from './pages/DonatePage';
import EventDetail from './components/pages/EventDetail';
import TeamDetail from './components/pages/TeamDetail';

// Component to reset Google Translate when not on pledge page
function TranslationReset() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const hasReloadedRef = useRef(false);

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevPathRef.current;
    
    // If navigating away from pledge page, automatically reload to reset translation
    if (prevPath === '/pledge' && currentPath !== '/pledge') {
      // Check if we've already reloaded for this path
      const reloadKey = `reload_${currentPath}`;
      if (!hasReloadedRef.current && !sessionStorage.getItem(reloadKey)) {
        hasReloadedRef.current = true;
        sessionStorage.setItem(reloadKey, 'true');
        // Automatically reload the page to ensure clean English state
        window.location.reload();
        return;
      }
    }

    // Reset reload flag when on pledge page
    if (currentPath === '/pledge') {
      hasReloadedRef.current = false;
      // Clear all reload flags when on pledge page
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('reload_')) {
          sessionStorage.removeItem(key);
        }
      });
    }

    // If not on pledge page, hide translate widget
    if (currentPath !== '/pledge') {
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.style.display = 'none';
      }
      
      // Hide translate elements
      const iframe = document.querySelector('.goog-te-banner-frame');
      if (iframe) {
        iframe.style.display = 'none';
      }
      const translateBar = document.querySelector('.skiptranslate');
      if (translateBar) {
        translateBar.style.display = 'none';
      }
    }

    // Update previous path
    prevPathRef.current = currentPath;
  }, [location.pathname]);

  return null;
}

function App() {
  // No need for click handler since we're using automatic reload

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <TranslationReset />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/focus" element={<FocusPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/images" element={<ImagesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="/pledge" element={<PledgePage />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/team/:id" element={<TeamDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
