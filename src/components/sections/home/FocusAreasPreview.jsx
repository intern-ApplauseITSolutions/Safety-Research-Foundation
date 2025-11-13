import React from 'react';
import { GraduationCap, Construction, Users, Shield, ArrowRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import focus area images
import roadSafetyTrainingImg from '../../../assets/images/shared image (12).jfif';
import roadInfrastructureImg from '../../../assets/images/shared image (23).jfif';
import employeeEngagementImg from '../../../assets/images/shared image (24).jfif';
import communityAwarenessImg from '../../../assets/images/shared image (20).jfif';

const focusAreas = [
  {
    icon: GraduationCap,
    title: "Road Safety Training",
    description: "Structured training programs for students, drivers, and community members to promote responsible behavior.",
    image: roadSafetyTrainingImg,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Construction,
    title: "Infrastructure Audits",
    description: "Scientific road safety audits to identify blackspots and recommend engineering improvements.",
    image: roadInfrastructureImg,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Users,
    title: "Employee Engagement",
    description: "Empowering corporate employees to become Road Safety Ambassadors in their communities.",
    image: employeeEngagementImg,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Shield,
    title: "Community Awareness",
    description: "Interactive campaigns and outreach activities that encourage safe road behavior.",
    image: communityAwarenessImg,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50"
  }
];

export default function FocusAreasPreview() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Our Focus Areas
              </h2>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive approach to road safety through targeted interventions and community engagement
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed border-gray-200 hover:border-primary overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={area.image}
                  alt={area.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Colored bar */}
              <div className={`h-1 bg-gradient-to-r ${area.color}`}></div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${area.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <area.icon className="w-5 h-5 text-gray-700" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {area.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-brand-green rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Explore Our Complete Focus Areas
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Discover our comprehensive approach to road safety through detailed focus areas, 
              core interventions, and ongoing projects making a real difference.
            </p>
            <Link
              to="/focus"
              className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              View All Focus Areas
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
