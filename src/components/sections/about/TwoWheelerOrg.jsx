import React from 'react';
import { Bike, Users, Building2, GraduationCap, Shield, Car, BarChart3, Eye, Megaphone, Newspaper, Video, Smartphone, FileText, UserCheck, Award, HardHat, Users2, BookOpen, Construction, Lightbulb, GraduationCap as Training } from 'lucide-react';
import roadStructure from '../../../assets/about/road_structure.jpg';
import trafficSignals from '../../../assets/about/Traffic_Signals.jpg';
import outerCity from '../../../assets/about/outer_city.jpg';

const TwoWheelerOrg = () => {
  return (
    <>
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
      <section className="py-12 sm:py-14 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Bike Logo - matching home component style */}
        <div className="flex items-center justify-center mb-10 sm:mb-12 md:mb-16">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
          <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
            <Bike className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
              Mission
            </h2>
          </div>
          <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
        </div>

        {/* Step 1 - Road Safety Training */}
        <div className="flex flex-col md:flex-row-reverse items-stretch mb-12">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pl-6 animate-fade-in-right">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-primary leading-tight">Road Safety Training for</h4>
                </div>
              </div>
              <div className="border-l-4 border-primary/30 pl-6">
                <ul className="space-y-2 text-gray-900 leading-relaxed">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Building2 className="w-3 h-3 text-primary" />
                    </div>
                    <span>Corporations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <GraduationCap className="w-3 h-3 text-primary" />
                    </div>
                    <span>Universities/High Schools</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Shield className="w-3 h-3 text-primary" />
                    </div>
                    <span>Government agencies (Police, Vehicle inspectors, State Transport, Highway engineers, PWD)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Users className="w-3 h-3 text-primary" />
                    </div>
                    <span>NGO's</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 text-center md:pr-6 animate-fade-in-left">
            <img 
              src={roadStructure} 
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100" 
              alt="Road Structure" 
              loading="lazy"
            />
          </div>
        </div>

        {/* Step 2 - Road Infrastructure */}
        <div className="flex flex-col md:flex-row items-stretch mb-12">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6 animate-fade-in-left">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Construction className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-primary leading-tight">Road Infrastructure improvements</h4>
                </div>
              </div>
              <div className="border-l-4 border-primary/30 pl-6">
                <ul className="space-y-2 text-gray-900 leading-relaxed">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <BarChart3 className="w-3 h-3 text-primary" />
                    </div>
                    <span>Data driven recommendation for Road safety improvements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Eye className="w-3 h-3 text-primary" />
                    </div>
                    <span>Monitor and report effectiveness</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 text-center md:pl-6 animate-fade-in-right animate-delay-200">
            <img 
              src={trafficSignals} 
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100" 
              alt="Traffic Signals" 
              loading="lazy"
            />
          </div>
        </div>

        {/* Step 3 - Public Awareness */}
        <div className="flex flex-col md:flex-row-reverse items-stretch mb-12">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pl-6 animate-fade-in-right animate-delay-400">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-primary leading-tight">Create Public awareness towards Road Safety</h4>
                </div>
              </div>
              <div className="border-l-4 border-primary/30 pl-6">
                <ul className="space-y-2 text-gray-900 leading-relaxed">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Newspaper className="w-3 h-3 text-primary" />
                    </div>
                    <span>News Magazines/ articles</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Video className="w-3 h-3 text-primary" />
                    </div>
                    <span>Safety training Videos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Smartphone className="w-3 h-3 text-primary" />
                    </div>
                    <span>Smart phone Apps as training tools</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <FileText className="w-3 h-3 text-primary" />
                    </div>
                    <span>Technical papers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 text-center md:pr-6 animate-fade-in-left animate-delay-400">
            <img 
              src={outerCity} 
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100" 
              alt="Outer City Roads" 
              loading="lazy"
            />
          </div>
        </div>

        {/* Step 4 - People/Driver Training */}
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6 animate-fade-in-left animate-delay-600">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Training className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-primary leading-tight">People/Driver training</h4>
                </div>
              </div>
              <div className="border-l-4 border-primary/30 pl-6">
                <ul className="space-y-2 text-gray-900 leading-relaxed">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <UserCheck className="w-3 h-3 text-primary" />
                    </div>
                    <span>Changing Driver Behavior through training</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Award className="w-3 h-3 text-primary" />
                    </div>
                    <span>Special training/certification for young drivers</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <HardHat className="w-3 h-3 text-primary" />
                    </div>
                    <span>Training on Occupant protection usage (Helmets, seat belts, child seat)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <Users2 className="w-3 h-3 text-primary" />
                    </div>
                    <span>Pedestrian and Bicycle safety training</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 text-center md:pl-6 animate-fade-in-right animate-delay-600">
            <img 
              src={trafficSignals} 
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100" 
              alt="Traffic Signals" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default TwoWheelerOrg;
