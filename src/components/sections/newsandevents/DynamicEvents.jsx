import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, ArrowRight, Clock, Tag, Youtube, FileText, Play, ExternalLink, Quote, Star, Image, Video, Newspaper, Headphones, BookOpen, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { eventsService } from '../../../services/eventsService';

// Create a simple media service since it doesn't exist yet
const mediaService = {
  getAllMedia: async (params = {}) => {
    const response = await fetch('/api/public/media.php?' + new URLSearchParams(params));
    return response.json();
  }
};

// Create testimonials service
const testimonialsService = {
  getAllTestimonials: async () => {
    const response = await fetch('/api/public/testimonials.php');
    return response.json();
  }
};

// Import eBooks (fallback)
import braceHandbook from '../../../assets/ebooks/BRACE-Handbook.pdf';
import roadwiseKannada from '../../../assets/ebooks/ROADWISE-Kannada.pdf';

// Import eBook cover images (fallback)
import braceHandbookCover from '../../../assets/images/Website  (1).png';
import roadwiseKannadaCover from '../../../assets/images/srf-img.png';

// Import Audio files - BOSCH Creatives (fallback)
import audio1 from '../../../assets/images/BOSCH creative 01 (15 secs) NEW rev.mp3';
import audio2 from '../../../assets/images/BOSCH creative 02 (15 secs) NEW rev.mp3';
import audio3 from '../../../assets/images/BOSCH creative 03 (15 secs) NEW rev.mp3';
import audio4 from '../../../assets/images/BOSCH creative 04 (15 secs) NEW rev.mp3';
import audio5 from '../../../assets/images/BOSCH creative 05 (15 secs) NEW rev.mp3';
import audio6 from '../../../assets/images/BOSCH creative 06 (15 secs) NEW rev.mp3';
import audio7 from '../../../assets/images/BOSCH creative 07 (15 secs) NEW rev.mp3';
import audio8 from '../../../assets/images/BOSCH creative 08 (15 secs) NEW rev.mp3';
import audio9 from '../../../assets/images/BOSCH creative 09 (15 secs) NEW rev.mp3';
import audio10 from '../../../assets/images/BOSCH creative 10 (15 secs) NEW rev.mp3';
import audio11 from '../../../assets/images/BOSCH creative 11 (15 secs) NEW rev.mp3';
import audio12 from '../../../assets/images/BOSCH creative 12 (15 secs) NEW rev.mp3';

// Fallback static testimonials
const fallbackTestimonials = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Principal, St Joseph Boys High School, Kirkee, Pune",
    rating: 5,
    text: "The Road Safety Awareness Program conducted by Safety Research Foundation was highly impactful. Our students learned crucial safety practices that they can apply in their daily lives. The interactive sessions and practical demonstrations made the learning experience memorable."
  },
  {
    id: 2,
    name: "Inspector P. Masalkar",
    role: "Senior Police Inspector, Pune University Traffic Police Station",
    rating: 5,
    text: "SRF's Go Yellow campaign was a remarkable initiative that created significant awareness among road users. The team's dedication and systematic approach to road safety education is commendable. We look forward to more such collaborative efforts."
  },
  {
    id: 3,
    name: "Mrs. Priya Sharma",
    role: "Parent, Tuljabhavani Housing Society, Ravet",
    rating: 5,
    text: "The Child Safety Seat Awareness session was eye-opening. I never realized how crucial proper installation is for my child's safety. The hands-on demonstration in my own car helped me understand the correct usage. Thank you SRF for this valuable session!"
  },
  {
    id: 4,
    name: "Father Joyce Kurian",
    role: "School Administrator, St Arnolds School, Wadgaon Shari",
    rating: 5,
    text: "Safety Research Foundation's program was well-structured and age-appropriate for our students. The emphasis on traffic rules, pedestrian safety, and helmet usage resonated well with the children. This is exactly the kind of education our youth needs."
  },
  {
    id: 5,
    name: "Mr. Chandrakant Madane",
    role: "Police Inspector, Kuhi Police Station, Nagpur",
    rating: 5,
    text: "The reflective safety jacket distribution by SRF was a thoughtful gesture that shows their commitment to the safety of those who serve on the roads. These jackets significantly improve our visibility during night duties, enhancing our safety while we ensure public safety."
  },
  {
    id: 6,
    name: "Prof. Anil Deshmukh",
    role: "Faculty, Data Science Department, Symbiosis Open Skills University",
    rating: 5,
    text: "The session on data-driven road safety was perfectly tailored for our data science students. It demonstrated real-world applications of data analytics in solving critical social issues. SRF's evidence-based approach is truly inspiring."
  }
];

