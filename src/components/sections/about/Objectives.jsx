import { Target, Users, BarChart3, Globe, CheckCircle } from 'lucide-react';

const objectives = [
  {
    icon: Users,
    title: "Multi-Stakeholder Engagement",
    description: "Collaborate with schools, parents, transport departments, traffic police, hospitals, and local authorities for shared ownership of road safety outcomes.",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100"
  },
  {
    icon: BarChart3,
    title: "Integrated Strategy",
    description: "Blend advocacy, capacity building, and data-driven insights to drive sustainable change.",
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100"
  },
  {
    icon: Globe,
    title: "Scalable & Replicable",
    description: "Model designed for easy replication across geographies with context-specific customization.",
    color: "from-purple-500 to-purple-600",
    bgColor: "from-purple-50 to-purple-100"
  }
];

export default function Objectives() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Objectives
              </h2>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Our strategic approach to achieving road safety excellence
          </p>
        </div>

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed border-brand-black hover:border-primary overflow-hidden"
            >
              {/* Icon Header */}
              <div className={`bg-gradient-to-r ${objective.bgColor} p-6 flex items-center justify-center`}>
                <div className={`bg-gradient-to-br ${objective.color} p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <objective.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {objective.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {objective.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-primary/10 to-brand-green/10 rounded-2xl p-6 border-2 border-dashed border-primary">
            <div className="flex items-center justify-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-primary" />
              <h4 className="text-lg font-bold text-gray-900">Our Commitment</h4>
            </div>
            <p className="text-gray-700 max-w-2xl">
              We are dedicated to creating sustainable, data-driven solutions that can be adapted and implemented across diverse communities to make roads safer for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
