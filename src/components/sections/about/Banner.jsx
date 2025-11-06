import React from 'react';
import truck1 from '../../../assets/truckanimationpng/truck1.png';
import bike from '../../../assets/truckanimationpng/bike1.png';
import car from '../../../assets/truckanimationpng/car.png';
import trafficSignal from '../../../assets/png/—Pngtree—traffic lights clipart design_8378435.png';
import family from '../../../assets/truckanimationpng/family.png';

export default function Banner() {
  return (
    <section className="relative w-full h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] overflow-hidden bg-gradient-primary z-30" style={{overflowX: 'hidden'}}>
      {/* Road at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 xs:h-20 sm:h-24 md:h-28 lg:h-32 bg-gray-700">
        {/* Road Surface */}
        <div className="w-full h-full bg-gradient-to-b from-gray-600 to-gray-800"></div>
        
        {/* Road Markings - Dashed Lines */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
          <div className="flex justify-between px-2 sm:px-4">
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
            <div className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 h-1 sm:h-1 md:h-1.5 bg-yellow-300"></div>
          </div>
        </div>
        
        {/* Road Edges */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-yellow-400"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"></div>
        
        {/* Zebra Crossing at the end of road */}
        <div className="absolute top-0 right-4 sm:right-6 md:right-8 lg:right-10 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-full">
          <div className="w-full h-full flex flex-col justify-evenly">
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
          </div>
        </div>
      </div>
      
      {/* Traffic Signal - Positioned on top of the road - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-16 xs:bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 right-4 sm:right-6 md:right-8 lg:right-10 xl:right-12 z-[40]">
        <img 
          src={trafficSignal} 
          alt="Traffic Signal" 
          className="h-20 xs:h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-auto object-contain"
        />
      </div>
      
      {/* Family - Positioned above zebra crossing, right side - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-16 xs:bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 right-1 sm:right-2 md:right-3 lg:right-4 xl:right-5 z-[40]">
        <img 
          src={family} 
          alt="Family" 
          className="h-10 xs:h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 w-auto object-contain"
        />
      </div>
      
      {/* Moving Vehicles with increased sizes */}
      {/* Top Lane (above dashes) - Truck */}
      <div className="absolute bottom-5 xs:bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 xl:bottom-14 left-0 animate-[moveRight_12s_linear_infinite] z-50" style={{ animationDelay: '-6s' }}>
        <img 
          src={truck1} 
          alt="Truck" 
          className="h-16 xs:h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto object-contain"
        />
      </div>
      
      {/* Bottom Lane (below dashes) - Car - Starts at beginning when truck is at middle */}
      <div className="absolute bottom-1 xs:bottom-1 sm:bottom-2 md:bottom-2 lg:bottom-3 xl:bottom-4 left-0 animate-[moveRight_12s_linear_infinite] z-50">
        <img 
          src={car} 
          alt="Car" 
          className="h-24 xs:h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44 w-auto object-contain"
        />
      </div>
      
      {/* Bottom Lane (below dashes) - Bike - Increased size */}
      <div className="absolute bottom-3 xs:bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-7 xl:bottom-9 left-0 animate-[moveRight_8s_linear_infinite] delay-[-5s] z-50">
        <img 
          src={bike} 
          alt="Bike" 
          className="h-10 xs:h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 w-auto object-contain"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-[60] h-full flex flex-col items-center justify-start pt-4 xs:pt-6 sm:pt-8 md:pt-10 lg:pt-12 xl:pt-16 pb-20 xs:pb-24 sm:pb-28 md:pb-32 lg:pb-36 xl:pb-40 text-center px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="animate-[slideUp_1.5s_ease-out_forwards] opacity-0 translate-y-10 max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
          <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1.5 xs:mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 leading-tight">
            Vision
          </h1>
          <p className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white leading-snug xs:leading-normal sm:leading-relaxed md:leading-relaxed">
           Our Vision is to mitigate roadway crashes, fatalities and injuries on Indian roads through evaluation, recommendation. Conduct studies and make data driven decision to improve road safety in India.  
          </p>
        </div>
      </div>
      
      {/* Custom Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes moveRight {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 50px)); }
        }
      `}</style>
    </section>
  );
}