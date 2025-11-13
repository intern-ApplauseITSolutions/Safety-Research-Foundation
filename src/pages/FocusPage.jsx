import React, { useEffect, useRef } from 'react';
import RoadSafetyFocus from '../components/sections/ourfocus/RoadSafetyFocus';
import CoreInterventions from '../components/sections/ourfocus/CoreInterventions';
import OurProjects from '../components/sections/ourfocus/OurProjects';

export default function FocusPage() {
  const sectionRefs = useRef([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    // Observe all sections
    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div 
        ref={(el) => (sectionRefs.current[0] = el)}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <RoadSafetyFocus />
      </div>
      <div 
        ref={(el) => (sectionRefs.current[1] = el)}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200"
      >
        <CoreInterventions />
      </div>
      <div 
        ref={(el) => (sectionRefs.current[2] = el)}
        className="opacity-0 translate-y-8 transition-all duration-700 ease-out delay-400"
      >
        <OurProjects />
      </div>
    </div>
  );
}
