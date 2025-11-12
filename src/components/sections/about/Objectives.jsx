import { Target, Users, BarChart3, Globe, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useState } from 'react';

const objectives = [
  {
    icon: Users,
    title: "Multi-Stakeholder Engagement",
    description: "Partnering with schools, parents, transport departments, police, hospitals, and civic bodies to ensure collective ownership of road safety outcomes.",
    detailedDescription: "We believe in the power of collaboration. By bringing together diverse stakeholders, we create a unified approach to road safety that addresses challenges from multiple perspectives and ensures sustainable solutions.",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100",
    accentColor: "blue-500",
    features: ["School Partnerships", "Police Collaboration", "Community Engagement", "Hospital Networks"]
  },
  {
    icon: BarChart3,
    title: "Integrated Strategy",
    description: "Combining advocacy, capacity building, and data-driven insights to foster lasting behaviour change and safer mobility systems.",
    detailedDescription: "Our comprehensive approach integrates multiple methodologies to create lasting impact. We combine research, education, and advocacy to build robust road safety ecosystems.",
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100",
    accentColor: "green-500",
    features: ["Data Analytics", "Capacity Building", "Policy Advocacy", "Behavior Change"]
  },
  {
    icon: Globe,
    title: "Scalable & Replicable",
    description: "Developing models that are adaptable and easy to replicate across diverse geographies with context-specific customization.",
    detailedDescription: "Our solutions are designed for scale. We create frameworks that can be adapted to different contexts while maintaining their effectiveness and impact across diverse communities.",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100",
    accentColor: "purple-500",
    features: ["Flexible Models", "Context Adaptation", "Global Reach", "Local Customization"]
  }
];

export default function Objectives() {

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary font-semibold text-sm">Our Strategic Objectives</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Driving <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand-green">Excellence</span> in Road Safety
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive approach combines innovation, collaboration, and scalability 
            to create lasting impact in road safety across communities
          </p>
        </div>

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden"
            >
              {/* Main Content */}
              <div className="p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${objective.color} shadow-lg`}>
                    <objective.icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {objective.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-center text-justify mb-6">
                  {objective.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {objective.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-${objective.accentColor}`}></div>
                      <span className="text-sm text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center">
          <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-brand-green/10 opacity-50"></div>
            
            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-primary/20 rounded-full">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-white">Our Commitment to Excellence</h4>
              </div>
              
              <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                We are dedicated to creating sustainable, data-driven solutions that can be adapted 
                and implemented across diverse communities to make roads safer for everyone. 
                Our objectives guide every initiative we undertake.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  Explore Our Work
                </button>
                <button className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
                  Join Our Mission
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