// Fallback eBooks
const fallbackEbooks = [
  {
    id: 1,
    title: "BRACE Handbook",
    description: "Comprehensive guide on road safety best practices and awareness",
    file: braceHandbook,
    cover: braceHandbookCover,
    fileSize: "PDF",
    category: "Road Safety Guide"
  },
  {
    id: 2,
    title: "ROADWISE - Kannada",
    description: "Road safety awareness guide in Kannada language",
    file: roadwiseKannada,
    cover: roadwiseKannadaCover,
    fileSize: "PDF",
    category: "Road Safety Guide"
  }
];

// Fallback Audio files
const fallbackAudio = [
  { id: 1, title: "BOSCH Creative 01", file: audio1 },
  { id: 2, title: "BOSCH Creative 02", file: audio2 },
  { id: 3, title: "BOSCH Creative 03", file: audio3 },
  { id: 4, title: "BOSCH Creative 04", file: audio4 },
  { id: 5, title: "BOSCH Creative 05", file: audio5 },
  { id: 6, title: "BOSCH Creative 06", file: audio6 },
  { id: 7, title: "BOSCH Creative 07", file: audio7 },
  { id: 8, title: "BOSCH Creative 08", file: audio8 },
  { id: 9, title: "BOSCH Creative 09", file: audio9 },
  { id: 10, title: "BOSCH Creative 10", file: audio10 },
  { id: 11, title: "BOSCH Creative 11", file: audio11 },
  { id: 12, title: "BOSCH Creative 12", file: audio12 }
];

