import React from 'react';
import truck1 from '../../../assets/truckanimationpng/truck1.png';
import bike from '../../../assets/truckanimationpng/bike1.png';
import car from '../../../assets/truckanimationpng/car.png';
import horizontalSignal from '../../../assets/png/horizontal-traffic-light-hanging-260nw-480913231-removebg-preview.png';
import family from '../../../assets/truckanimationpng/family.png';
import natureBg from '../../../assets/png/nature.webp';

export default function RoadScene() {
  return (
    <section className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden" style={{overflowX: 'hidden', backgroundImage: `url(${natureBg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      
      {/* Horizontal Traffic Signal hanging from pole - Left side of family */}
      <div className="absolute top-0 right-12 sm:right-16 md:right-20 lg:right-24 xl:right-28 z-[40]">
        {/* Horizontal Pole */}
        <div className="w-12 sm:w-14 md:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 shadow-md"></div>
        {/* Vertical Hanging Wire */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-3 sm:h-4 md:h-5 bg-gray-800"></div>
        {/* Traffic Signal */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-3 sm:top-4 md:top-5 bg-gray-900 rounded p-1 sm:p-1.5 flex gap-1 sm:gap-1.5 shadow-lg border border-gray-700">
          {/* Red Light */}
          <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-red-600 shadow-inner"></div>
          {/* Yellow Light */}
          <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-yellow-400 shadow-inner"></div>
          {/* Green Light */}
          <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-green-500 shadow-inner"></div>
        </div>
      </div>
      
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
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"> </div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
            <div className="w-full h-1 sm:h-1.5 md:h-2 bg-white"></div>
          </div>
        </div>
      </div>
      
      {/* Family - Positioned above zebra crossing, right side */}
      <div className="absolute bottom-16 xs:bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 right-1 sm:right-2 md:right-3 lg:right-4 xl:right-5 z-[40]">
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
      
      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes moveRight {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 50px)); }
        }
      `}</style>
    </section>
  );
}