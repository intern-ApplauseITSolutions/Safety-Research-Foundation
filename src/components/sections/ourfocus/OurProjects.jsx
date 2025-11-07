import { Briefcase, Users, GraduationCap, Car, MapPin, Megaphone, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const projectActivities = [
  {
    icon: GraduationCap,
    title: "Student Workshops",
    description: "Interactive sessions for Classes 7–9 students, conducted twice a year, reaching over 5,000 students. These workshops build awareness about child safety, seatbelt use, and proper child restraints through engaging and practical learning.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    stats: "5,000+ Students"
  },
  {
    icon: Users,
    title: "Parent Sessions",
    description: "Dedicated sessions for 200+ parents focused on safe travel habits, responsible road behavior, and child passenger safety to ensure every journey is a safe one.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    stats: "200+ Parents"
  },
  {
    icon: Car,
    title: "Driver Training",
    description: "Comprehensive training for 200+ school bus drivers and attendants on safe transport practices, emergency response, and maintaining high safety standards in daily school commutes.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    stats: "200+ Drivers"
  },
  {
    icon: MapPin,
    title: "Safe School Zones",
    description: "Conducted technical safety audits across 5+ school zones, offering data-driven recommendations to improve road design, signage, and traffic flow for safer school environments.",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    stats: "5+ School Zones"
  },
  {
    icon: Sparkles,
    title: "Employee Engagement",
    description: "Encouraging Bosch employees to take the lead in school sessions, awareness drives, and community outreach, strengthening a shared culture of road safety and responsibility.",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    stats: "Active Participation"
  },
  {
    icon: Megaphone,
    title: "Mass Outreach",
    description: "Large-scale public campaigns and events that inspire communities to adopt safer road practices and build collective responsibility for saving lives on our roads.",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    stats: "Community Wide"
  }
];

export default function OurProjects() {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Current Projects
              </h2>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Driving change through strategic partnerships and community engagement
          </p>
        </div>

        {/* Flagship Partnership Card */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-primary to-brand-green rounded-3xl shadow-2xl overflow-hidden border-4 border-dashed border-white">
            <div className="p-8 sm:p-10 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                    <Sparkles className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold text-sm">Flagship Partnership</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    BOSCH Limited
                  </h3>
                  <p className="text-xl text-white/90 font-semibold">
                    BRACE – Bosch's Road Safety and Community Engagement
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Briefcase className="w-16 h-16 text-white mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-white text-sm font-medium">Active Partnership</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <p className="text-white/95 text-base sm:text-lg leading-relaxed">
                  A comprehensive road safety initiative in partnership with Bosch Limited, focusing on student education, 
                  parent awareness, driver training, and infrastructure improvements to create safer communities around schools.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Activities Grid */}
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Project Activities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projectActivities.map((activity, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed border-brand-black hover:border-primary overflow-hidden"
              >
                {/* Colored Top Bar */}
                <div className={`h-2 bg-gradient-to-r ${activity.color}`}></div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${activity.bgColor} p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <activity.icon className="w-7 h-7 text-gray-700" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {activity.title}
                      </h4>
                      <span className={`inline-block bg-gradient-to-r ${activity.color} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {activity.stats}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">Active Initiative</span>
                  </div>
                </div>

                {/* Background Pattern */}
                <div className={`absolute bottom-0 right-0 w-24 h-24 ${activity.bgColor} rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-primary/10 via-brand-green/10 to-secondary/10 rounded-2xl p-8 border-2 border-dashed border-primary">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Project Impact</h4>
            <p className="text-gray-600">Creating measurable change in road safety</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-primary mb-1">5,000+</div>
              <div className="text-sm text-gray-600 font-medium">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-brand-green mb-1">200+</div>
              <div className="text-sm text-gray-600 font-medium">Parents Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-secondary mb-1">200+</div>
              <div className="text-sm text-gray-600 font-medium">Drivers Certified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-500 mb-1">5+</div>
              <div className="text-sm text-gray-600 font-medium">School Zones Audited</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Learn More About BRACE
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
