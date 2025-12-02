import { Shield, ArrowRight, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllBannerImages, refreshBannerImages } from '../../../utils/imageLoader';

// Static imports as fallback
import img1 from '../../../assets/images/IMG_4907.jpg';
import img2 from '../../../assets/images/DSC_9725.JPG';
import img3 from '../../../assets/images/DSC_9071.JPG';
import img4 from '../../../assets/images/DSC_8908.JPG';
import img5 from '../../../assets/images/5th Photo for Home page-SRF-Pledge_Sesh Sir (1).png';

const staticImages = [img1, img2, img3, img4, img5];
const slideDuration = 5000; // 5 seconds

// Debug: Log static images
console.log('Static images loaded:', staticImages);

export default function HeroBanner() {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load images dynamically
  useEffect(() => {
    // For now, just use static images directly
    console.log('HeroBanner: Using static images directly');
    setImages(staticImages);
    setIsLoading(false);
    
    // Uncomment this to try dynamic loading
    // loadImages();
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


  // Image carousel effect
  useEffect(() => {
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, slideDuration);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[28%_72%]">
          {/* Left Side - Primary Panel with Text */}
          <div className="relative bg-primary py-10 sm:py-8 md:py-7 lg:py-6 px-6 sm:px-5 md:px-6 lg:px-8 flex flex-col justify-center order-2 lg:order-1">
            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-12 h-12 border-4 border-white/20 rounded-lg"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-white/20 rounded-full"></div>

            {/* Main Heading */}
            <div className="space-y-1 mb-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-3xl sm:text-3xl lg:text-3xl font-black text-white leading-[0.85] tracking-tight">
                Safety<br />
                Research<br />
                Foundation
              </h1>
              <div className="h-1 w-16 bg-white rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p className="text-sm lg:text-base text-white/90 font-semibold mb-3 text-justify animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
 Safety Research Foundation is dedicated to promoting safer roads through education, research, and community engagement. Our core focus is on empowering children and young road users to become responsible and aware road safety citizens. We work to improve driver behaviour, strengthen road safety awareness, and support accident-prevention strategies backed by scientific evidence. Through training programs, school-based interventions, technical studies, and public awareness campaigns, we aim to build a culture of safety, reduce risks, prevent crashes, and

ultimately save lives. 
            </p>

            {/* Spacer to maintain banner height */}
            <div className="h-16"></div>

            {/* Bottom Stats */}
            {/* <div className="mt-4 grid grid-cols-3 gap-2 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-center">
                <div className="text-xl font-black text-white">1L+</div>
                <div className="text-[9px] text-white/80 font-medium">Students Reached</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-xl font-black text-white">2k+</div>
                <div className="text-[9px] text-white/80 font-medium">Parents</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-black text-white">200+</div>
                <div className="text-[9px] text-white/80 font-medium">Schools</div>
              </div>
               <div className="text-center">
                <div className="text-xl font-black text-white">1500+</div>
                <div className="text-[9px] text-white/80 font-medium">School Bus Drivers</div>
              </div>
            </div> */}
          </div>

          {/* Right Side - Image Carousel */}
          <div className="relative h-[280px] sm:h-[320px] md:h-[340px] lg:min-h-[320px] lg:h-auto order-1 lg:order-2 bg-gray-100">
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
                      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentImage ? 'opacity-100' : 'opacity-0'
                      }`}>
                      <img
                        src={image}
                        alt={`Road Safety Background ${index + 1}`}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          console.warn(`Failed to load image ${index + 1}:`, image);
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                  
                  {/* Subtle Overlay - Removed bluish gradient */}
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`transition-all duration-300 ${
                        index === currentImage ? 'w-12 h-3' : 'w-3 h-3'
                      }`}
                    >
                      <div className={`h-full rounded-full transition-all duration-300 ${
                        index === currentImage 
                          ? 'bg-primary' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}>
                        {index === currentImage && (
                          <div 
                            className="h-full bg-white rounded-full animate-progress-bar"
                            style={{ animationDuration: `${slideDuration}ms` }}
                          ></div>
                        )}
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
