import React from 'react';
import { Shield, Users, Construction, Megaphone, CheckCircle, ArrowRight, BookOpen, Award, AlertTriangle } from 'lucide-react';
import roadSafetyImg from '../../../assets/images/Road_Safety_Training.jpg';
import roadInfrastructureImg from '../../../assets/images/Road_Infrastructure.jpg';
import publicAwarenessImg from '../../../assets/images/Create_Public_awareness.jpg';
import driverTrainingImg from '../../../assets/images/People_Driver_Training.jpg';

export default function Training() {
  const trainingPrograms = [
    {
      id: 1,
      title: "Road Safety Training",
      description: "Comprehensive training programs for individuals and organizations to promote safe driving practices and road awareness.",
      icon: Shield,
      color: "bg-blue-500",
      image: roadSafetyImg,
      features: [
        "Defensive driving techniques",
        "Traffic rules and regulations",
        "Emergency response procedures",
        "Vehicle safety checks"
      ]
    },
    {
      id: 2,
      title: "Road Infrastructure Improvements",
      description: "Strategic initiatives to enhance road infrastructure for better safety and traffic management.",
      icon: Construction,
      color: "bg-green-500",
      image: roadInfrastructureImg,
      features: [
        "Traffic signal optimization",
        "Road marking improvements",
        "Safety barrier installations",
        "Pedestrian crossing enhancements"
      ]
    },
    {
      id: 3,
      title: "Create Public Awareness towards Road Safety",
      description: "Creating widespread awareness about road safety through community engagement and educational programs.",
      icon: Megaphone,
      color: "bg-orange-500",
      image: publicAwarenessImg,
      features: [
        "Community workshops",
        "School safety programs",
        "Media campaigns",
        "Safety awareness events"
      ]
    },
    {
      id: 4,
      title: "People/Driver Training",
      description: "Specialized training programs for drivers, focusing on skill development and safety consciousness.",
      icon: Users,
      color: "bg-purple-500",
      image: driverTrainingImg,
      features: [
        "Professional driver certification",
        "Advanced driving skills",
        "Safety protocol training",
        "Continuous education programs"
      ]
    }
  ];

  const stats = [
    { number: "500+", label: "People Trained", icon: Users },
    { number: "50+", label: "Training Sessions", icon: BookOpen },
    { number: "25+", label: "Infrastructure Projects", icon: Construction },
    { number: "100+", label: "Awareness Events", icon: Megaphone }
  ];

  return (
    <div className="bg-white">
      {/* Training Programs Section - Images and Titles Only */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with decorative lines */}
          <div className="flex items-center justify-center mb-8 sm:mb-12 gap-2 sm:gap-3 md:gap-4 px-2">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-primary max-w-[50px] sm:max-w-[100px] md:max-w-[150px] lg:max-w-[200px]"></div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-primary flex-shrink-0" strokeWidth={2} />
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 text-center leading-tight px-1 sm:px-0">
                Our Training Programs
              </h2>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-primary/50 to-primary max-w-[50px] sm:max-w-[100px] md:max-w-[150px] lg:max-w-[200px]"></div>
          </div>

          {/* Subtitle with decorative elements */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 max-w-20 h-px bg-gradient-to-r from-transparent to-primary/30"></div>
              <div className="mx-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div className="flex-1 max-w-20 h-px bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <p className="text-lg text-gray-600 font-medium bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text">
              Comprehensive training and awareness programs for road safety
            </p>
            <div className="flex items-center justify-center mt-3">
              <div className="flex-1 max-w-16 h-px bg-gradient-to-r from-transparent to-primary/20"></div>
              <div className="mx-2">
                <div className="w-1 h-1 bg-primary/60 rounded-full"></div>
              </div>
              <div className="flex-1 max-w-16 h-px bg-gradient-to-l from-transparent to-primary/20"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {trainingPrograms.map((program) => (
              <div key={program.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-dashed border-gray-900 hover:border-black">
                {/* Image section with your actual images */}
                <div className="h-48 sm:h-56 relative overflow-hidden m-2 rounded-xl">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover rounded-xl"
                  />
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg sm:text-xl drop-shadow-lg">
                      {program.title}
                    </h4>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