const DynamicEvents = ({ initialSection, initialMediaTab }) => {
  const navigate = useNavigate();
  const [mainSection, setMainSection] = useState(initialSection || 'events'); // 'events', 'media', or 'testimonials'
  const [eventTab, setEventTab] = useState('upcoming'); // 'upcoming' or 'completed'
  const [mediaTab, setMediaTab] = useState(initialMediaTab || 'videos'); // 'videos', 'images', 'documents', 'printmedia', 'audio', or 'ebook'
  const [documentTab, setDocumentTab] = useState('brace'); // 'brace' or 'msia'
  const [filter, setFilter] = useState('all');
  
  // State for dynamic data
  const [eventsData, setEventsData] = useState([]);
  const [mediaData, setMediaData] = useState({
    videos: [],
    images: [],
    documents: [],
    audio: [],
    ebooks: []
  });
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [loading, setLoading] = useState({
    events: false,
    media: false,
    testimonials: false
  });
  const [error, setError] = useState(null);
  
  // Image gallery state
  const [imagesToShow, setImagesToShow] = useState(12);
  const [loadedImages, setLoadedImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  
  // Testimonials carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);
  
  const categories = ['all', 'School Program', 'Awareness Session', 'Public Awareness', 'Webinar', 'Safety Audit', 'Police Support'];
  
  // Load data from backend
  useEffect(() => {
    loadEvents();
    loadMedia();
    loadTestimonials();
  }, []);

  const loadEvents = async () => {
    setLoading(prev => ({ ...prev, events: true }));
    try {
      const response = await eventsService.getAllEvents({ limit: 100 });
      if (response.success) {
        setEventsData(response.data.events);
      } else {
        setError('Failed to load events');
      }
    } catch (err) {
      setError('Error loading events');
      console.error('Events loading error:', err);
    } finally {
      setLoading(prev => ({ ...prev, events: false }));
    }
  };

  const loadMedia = async () => {
    setLoading(prev => ({ ...prev, media: true }));
    try {
      const [videosRes, imagesRes, documentsRes, audioRes, ebooksRes] = await Promise.all([
        mediaService.getAllMedia({ type: 'video', limit: 50 }),
        mediaService.getAllMedia({ type: 'image', limit: 100 }),
        mediaService.getAllMedia({ type: 'document', limit: 50 }),
        mediaService.getAllMedia({ type: 'audio', limit: 50 }),
        mediaService.getAllMedia({ type: 'ebook', limit: 20 })
      ]);

      setMediaData({
        videos: videosRes.success ? videosRes.data.media : [],
        images: imagesRes.success ? imagesRes.data.media : [],
        documents: documentsRes.success ? documentsRes.data.media : [],
        audio: audioRes.success ? audioRes.data.media : [],
        ebooks: ebooksRes.success ? ebooksRes.data.media : []
      });
    } catch (err) {
      setError('Error loading media');
      console.error('Media loading error:', err);
    } finally {
      setLoading(prev => ({ ...prev, media: false }));
    }
  };

  const loadTestimonials = async () => {
    setLoading(prev => ({ ...prev, testimonials: true }));
    try {
      const response = await testimonialsService.getAllTestimonials();
      if (response.success) {
        setTestimonialsData(response.data.testimonials);
      } else {
        // Fallback to static testimonials if API fails
        setTestimonialsData(fallbackTestimonials);
      }
    } catch (err) {
      // Fallback to static testimonials if API fails
      setTestimonialsData(fallbackTestimonials);
      console.error('Testimonials loading error:', err);
    } finally {
      setLoading(prev => ({ ...prev, testimonials: false }));
    }
  };
  
  // Parse dates and separate upcoming vs completed events
  const parseEventDate = (dateStr) => {
    const monthMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'Sep': 8, 'October': 9, 'November': 10, 'December': 11, 'Feb': 1
    };
    
    const parts = dateStr.split(' ');
    let year, month, day;
    
    year = parseInt(parts.find(p => p.length === 4));
    for (let part of parts) {
      if (monthMap[part] !== undefined) {
        month = monthMap[part];
        break;
      }
    }
    for (let part of parts) {
      const dayMatch = part.match(/^(\d+)/);
      if (dayMatch) {
        day = parseInt(dayMatch[1]);
        break;
      }
    }
    
    return new Date(year, month, day);
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = eventsData.filter(event => {
    const eventDate = parseEventDate(event.date);
    return eventDate >= today;
  });
  
  const completedEvents = eventsData.filter(event => {
    const eventDate = parseEventDate(event.date);
    return eventDate < today;
  });
  
  const displayEvents = eventTab === 'upcoming' ? upcomingEvents : completedEvents;
  const filteredEvents = filter === 'all' ? displayEvents : displayEvents.filter(event => event.category === filter);

  // Use dynamic data or fallback
  const videos = mediaData.videos.length > 0 ? mediaData.videos : [];
  const images = mediaData.images.length > 0 ? mediaData.images : [];
  const documents = mediaData.documents.length > 0 ? mediaData.documents : [];
  const audio = mediaData.audio.length > 0 ? mediaData.audio : fallbackAudio;
  const ebooks = mediaData.ebooks.length > 0 ? mediaData.ebooks : fallbackEbooks;
  const testimonials = testimonialsData.length > 0 ? testimonialsData : fallbackTestimonials;

  // Load images dynamically from assets (fallback)
  const trafficAwarenessModules = import.meta.glob('../../../assets/events/Traffic Awareness/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: false, import: 'default' });
  const sharedImagesModules = import.meta.glob('../../../assets/images/shared image*.{jpg,JPG,jpeg,JPEG,png,PNG,jfif,JFIF}', { eager: false, import: 'default' });

  // Load images when Images tab is active
  useEffect(() => {
    if (mainSection === 'media' && mediaTab === 'images' && loadedImages.length === 0 && images.length === 0) {
      setIsLoadingImages(true);
      const loadImages = async () => {
        // Combine both image sources
        const trafficEntries = Object.entries(trafficAwarenessModules);
        const sharedEntries = Object.entries(sharedImagesModules);
        const allEntries = [...trafficEntries, ...sharedEntries];
        const loaded = [];
        
        for (let i = 0; i < allEntries.length; i++) {
          const [path, importFn] = allEntries[i];
          const image = await importFn();
          loaded.push({
            id: i + 1,
            image: image,
            path: path
          });
          
          if ((i + 1) % 6 === 0 || i === allEntries.length - 1) {
            setLoadedImages([...loaded]);
          }
        }
        setIsLoadingImages(false);
      };
      loadImages();
    }
  }, [mainSection, mediaTab, images.length]);

  // Reset pagination when leaving images tab
  useEffect(() => {
    if (mediaTab !== 'images') {
      setImagesToShow(12);
    }
  }, [mediaTab]);

  const displayedImages = images.length > 0 ? images.slice(0, imagesToShow) : loadedImages.slice(0, imagesToShow);
  const hasMoreImages = images.length > 0 ? imagesToShow < images.length : imagesToShow < loadedImages.length;

  const loadMoreImages = () => {
    setImagesToShow(prev => Math.min(prev + 12, images.length > 0 ? images.length : loadedImages.length));
  };

  const handleReadMore = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  // Testimonials carousel auto-play functionality
  useEffect(() => {
    if (mainSection === 'testimonials' && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, mainSection, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">News & Events</h1>
            <div className="flex items-center space-x-4">
              <select
                value={eventTab}
                onChange={(e) => setEventTab(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>  */}
          
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mx-4 mt-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Main Section Tabs (Events / Media / Testimonials) */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <div className="flex items-center justify-center mb-6 sm:mb-8">
                      <div className="hidden sm:block flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
                      <div className="flex items-center gap-3 sm:gap-4 mx-3 sm:mx-4 md:mx-6">
                        <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-black whitespace-nowrap">Our Events</h2>
                      </div>
                      <div className="hidden sm:block flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
                    </div>
            </div>
      <div className="md py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setMainSection('events')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                mainSection === 'events'
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Events
            </button>
            <button
              onClick={() => setMainSection('media')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                mainSection === 'media'
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Youtube className="w-5 h-5" />
              Media
            </button>
            <button
              onClick={() => setMainSection('testimonials')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                mainSection === 'testimonials'
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Quote className="w-5 h-5" />
              Testimonials
            </button>
          </div>
        </div>
      </div>

      {/* EVENTS SECTION */}
      {mainSection === 'events' && (
        <>
          {/* Featured Events */}
          {upcomingEvents.length > 0 && (
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Featured Events</h2>
                  <p className="text-blue-100 text-lg">Highlighting our most important safety initiatives</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                      <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <Calendar className="h-16 w-16 text-blue-600" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3">{event.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Tag className="h-3 w-3 mr-1" />
                            {event.category}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                            Learn More <ArrowRight className="h-4 w-4 inline ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Event Type Tabs (Upcoming/Completed) */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 sm:mb-6 max-w-lg mx-auto">
              <button
                onClick={() => setEventTab('upcoming')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  eventTab === 'upcoming'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                Upcoming Events ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setEventTab('completed')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  eventTab === 'completed'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                Completed Events ({completedEvents.length})
              </button>
            </div>

            {/* Filter Tabs - Only show for completed events */}
            {eventTab === 'completed' && (
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 px-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      filter === category
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            )}

          {/* Loading State */}
          {loading.events && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          )}

          {/* No Events Message */}
          {!loading.events && filteredEvents.length === 0 && (
            <div className="text-center py-12 sm:py-16 px-4">
              <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                {eventTab === 'upcoming' ? 'No Upcoming Events' : 'No Completed Events'}
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                {eventTab === 'upcoming' ? 'Check back soon for new events!' : 'No completed events in this category.'}
              </p>
            </div>
          )}

          {/* All Events Grid */}
          {!loading.events && filteredEvents.length > 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-dashed border-brand-black hover:border-primary">
                      <div className="relative">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 text-primary px-2 py-1 rounded-full text-xs font-medium">
                            {event.category}
                          </span>
                        </div>
                        {eventTab === 'completed' && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Completed
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.date}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.excerpt}</p>
                        <button
                          onClick={() => handleReadMore(event.id)}
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium text-sm"
                        >
                          Read More
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* MEDIA SECTION */}
      {mainSection === 'media' && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Media Sub-Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-8 max-w-4xl mx-auto">
              <button
                onClick={() => setMediaTab('videos')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'videos'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Videos
              </button>
              <button
                onClick={() => setMediaTab('images')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'images'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Images
              </button>
              <button
                onClick={() => setMediaTab('documents')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'documents'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Print Media
              </button>
              <button
                onClick={() => setMediaTab('audio')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'audio'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Audio
              </button>
              <button
                onClick={() => setMediaTab('ebook')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  mediaTab === 'ebook'
                    ? 'bg-brand-green text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                eBooks
              </button>
            </div>

            {/* Loading State */}
            {loading.media && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading media...</p>
              </div>
            )}

            {/* Videos Tab Content */}
            {!loading.media && mediaTab === 'videos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-dashed border-brand-black hover:border-primary">
                    {/* YouTube Thumbnail */}
                    <a
                      href={video.external_url || `https://www.youtube.com/watch?v=${video.video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group/thumb block cursor-pointer"
                    >
                      <img 
                        src={video.thumbnail_url || `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          // Fallback to standard quality if maxresdefault is not available
                          e.target.src = `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`;
                        }}
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/thumb:bg-black/50 transition-colors duration-300">
                        <div className="bg-primary rounded-full p-4 group-hover/thumb:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                    </a>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{video.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{video.formatted_date}</span>
                        <a
                          href={video.external_url || `https://www.youtube.com/watch?v=${video.video_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200 font-medium text-sm"
                        >
                          Watch
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Images Tab Content */}
            {!loading.media && mediaTab === 'images' && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {displayedImages.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                    >
                      <img 
                        src={item.image || item.file_url} 
                        alt={`Media ${item.id || index}`}
                        className="w-full h-full object-cover aspect-square"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                          <ArrowRight className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreImages && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMoreImages}
                      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Load More Images
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Loading Indicator */}
                {isLoadingImages && displayedImages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading images...</p>
                  </div>
                )}
              </div>
            )}

            {/* Documents Tab Content */}
            {!loading.media && mediaTab === 'documents' && (
              <div>
                {/* Document Subsection Tabs */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-8 max-w-md mx-auto">
                  <button
                    onClick={() => setDocumentTab('brace')}
                    className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      documentTab === 'brace'
                        ? 'bg-brand-green text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    BRACE News
                  </button>
                  <button
                    onClick={() => setDocumentTab('msia')}
                    className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      documentTab === 'msia'
                        ? 'bg-brand-green text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    MSIA Award
                  </button>
                </div>

                {/* BRACE News Section */}
                {documentTab === 'brace' && documents.length > 0 && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                      {documents.filter(d => d.category === 'BRACE News').map((doc) => (
                        <a
                          key={doc.id}
                          href={doc.file_url || doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white border-2 border-gray-200"
                        >
                          {/* Preview - PDF or Image */}
                          <div className="w-full aspect-[3/4] bg-gray-50 relative">
                            {doc.file_url?.match(/\.(jpg|jpeg|png)$/i) ? (
                              <img 
                                src={doc.file_url} 
                                alt={doc.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <iframe
                                src={`${doc.file_url}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH&zoom=page-fit`}
                                className="w-full h-full pointer-events-none absolute inset-0"
                                title={doc.title}
                                loading="lazy"
                              />
                            )}
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary rounded-full p-3">
                                {doc.file_url?.match(/\.(jpg|jpeg|png)$/i) ? (
                                  <Image className="w-6 h-6 text-white" />
                                ) : (
                                  <FileText className="w-6 h-6 text-white" />
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Title */}
                          <div className="p-3 bg-white">
                            <p className="text-sm text-gray-800 line-clamp-2 font-medium">{doc.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                                {doc.file_url?.match(/\.(jpg|jpeg|png)$/i) ? 'Image' : 'PDF'}
                              </span>
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* MSIA Award Section */}
                {documentTab === 'msia' && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                      {msiaAwardDocuments.map((doc) => (
                        <a
                          key={doc.id}
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white border-2 border-gray-200"
                        >
                          <div className="w-full aspect-[3/4] bg-gray-50 relative flex items-center justify-center p-2">
                            <img 
                              src={doc.file} 
                              alt={doc.title}
                              className="max-w-full max-h-full w-auto h-auto object-contain"
                              loading="lazy"
                            />
                            <div className="absolute top-2 left-2">
                              <span className="bg-primary/90 text-white px-2 py-1 rounded text-xs font-medium shadow-lg">
                                {doc.city}
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                          </div>
                          <div className="p-3 bg-white">
                            <p className="text-sm text-gray-800 line-clamp-2 font-medium">{doc.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">Image</span>
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {documents.length === 0 && (
                  <div className="text-center py-16">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Documents Available</h3>
                    <p className="text-gray-500">Documents and publications will be added here.</p>
                  </div>
                )}
              </div>
            )}

            {/* Audio Tab Content */}
            {!loading.media && mediaTab === 'audio' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {audio.map((audioItem) => (
                    <div
                      key={audioItem.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-dashed border-brand-black hover:border-primary group"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                            <Headphones className="w-12 h-12 text-primary" />
                          </div>
                        </div>
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-bold text-brand-black mb-2 group-hover:text-primary transition-colors duration-300">
                            {audioItem.title}
                          </h4>
                          <span className="inline-block bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-semibold">
                            Audio Recording
                          </span>
                        </div>
                        <audio
                          controls
                          className="w-full"
                          preload="metadata"
                        >
                          <source src={audioItem.file_url || audioItem.file} type="audio/mpeg" />
                          Your browser does not support audio element.
                        </audio>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* eBook Tab Content */}
            {!loading.media && mediaTab === 'ebook' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ebooks.map((ebook) => (
                    <div
                      key={ebook.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-dashed border-brand-black hover:border-primary group"
                    >
                      {/* eBook Cover Image */}
                      {(ebook.cover || ebook.thumbnail_url) && (
                        <div className="relative overflow-hidden">
                          <img 
                            src={ebook.cover || ebook.thumbnail_url} 
                            alt={ebook.title}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        {/* eBook Details */}
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-bold text-brand-black mb-2 group-hover:text-primary transition-colors duration-300">
                            {ebook.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{ebook.description}</p>
                          <span className="inline-block bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-semibold">
                            {ebook.category}
                          </span>
                        </div>

                        {/* Download Button */}
                        <a
                          href={ebook.file_url || ebook.file}
                          download
                          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg w-full"
                        >
                          <Download className="w-5 h-5" />
                          Download {ebook.fileSize || 'PDF'}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State if no ebooks */}
                {ebooks.length === 0 && (
                  <div className="text-center py-16">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No eBooks Available</h3>
                    <p className="text-gray-500">Digital books, guides, and educational materials will be added here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TESTIMONIALS SECTION */}
      {mainSection === 'testimonials' && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading State */}
            {loading.testimonials && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading testimonials...</p>
              </div>
            )}

            {!loading.testimonials && (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
                  <p className="text-gray-600 text-lg">Voices from our community and partners</p>
                </div>

                <div 
                  className="relative"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Navigation Buttons */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="text-primary group-hover:text-white transition-colors" size={24} />
                  </button>

                  <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="text-primary group-hover:text-white transition-colors" size={24} />
                  </button>

                  {/* Testimonials Container */}
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-700 ease-in-out"
                      style={{ transform: `translateX(-${(currentIndex % testimonials.length) * (100 / 3)}%)` }}
                    >
                      {/* Duplicate testimonials for infinite loop effect */}
                      {[...testimonials, ...testimonials].map((testimonial, index) => (
                        <div
                          key={`${testimonial.id}-${index}`}
                          className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                        >
                          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-dashed border-brand-black hover:border-primary h-full group">
                            {/* Quote Icon */}
                            <div className="flex justify-between items-start mb-4">
                              <Quote className="text-primary/20 group-hover:text-primary/40 transition-colors duration-300" size={40} />
                              <div className="flex gap-1">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className="text-primary fill-primary"
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-brand-black/80 mb-6 leading-relaxed line-clamp-4">
                              "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-4 border-t border-primary/20">
                              <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 group-hover:border-primary transition-colors flex items-center justify-center">
                                <span className="text-primary font-bold text-lg">
                                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-brand-black group-hover:text-primary transition-colors">
                                  {testimonial.name}
                                </h4>
                                <p className="text-sm text-brand-black/60">{testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentIndex
                            ? 'w-8 h-3 bg-primary'
                            : 'w-3 h-3 bg-gray-300 hover:bg-primary/50'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicEvents;
