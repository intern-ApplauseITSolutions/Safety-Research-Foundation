import React, { useState } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import OurProjects from '../components/sections/ourfocus/OurProjects';
import NewsAndEvents from '../components/sections/newsandevents/NewsAndEvents';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('projects');

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="bg-white shadow-md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'projects'
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Current Projects
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'events'
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Our Events
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'projects' && <OurProjects />}
        {activeTab === 'events' && <NewsAndEvents />}
      </div>
    </div>
  );
}
