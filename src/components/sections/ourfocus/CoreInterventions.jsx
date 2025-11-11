import { Lightbulb, BarChart3, Construction, Users, CheckCircle } from 'lucide-react';

const interventions = [
  {
    icon: Users,
    title: "Awareness Programs",
    description: "We conduct engaging sessions across schools, colleges, communities, and corporate organizations to promote road safety awareness and encourage responsible driving behavior.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100"
  },
  {
    icon: BarChart3,
    title: "Data-Driven Solutions",
    description: "Using comprehensive accident data, we identify high-risk areas and develop targeted safety measures to prevent crashes and save lives.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100"
  },
  {
    icon: Construction,
    title: "Infrastructure Improvements",
    description: "Through safety audits and on-ground assessments, we work to enhance road and intersection design, recommending and supporting corrective actions that make roads safer for everyone.",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconBg: "bg-orange-100"
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "We actively mobilize citizens, organizations, and corporates to participate in impactful road safety initiatives, fostering a collective culture of responsibility and care on our roads.",
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

        {/* Interventions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {interventions.map((intervention, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed border-brand-black hover:border-primary overflow-hidden"
            >
              {/* Colored Top Bar */}
              <div className={`h-2 bg-gradient-to-r ${intervention.color}`}></div>
              
              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${intervention.iconBg} p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <intervention.icon className="w-8 h-8 text-gray-700" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {intervention.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {intervention.description}
                </p>

                {/* Decorative Element */}
                <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Making Roads Safer</span>
                </div>
              </div>

              {/* Background Pattern */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${intervention.bgColor} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10`}></div>
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
