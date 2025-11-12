import { Lightbulb, BarChart3, Construction, Users, CheckCircle } from 'lucide-react';

// Import intervention images
import awarenessImg from '../../../assets/images/Awareness Programs 3.png';
import dataDrivenImg from '../../../assets/images/Data-Driven Solutions 3.png';
import infrastructureImg from '../../../assets/images/Infrastructure Improvements 3.png';
import communityImg from '../../../assets/images/Community Engagement 3.png';

const interventions = [
  {
    icon: Users,
    title: "Awareness Programs",
    description: "We conduct engaging sessions across schools, colleges, communities, and corporate organizations to promote road safety awareness and encourage responsible driving behavior.",
    image: awarenessImg,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100"
  },
  {
    icon: BarChart3,
    title: "Data-Driven Solutions",
    description: "Using comprehensive accident data, we identify high-risk areas and develop targeted safety measures to prevent crashes and save lives.",
    image: dataDrivenImg,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100"
  },
  {
    icon: Construction,
    title: "Infrastructure Improvements",
    description: "Through safety audits and on-ground assessments, we work to enhance road and intersection design, recommending and supporting corrective actions that make roads safer for everyone.",
    image: infrastructureImg,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconBg: "bg-orange-100"
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "We actively mobilize citizens, organizations, and corporates to participate in impactful road safety initiatives, fostering a collective culture of responsibility and care on our roads.",
    image: communityImg,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100"
  }
];

export default function CoreInterventions() {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
              <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Core Interventions
              </h2>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
           Safety Research Foundation is proposing and executing diverse road safety interventions aimed at achieving our vision of safer roads for all. Through education, engineering, and community engagement, SRF reaches every age group and sensitizes all categories of road users — students, parents, drivers, and pedestrians — to reduce accidents and promote responsible road behaviour.

          </p>
        </div>

        {/* Interventions Sections */}
        <div className="space-y-16">
          {interventions.map((intervention, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <img
                    src={intervention.image}
                    alt={intervention.title}
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-dashed border-brand-black hover:border-primary"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 lg:p-10 border-2 border-dashed border-brand-black hover:border-primary relative overflow-hidden h-80 lg:h-96 flex flex-col justify-center">
                  {/* Colored Top Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${intervention.color}`}></div>
                  
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${intervention.iconBg} p-4 rounded-xl shadow-md`}>
                      <intervention.icon className="w-8 h-8 text-gray-700" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {intervention.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-lg mb-6 text-justify">
                    {intervention.description}
                  </p>

                  {/* Action Element */}
                  <div className="flex items-center gap-3 text-primary">
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-base font-semibold">Making Roads Safer</span>
                  </div>

                  {/* Background Pattern */}
                  <div className={`absolute -bottom-16 -right-16 w-32 h-32 ${intervention.bgColor} rounded-full blur-3xl opacity-30`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-primary/10 to-brand-green/10 rounded-2xl p-6 sm:p-8 border-2 border-dashed border-primary max-w-4xl">
            <div className="flex items-center justify-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-primary" />
              <h4 className="text-lg sm:text-xl font-bold text-gray-900">Our Commitment to Action</h4>
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              Through these core interventions, we work tirelessly to create a comprehensive approach to road safety that addresses awareness, infrastructure, data analysis, and community involvement. Together, we can build safer roads for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
