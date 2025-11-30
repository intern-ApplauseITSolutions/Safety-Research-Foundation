import { Briefcase, Users, GraduationCap, Car, MapPin, Megaphone, Sparkles, CheckCircle, ArrowRight, Search, Settings, Handshake, Camera, Network, UserCheck, TestTube } from 'lucide-react';

// Import BRACE activity images
import studentWorkshopImg from '../../../assets/images/WhatsApp Image 2025-11-20 at 14.55.25_2cbf2880.jpg';
import parentSessionImg from '../../../assets/images/ChildSafetySeatAwarenessSession/IMG-20250112-WA0001.jpg';
import driverTrainingImg from '../../../assets/images/WhatsApp Image 2025-11-20 at 14.55.37_a97479e9.jpg';
import safeSchoolZoneImg from '../../../assets/images/shared image (23).jfif';
import employeeEngagementImg from '../../../assets/images/shared image (24).jfif';
import massOutreachImg from '../../../assets/images/GoYellowRoadSafetyAwareness25th&26thFeb2022/1.jpg';

// Import CCTV project images
import cctvImg1 from '../../../assets/images/1.png';
import cctvImg2 from '../../../assets/images/2.png';
import cctvImg3 from '../../../assets/images/3.png';
import cctvImg4 from '../../../assets/images/4.png';
import cctvImg5 from '../../../assets/images/5.png';
import cctvImg6 from '../../../assets/images/shared image (20).jfif';
import cctvImg7 from '../../../assets/images/shared image (21).jfif';
import cctvImg8 from '../../../assets/images/shared image (22).jfif';

const braceActivities = [
  {
    icon: GraduationCap,
    title: "Student Workshops",
    description: "Interactive sessions for Classes 7–9 students, conducted twice a year, reaching over 5,000 students. These workshops build awareness about child safety, seatbelt use, and proper child restraints through engaging and practical learning.",
    image: studentWorkshopImg,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    stats: "5,000+ Students"
  },
  {
    icon: Users,
    title: "Parent Sessions",
    description: "Dedicated sessions for 200+ parents focused on safe travel habits, responsible road behavior, and child passenger safety to ensure every journey is a safe one.",
    image: parentSessionImg,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    stats: "200+ Parents"
  },
  {
    icon: Car,
    title: "Driver Training",
    description: "Comprehensive training for 200+ school bus drivers and attendants on safe transport practices, emergency response, and maintaining high safety standards in daily school commutes.",
    image: driverTrainingImg,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    stats: "200+ Drivers"
  },
  {
    icon: MapPin,
    title: "Safe School Zones",
    description: "Conducted technical safety audits across 5+ school zones, offering data-driven recommendations to improve road design, signage, and traffic flow for safer school environments.",
    image: safeSchoolZoneImg,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    stats: "5+ School Zones"
  },
  {
    icon: Sparkles,
    title: "Employee Engagement",
    description: "Encouraging Bosch employees to take the lead in school sessions, awareness drives, and community outreach, strengthening a shared culture of road safety and responsibility.",
    image: employeeEngagementImg,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    stats: "Active Participation"
  },
  {
    icon: Megaphone,
    title: "Mass Outreach",
    description: "Large-scale public campaigns and events that inspire communities to adopt safer road practices and build collective responsibility for saving lives on our roads.",
    image: massOutreachImg,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    stats: "Community Wide"
  }
];

