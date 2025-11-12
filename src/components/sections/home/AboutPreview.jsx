import React from 'react';
import { Shield, Users, Target, Award, ArrowRight, Heart, Globe, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { number: '10+', label: 'Years Experience', icon: Award },
  { number: '5000+', label: 'Lives Impacted', icon: Heart },
  { number: '50+', label: 'Projects Completed', icon: Target },
  { number: '100+', label: 'Partners', icon: Globe }
];

const highlights = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Committed to creating safer roads through evidence-based interventions and community engagement.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Working hand-in-hand with communities, schools, and organizations to build a culture of road safety.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Leveraging cutting-edge research and technology to develop effective road safety solutions.'
  }
];

export default function AboutPreview() {
  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-green rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold text-sm">About Safety Research Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pioneering Road Safety <span className="text-primary">For a Safer Tomorrow</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Safety Research Foundation is dedicated to reducing road traffic injuries and fatalities through 
            comprehensive research, innovative solutions, and community-driven initiatives that create lasting impact.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-brand-green rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1 group-hover:text-primary transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-sm font-medium text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* What Sets Us Apart - Enhanced Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the unique approach that makes us a leader in road safety innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-brand-green/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-brand-green rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <highlight.icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    {highlight.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary/10 via-brand-green/10 to-primary/10 rounded-3xl p-8 border-2 border-dashed border-primary/30">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Learn More?
              </h4>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Discover our complete story, mission, and the impact we're making in road safety across communities.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
