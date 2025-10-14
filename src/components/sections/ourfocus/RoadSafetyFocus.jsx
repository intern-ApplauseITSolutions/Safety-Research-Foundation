import React, { useEffect, useRef } from 'react';
import { GraduationCap, Construction, Users, Smartphone, Shield, Car, Building2, MapPin, BookOpen, Eye, BarChart3, UserCheck, Award, Target } from 'lucide-react';

// Import actual images
import roadSafetyTrainingImg from '../../../assets/images/Road_Safety_Training.jpg';
import roadInfrastructureImg from '../../../assets/images/Road_Infrastructure.jpg';
import publicAwarenessImg from '../../../assets/images/Create_Public_awareness.jpg';
import driverTrainingImg from '../../../assets/images/People_Driver_Training.jpg';

const RoadSafetyFocus = () => {
  const sectionRefs = useRef([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        .animate-fade-in-left {
          opacity: 0;
          transform: translateX(-100px) scale(0.9);
          transition: all 0.8s ease-out;
        }
        
        .animate-fade-in-right {
          opacity: 0;
          transform: translateX(100px) scale(0.9);
          transition: all 0.8s ease-out;
        }
        
        .animate-fade-in-left.animate-in-view {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        
        .animate-fade-in-right.animate-in-view {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        
        .animate-delay-200.animate-in-view {
          transition-delay: 0.2s;
        }
        
        .animate-delay-400.animate-in-view {
          transition-delay: 0.4s;
        }
        
        .animate-delay-600.animate-in-view {
          transition-delay: 0.6s;
        }
      `}</style>
      
      <section className="py-12 sm:py-14 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Target Logo */}
          <div className="flex items-center justify-center mb-10 sm:mb-12 md:mb-16">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Our Focus Areas
              </h2>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>

          {/* Section 1 - Road Safety Training */}
          <div className="flex flex-col md:flex-row items-stretch mb-12">
            <div 
              ref={(el) => (sectionRefs.current[0] = el)}
              className="md:w-1/2 mb-6 md:mb-0 md:pr-6 animate-fade-in-left"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-primary leading-tight">Road Safety Training</h4>
                  </div>
                </div>
                <div className="border-l-4 border-primary/30 pl-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Offer road safety training for the police and truck/bus drivers in various states and municipalities based on our knowledge of the type of accidents that occur and how to avoid them.
                  </p>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Shield className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-gray-600 text-sm">Once a month event offered at various states</span>
                  </div>
                </div>
              </div>
            </div>
            <div 
              ref={(el) => (sectionRefs.current[1] = el)}
              className="md:w-1/2 text-center md:pl-6 animate-fade-in-right"
            >
              <img 
                src={roadSafetyTrainingImg} 
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-brand-black" 
                alt="Road Safety Training" 
                loading="lazy"
              />
            </div>
          </div>

          {/* Section 2 - Road Infrastructure Improvements */}
          <div className="flex flex-col md:flex-row-reverse items-stretch mb-12">
            <div 
              ref={(el) => (sectionRefs.current[2] = el)}
              className="md:w-1/2 mb-6 md:mb-0 md:pl-6 animate-fade-in-right animate-delay-200"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <Construction className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-primary leading-tight">Road Infrastructure Improvements</h4>
                  </div>
                </div>
                <div className="border-l-4 border-primary/30 pl-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Will work with various companies as part of their CSR activity to help measure accidents and the patterns and come up with improvement plans and help implement the changes and help measure the effectiveness.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <BarChart3 className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-600 text-sm">Accident pattern analysis and measurement</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <MapPin className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-600 text-sm">Focus on accident-prone locations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div 
              ref={(el) => (sectionRefs.current[3] = el)}
              className="md:w-1/2 text-center md:pr-6 animate-fade-in-left animate-delay-200"
            >
              <img 
                src={roadInfrastructureImg} 
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-brand-black" 
                alt="Road Infrastructure Improvements" 
                loading="lazy"
              />
            </div>
          </div>

          {/* Section 3 - Road Safety Awareness */}
          <div className="flex flex-col md:flex-row items-stretch mb-12">
            <div 
              ref={(el) => (sectionRefs.current[4] = el)}
              className="md:w-1/2 mb-6 md:mb-0 md:pr-6 animate-fade-in-left animate-delay-400"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-primary leading-tight">Road Safety Awareness</h4>
                  </div>
                </div>
                <div className="border-l-4 border-primary/30 pl-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We will be focused on training the vulnerable users on how to foresee the dangers of various intersections and offer training on how to handle them.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <BookOpen className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-600 text-sm">Training at schools/colleges and social venues</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <Smartphone className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-600 text-sm">Develop applications and social media training</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div 
              ref={(el) => (sectionRefs.current[5] = el)}
              className="md:w-1/2 text-center md:pl-6 animate-fade-in-right animate-delay-400"
            >
              <img 
                src={publicAwarenessImg} 
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-brand-black" 
                alt="Road Safety Awareness" 
                loading="lazy"
              />
            </div>
          </div>

          {/* Section 4 - People/Driver Training */}
          <div className="flex flex-col md:flex-row-reverse items-stretch mb-12">
            <div 
              ref={(el) => (sectionRefs.current[6] = el)}
              className="md:w-1/2 mb-6 md:mb-0 md:pl-6 animate-fade-in-right animate-delay-600"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-primary leading-tight">People/Driver Training</h4>
                  </div>
                </div>
                <div className="border-l-4 border-primary/30 pl-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We will offer application to help people do a self-assessment on their driving ability in terms of awareness of the environment.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <Shield className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-600 text-sm">Safety equipment awareness (seatbelts, helmets etc.)</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <BookOpen className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-600 text-sm">Road safety rules/laws/signs understanding</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                        <Smartphone className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-600 text-sm">Smart applications to score driving behavior</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div 
              ref={(el) => (sectionRefs.current[7] = el)}
              className="md:w-1/2 text-center md:pr-6 animate-fade-in-left animate-delay-600"
            >
              <img 
                src={driverTrainingImg} 
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-brand-black" 
                alt="People/Driver Training" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoadSafetyFocus;