const cctvActivities = [
  {
    icon: Search,
    title: "Site Survey & Location Identification",
    description: "Identified key junctions, blackspots, school zones, and high-traffic corridors across Nashik city using accident records and police insights to determine optimal camera locations.",
    image: cctvImg1,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    stats: "100+ Locations"
  },
  {
    icon: Settings,
    title: "Technical Feasibility Assessment",
    description: "Assessed each proposed site for camera mounting suitability, network signal strength, power access, elevation, and visibility to ensure complete area coverage without blind spots.",
    image: cctvImg2,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    stats: "Complete Coverage"
  },
  {
    icon: Handshake,
    title: "Stakeholder Coordination",
    description: "Worked closely with Nashik Police, Municipal Corporation, electricity departments, and local community representatives to secure permissions, enable support systems, and streamline implementation.",
    image: cctvImg3,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    stats: "Multi-Agency"
  },
  {
    icon: Camera,
    title: "Procurement & Installation",
    description: "Installed 100+ wireless HD CCTV cameras with night vision, wide-angle coverage, recording capability, and motion detection to strengthen surveillance and rapid response capacity.",
    image: cctvImg4,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    stats: "100+ Cameras"
  },
  {
    icon: Network,
    title: "Networking & System Integration",
    description: "Connected all installed units to the central Police Command & Control Room through a secure network with uninterrupted backup power and data retention mechanisms.",
    image: cctvImg5,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    stats: "Centralized System"
  },
  {
    icon: Users,
    title: "Community Participation Model",
    description: "Implemented a collaborative model where local residents and shop owners supported power supply and custody of selected camera points, ensuring ownership and sustainability.",
    image: cctvImg6,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    stats: "Community Driven"
  },
  {
    icon: TestTube,
    title: "Testing & Quality Assurance",
    description: "Conducted live testing for camera clarity, night performance, motion capture, backup storage, and network connectivity to validate operational readiness under real conditions.",
    image: cctvImg7,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    stats: "Quality Verified"
  },
  {
    icon: UserCheck,
    title: "Training & Handover Workshops",
    description: "Delivered hands-on training for police personnel on monitoring, incident review, maintenance protocols, and footage documentation before formal handover.",
    image: cctvImg8,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    stats: "Police Trained"
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
                  <h2 className="text-3xl sm:text-2xl font-bold text-white mb-2">
                    BRACE (Bosch’s Road Safety Awareness and Community Engagement)
                  </h2>
                  <p className="text-xl text-white/90 font-semibold">
                    Road Safety Awareness program-An initiatives by BOSCH Limited
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Briefcase className="w-16 h-16 text-white mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-white text-sm font-medium">Active Partnership</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <p className="text-white/95 text-base sm:text-lg leading-relaxed text-justify">
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
            {braceActivities.map((activity, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed border-brand-black hover:border-primary overflow-hidden"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

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
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
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


        </div>

        {/* Second Project - CCTV Surveillance */}
        <div className="mt-16 mb-12">
          <div className="bg-gradient-to-br from-primary to-brand-green rounded-3xl shadow-2xl overflow-hidden border-4 border-dashed border-white">
            <div className="p-8 sm:p-10 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                    <Sparkles className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold text-sm">CSR Partnership</span>
                  </div>
                  <h2 className="text-3xl sm:text-2xl font-bold text-white mb-2">
                    CCTV Surveillance and Road Safety Enhancement Project
                  </h2>
                  <p className="text-xl text-white/90 font-semibold">
                    Bhadrakali Police Station Jurisdiction, Nashik - CSR Support Partner: BOSCH Limited
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Briefcase className="w-16 h-16 text-white mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-white text-sm font-medium">Completed Project</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-white/20">
                <p className="text-white/95 text-base sm:text-lg leading-relaxed text-justify">
                  The project involved the successful installation and commissioning of a comprehensive CCTV surveillance network across 30 intersections under the Bhadrakali Police Station in Nashik. A total of 84 IP-based cameras were strategically placed based on detailed site surveys, ensuring optimal coverage of high-risk and high-traffic zones.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CCTV Project Activities Grid */}
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Nashik CCTV Surveillance Project – Key Activities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cctvActivities.map((activity, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-dashed border-brand-black hover:border-primary overflow-hidden"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

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
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    {activity.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">Completed</span>
                  </div>
                </div>

                {/* Background Pattern */}
                <div className={`absolute bottom-0 right-0 w-24 h-24 ${activity.bgColor} rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* CCTV Project Impact Summary */}
        <div className="bg-gradient-to-r from-primary/10 via-brand-green/10 to-secondary/10 rounded-2xl p-8 border-2 border-dashed border-primary">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Project Impact</h4>
            <p className="text-gray-600">Enhancing safety through technology</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-primary mb-1">30</div>
              <div className="text-sm text-gray-600 font-medium">Intersections Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-brand-green mb-1">84</div>
              <div className="text-sm text-gray-600 font-medium">IP-Based Cameras</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-secondary mb-1">100%</div>
              <div className="text-sm text-gray-600 font-medium">Project Completion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-500 mb-1">24/7</div>
              <div className="text-sm text-gray-600 font-medium">Surveillance Coverage</div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
