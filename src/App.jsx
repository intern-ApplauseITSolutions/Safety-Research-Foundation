import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingTranslate from './components/common/FloatingTranslate';
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

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
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
        
        {/* Floating Translate Button */}
        <FloatingTranslate />
      </div>
    </Router>
  );
}

export default App;
