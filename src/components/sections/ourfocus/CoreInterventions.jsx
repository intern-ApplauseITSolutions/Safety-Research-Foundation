import { Lightbulb, BarChart3, Construction, Users, CheckCircle, Shield } from 'lucide-react';

// Import intervention images
import awarenessImg from '../../../assets/images/Awareness Programs 3.png';
import dataDrivenImg from '../../../assets/images/Data-Driven Solutions 3.png';
import infrastructureImg from '../../../assets/images/Infrastructure Improvements 3.png';
import communityImg from '../../../assets/images/Community Engagement 3.png';
import childSafetyImg from '../../../assets/images/23.png';
import safeSchoolZoneImg from '../../../assets/images/21.png';

const interventions = [
  {
    icon: Users,
    title: "Awareness Programs",
    description: "Fostering a culture of shared road responsibility through multi-channel outreach and creative engagement.",
    detailedDescription: "We conduct engaging sessions across schools, colleges, communities, and corporate organizations to promote road safety awareness and encourage responsible driving behavior.",
    keyInterventions: [
      { title: "Street Campaigns & Murals", desc: "Visual storytelling and behaviour-change murals in high-traffic areas." },
      { title: "Media & Radio Outreach", desc: "Regional-language jingles and social media campaigns to spread safety messages." },
      { title: "Local Partnerships", desc: "Collaboration with RWAs, Gram Panchayats, and NGOs for sustainable awareness drives." }
    ],
    image: awarenessImg,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100"
  },
  {
    icon: BarChart3,
    title: "Road Safety Training",
    description: "Building capacity and awareness among all categories of road users through targeted, data-driven training programs.",
    detailedDescription: "Using comprehensive accident data, we identify high-risk areas and develop targeted safety measures to prevent crashes and save lives.",
    keyInterventions: [
      // { title: "Content & Module Development", desc: "Creation of customized posters, booklets, training modules, games, and jingles in local languages." },
      { title: "School & College Programs", desc: "Interactive sessions for students on traffic rules, safe commuting, and pedestrian discipline." },
      { title: "Driver Training Programs", desc: "Defensive and responsible driving workshops for truck, bus, and cab drivers." },
      { title: "Police & Enforcement Training", desc: "Skill-based modules for crash scene management, blackspot identification, and enforcement improvement." },
      { title: "Community Sensitization", desc: "Public engagement through events, demos, and simulation-based learning." }
    ],
    image: dataDrivenImg,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100"
  },
  {
    icon: Construction,
    title: "Infrastructure Improvements",
    description: "Data-led engineering interventions to improve road infrastructure and minimize crashes.",
    detailedDescription: "Through safety audits and on-ground assessments, we work to enhance road and intersection design, recommending and supporting corrective actions that make roads safer for everyone.",
    keyInterventions: [
      { title: "Corridor & Junction Audits", desc: "Identification of blackspots and high-risk zones using crash data and field surveys." },
      { title: "Safe School Zone DPRs", desc: "Recommendations for signage, pedestrian crossings, and speed-calming measures." },
      { title: "Implementation Support", desc: "Design and supervision of safety infrastructure improvements." },
      { title: "Technical Reporting", desc: "Preparation of detailed reports with costed recommendations for civic and transport departments." }
    ],
    image: infrastructureImg,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconBg: "bg-orange-100"
  },
  {
    icon: Users,
    title: "Employee Management",
    description: "Transforming corporate employees into road safety advocates through structured CSR partnerships.",
    detailedDescription: "We actively mobilize citizens, organizations, and corporates to participate in impactful road safety initiatives, fostering a collective culture of responsibility and care on our roads.",
    keyInterventions: [
      { title: "Employee Volunteering", desc: "Participation in school awareness sessions and wall-painting campaigns." },
      { title: "Safety Champion Program", desc: "Training employees to deliver road safety messages in local schools." },
      { title: "Joint Events", desc: "Organizing Road Safety Week, mural drives, and public campaigns with corporate teams." }
    ],
    image: communityImg,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100"
  },
  {
    icon: Shield,
    title: "Child Safety Awareness",
    description: "Promoting safety for young passengers and pedestrians through family- and school-based interventions.",
    detailedDescription: "Specialized programs focused on protecting children through education and proper safety equipment usage.",
    keyInterventions: [
      { title: "Child Car Seat Demonstrations", desc: "Hands-on training for parents on correct use and installation." },
      { title: "Workshops for Caregivers", desc: "Sessions on school bus safety, helmet use, and safe pedestrian practices." },
      { title: "Child Safety Materials", desc: "Distribution of \"RoadWise\" handbooks, colouring books, and safety games in local languages." }
    ],
    image: childSafetyImg,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    iconBg: "bg-pink-100"
  },
  {
    icon: Shield,
    title: "Safe School Zone",
    description: "Creating safer commuting environments for children through a mix of education and engineering solutions.",
    detailedDescription: "Comprehensive approach to making school areas safer through infrastructure improvements and educational programs.",
    keyInterventions: [
      { title: "School Zone Assessment", desc: "Mapping risk-prone access roads and traffic behaviour." },
      { title: "Infrastructure Enhancements", desc: "Crosswalks, signage, barricades, and safety markings." },
      { title: "Student & Teacher Training", desc: "Practical awareness sessions and inclusion of road safety in curriculum." },
      { title: "Parent Orientation", desc: "Educating caregivers on safe pickup/drop-off practices and child restraint systems." }
    ],
    image: safeSchoolZoneImg,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    iconBg: "bg-teal-100"
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
          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-gradient-to-r from-primary/5 via-brand-green/5 to-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/20">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                Safety Research Foundation is proposing and executing diverse road safety interventions aimed at achieving our vision of 
                <span className="font-semibold text-primary"> safer roads for all</span>. Through education, engineering, and community engagement, 
                SRF reaches every age group and sensitizes all categories of road users — students, parents, drivers, and pedestrians — 
                to reduce accidents and promote responsible road behaviour.
              </p>
            </div>
          </div>
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
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 lg:p-8 xl:p-10 border-2 border-dashed border-brand-black hover:border-primary relative overflow-hidden min-h-80 sm:min-h-80 lg:h-96 flex flex-col justify-start lg:justify-center">
                  {/* Colored Top Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${intervention.color}`}></div>
                  
                  {/* Icon and Title */}
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 lg:mb-6">
                    <div className={`${intervention.iconBg} p-2 sm:p-3 lg:p-4 rounded-xl shadow-md flex-shrink-0`}>
                      <intervention.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-700" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 lg:whitespace-nowrap leading-tight">
                      {intervention.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm mb-4 text-justify">
                    {intervention.description}
                  </p>

                  {/* Key Interventions */}
                  {intervention.keyInterventions && (
                    <div className="mb-3 sm:mb-4">
                      <h5 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 mb-2">Key Interventions:</h5>
                      <ul className="space-y-1 sm:space-y-2 lg:space-y-1 text-xs sm:text-sm lg:text-sm text-gray-700">
                        {intervention.keyInterventions.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className={`mr-1 mt-0.5 ${
                              intervention.title === "Awareness Programs" ? "text-blue-500" :
                              intervention.title === "Road Safety Training" ? "text-green-500" :
                              intervention.title === "Infrastructure Improvements" ? "text-orange-500" :
                              intervention.title === "Employee Management" ? "text-purple-500" :
                              intervention.title === "Child Safety Awareness" ? "text-pink-500" :
                              intervention.title === "Safe School Zone" ? "text-teal-500" :
                              "text-primary"
                            }`}>•</span>
                            <div>
                              <strong>{item.title}:</strong> {item.desc}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}


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
