import { Shield, ArrowRight, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllBannerImages, refreshBannerImages } from '../../../utils/imageLoader';

// Desktop banner images (new)
import img1 from '../../../assets/images/DSC_9071.JPG';
import img2 from '../../../assets/images/DSC_89081.JPG';
import img3 from '../../../assets/images/DSC_9725.JPG';
import img4 from '../../../assets/images/IMG_8270.JPG';
import img5 from '../../../assets/images/Road Safety Awareness.png';

// Mobile banner images (new)
import mobileImg1 from '../../../assets/images/IMG_8270.JPG';
import mobileImg2 from '../../../assets/images/IMG_4907.jpg';
import mobileImg3 from '../../../assets/images/DSC_89081.JPG';
import mobileImg4 from '../../../assets/images/DSC_9725.JPG';
import mobileImg5 from '../../../assets/images/DSC_9071.JPG';

const desktopImages = [img1, img2, img3, img4, img5];
const mobileImages = [mobileImg1, mobileImg2, mobileImg3, mobileImg4, mobileImg5];
const slideDuration = 3000; // 3 seconds

export default function HeroBanner() {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  // Media query for large screens (2560px and above)
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media screen and (min-width: 2500px) {
        .hero-banner-carousel {
          height: 1100px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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


  // Image carousel effect with pause on hover
  useEffect(() => {
    if (images.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, slideDuration);
    return () => clearInterval(interval);
  }, [images, isPaused]);

  // Mobile Layout
  if (isMobile) {
    return (
      <section id="home" className="relative overflow-hidden bg-white">
        {/* Banner Carousel Below */}
        <div
          className="relative h-[280px] bg-gray-100"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {!isLoading && images.length > 0 && (
            <>
              <div className="absolute inset-0">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
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
                    className={`transition-all duration-300 ${index === currentImage ? 'w-8 h-2' : 'w-2 h-2'
                      }`}>
                    <div className={`h-full rounded-full ${index === currentImage ? 'bg-primary' : 'bg-white/60'
                      }`}></div>
                  </button>
                ))}
              </div>
            </>
          )}
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
          <div
            className="relative h-[450px] md:h-[500px] lg:h-[550px] bg-white hero-banner-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
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
                        className={`hero-banner-image w-full h-full ${image.includes('Road Safety Awareness')
                          ? 'object-fit object-right'
                          : `object-cover ${image.includes('DSC_8908')
                            ? 'object-[center_15%]'
                            : image.includes('5th Photo')
                              ? 'object-bottom'
                              : 'object-center'}`
                          }`}
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
