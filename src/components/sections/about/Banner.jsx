export default function Banner() {
  return (
    <section className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden bg-gradient-primary z-30">
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="animate-[slideUp_1.5s_ease-out_forwards] opacity-0 translate-y-10 max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight">
            Vision
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-relaxed">
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
      `}</style>
    </section>
  );
}