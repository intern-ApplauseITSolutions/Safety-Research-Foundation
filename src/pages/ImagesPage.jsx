import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImagesPage = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imagesToShow, setImagesToShow] = useState(12);
  const [loadedImages, setLoadedImages] = useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  // Load images from Traffic Awareness folder
  const trafficAwarenessModules = import.meta.glob('../assets/events/Traffic Awareness/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: false, import: 'default' });

  // Load images progressively
  useEffect(() => {
    if (loadedImages.length === 0) {
      setIsLoadingImages(true);
      const loadImages = async () => {
        const entries = Object.entries(trafficAwarenessModules);
        const images = [];
        
        for (let i = 0; i < entries.length; i++) {
          const [path, importFn] = entries[i];
          const image = await importFn();
          images.push({
            id: i + 1,
            image: image,
            path: path
          });
          
          // Update state after each batch of 6 images
          if ((i + 1) % 6 === 0 || i === entries.length - 1) {
            setLoadedImages([...images]);
          }
        }
        setIsLoadingImages(false);
      };
      loadImages();
    }
  }, []);

  const displayedImages = loadedImages.slice(0, imagesToShow);
  const hasMoreImages = imagesToShow < loadedImages.length;

  const loadMoreImages = () => {
    setImagesToShow(prev => Math.min(prev + 12, loadedImages.length));
  };

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToNextImage = () => {
    const nextIndex = (lightboxIndex + 1) % loadedImages.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(loadedImages[nextIndex].image);
  };

  const goToPreviousImage = () => {
    const prevIndex = lightboxIndex === 0 ? loadedImages.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
    setLightboxImage(loadedImages[prevIndex].image);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxImage) return;
      
      if (e.key === 'ArrowRight') goToNextImage();
      if (e.key === 'ArrowLeft') goToPreviousImage();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxImage, lightboxIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-brand-green to-secondary py-16 sm:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <ImageIcon className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">Our Gallery</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Traffic Awareness Images
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of traffic awareness campaigns, road safety programs, and community engagement initiatives captured through powerful imagery.
            </p>
          </div>
        </div>
      </section>

      {/* Images Gallery Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
              <ImageIcon className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">
                {loadedImages.length} Images Available
              </span>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {displayedImages.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                onClick={() => openLightbox(item.image, item.id - 1)}
              >
                <img 
                  src={item.image} 
                  alt={`Traffic Awareness ${item.id}`}
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
      </section>

      {/* Image Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full p-2 sm:p-3 transition-all duration-300 z-[10000] backdrop-blur-sm touch-manipulation"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPreviousImage();
            }}
            className="absolute left-2 sm:left-4 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm touch-manipulation"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNextImage();
            }}
            className="absolute right-2 sm:right-4 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm touch-manipulation"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
            {lightboxIndex + 1} / {loadedImages.length}
          </div>

          {/* Image */}
          <img
            src={lightboxImage}
            alt={`Traffic Awareness ${lightboxIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ImagesPage;
