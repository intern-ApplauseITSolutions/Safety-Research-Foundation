import { Shield, ArrowRight, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllBannerImages, refreshBannerImages } from '../../../utils/imageLoader';

// Desktop banner images (new)
import img1 from '../../../assets/images/SRF banner-1.png';
import img2 from '../../../assets/images/SRF banner-2.png';
import img3 from '../../../assets/images/SRF banner-3.png';
import img4 from '../../../assets/images/SRF banner-4.png';
import img5 from '../../../assets/images/SRF banner-5.png';

// Mobile banner images (old simple banners)
import mobileImg1 from '../../../assets/images/banner/1.jpg';
import mobileImg2 from '../../../assets/images/banner/2.jpg';
import mobileImg3 from '../../../assets/images/banner/IMG_2239.jpg';

const desktopImages = [img1, img2, img3, img4, img5];
const mobileImages = [mobileImg1, mobileImg2, mobileImg3];
const slideDuration = 3000; // 3 seconds

export default function HeroBanner() {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load appropriate images based on screen size
  useEffect(() => {
    setImages(isMobile ? mobileImages : desktopImages);
    setIsLoading(false);
    setCurrentImage(0);
  }, [isMobile]);

  const loadImages = async () => {
    console.log('HeroBanner: Starting to load images...');
    setIsLoading(true);
    try {
      const bannerImages = getAllBannerImages();
      console.log('HeroBanner: Received images:', bannerImages.length, bannerImages);

      // Use dynamic images if available, otherwise fallback to static
      if (bannerImages.length > 0) {
        setImages(bannerImages);
        console.log('HeroBanner: Using dynamic images');
      } else {
        console.log('HeroBanner: Using static fallback images');
        setImages(staticImages);
      }

      setCurrentImage(0); // Reset to first image
      setIsLoading(false);
      console.log('HeroBanner: Images loaded successfully');
    } catch (error) {
      console.error('HeroBanner: Failed to load banner images, using static fallback:', error);
      setImages(staticImages);
      setIsLoading(false);
    }
  };


  // Image carousel effect
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, slideDuration);
    return () => clearInterval(interval);
  }, [images]);

  // Mobile Layout
  if (isMobile) {
    return (
      <section id="home" className="relative overflow-hidden bg-white">
        {/* Banner Carousel */}
        <div className="relative h-[280px] bg-gray-100">
          {!isLoading && images.length > 0 && (
            <>
              <div className="absolute inset-0">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImage ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <img
                      src={image}
                      alt={`Road Safety ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`transition-all duration-300 ${
                      index === currentImage ? 'w-8 h-2' : 'w-2 h-2'
                    }`}>
                    <div className={`h-full rounded-full ${
                      index === currentImage ? 'bg-primary' : 'bg-white/60'
                    }`}></div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Title and Tagline Below Banner */}
        <div className="bg-white py-6 px-4 text-center">
          <h1 className="text-3xl font-bold text-primary mb-3">
            Safety Research Foundation
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Creating a culture of road safety through education, research, and community engagement.
          </p>
        </div>

        {/* Blue Text Section */}
        <div className="bg-primary py-8 px-6">
          <p className="text-white text-sm leading-relaxed text-justify">
            Our core focus is on empowering children and young road users to become responsible and aware road safety citizens. We work to improve driver behaviour, strengthen road safety awareness, and support accident-prevention strategies backed by scientific evidence. Through training programs, school-based interventions, technical studies, and public awareness campaigns, we aim to build a culture of safety, reduce risks, prevent crashes, and ultimately save lives.
          </p>
        </div>
      </section>
    );
  }

  // Desktop Layout
  return (
    <section id="home" className="relative overflow-hidden bg-white mt-4">
      <div className="w-full">
        <div className="relative">
          {/* Image Carousel */}
          <div className="relative h-[450px] md:h-[500px] lg:h-[550px] bg-white">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 text-sm">Loading banner images...</p>
                </div>
              </div>
            )}

            {/* No Images Fallback */}
            {!isLoading && images.length === 0 && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Banner Images</h3>
                  <p className="text-gray-500 text-sm">Add images to the banner folder to see them here</p>
                </div>
              </div>
            )}

            {/* Image Carousel */}
            {!isLoading && images.length > 0 && (
              <>
                <div className="absolute inset-0 bg-gray-100">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'
                        }`}>
                      <img
                        src={image}
                        alt={`Road Safety Background ${index + 1}`}
                        className="hero-banner-image w-full h-full object-fit"
                        onError={(e) => {
                          console.warn(`Failed to load image ${index + 1}:`, image);
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}

                  {/* Subtle Overlay - Removed bluish gradient */}
                </div>

                {/* Progress Indicators - Dots on Right Bottom */}
                <div className="absolute right-4 bottom-4 z-10 flex flex-row gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className="transition-all duration-300 w-2 h-2"
                    >
                      <div className={`w-full h-full rounded-full transition-all duration-300 ${index === currentImage
                        ? 'bg-primary scale-150'
                        : 'bg-white/60 hover:bg-white/80'
                        }`}>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {currentImage + 1} / {images.length}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
