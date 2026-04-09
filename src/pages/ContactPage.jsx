import React from 'react';
import DynamicContact from '../components/sections/contactus/DynamicContact';

export default function ContactPage() {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <DynamicContact />
    </div>
  );
}
