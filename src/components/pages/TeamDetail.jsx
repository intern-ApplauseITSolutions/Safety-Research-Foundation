import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// Import team member images
import jeyaImage from "../../assets/team/Ms-Jeya-Padmanaban-1.jpg";
import ajitImage from "../../assets/team/Mr-Ajit-Dandapani.jpg";
import chitraImage from "../../assets/team/Chitra Subramaniam.png";
import seshImage from "../../assets/team/Sesh Subramaniam.png";
import sandipImage from "../../assets/team/Sandip Nawale.png";
import ananthanarayananImage from "../../assets/images/image2.jpeg";

const teamMembers = [
  {
    name: "Jeya Padmanaban",
    position: "Trustee, Safety Research Foundation",
    title: "President and Founder, JP Research",
    image: jeyaImage,
    id: 1,
    bio: "An internationally known statistician with a BS degree in mathematics (India) and an MS in Operations Research/Statistics (George Washington University, USA), Ms. Jeya Padmanaban has been performing statistical analyses of motor vehicle accident data to address vehicle safety and occupant injury experience for over 20 years.",
    details:
      "Ms. Padmanaban has a long history of interacting closely with local, state, and federal personnel particularly those at the U.S. National Highway Traffic Safety Administration (NHTSA) responsible for collecting, coding, and analyzing automobile accident data. Her in-depth knowledge of not only the information contained in these databases but of how that data is collected and coded is the foundation for the performance of careful, competent auto safety research at every level. Currently she is applying this knowledge to directing the development of new, detailed, and consistent data collection and analysis efforts for various localities in India.\n\nOften recognized for excellence in her field, Ms. Padmanaban was honoured with the Society of Automotive Engineers (SAE) 2001 WEC/BREED Award for Women's Leadership. An elected Board Member of the Association for the Advancement of Automotive Medicine (AAAM), she has also served on the Crashworthiness Subcommittee of NHTSA's Event Data Recorder working group (1998), the AAAM Scientific Program Committee (1995-1998), and the Safety Advisory Panel for SAE/TOPTEC.",
    education: [
      "BS in Mathematics (India)",
      "MS in Operations Research/Statistics (George Washington University, USA)",
    ],
    achievements: [
      "SAE 2001 WEC/BREED Award for Women's Leadership",
      "Elected Board Member of AAAM",
      "NHTSA Event Data Recorder working group member",
    ],
    expertise: [
      "Statistical Analysis",
      "Motor Vehicle Accident Data",
      "Vehicle Safety Research",
      "Data Collection & Analysis",
    ],
  },
  {
    name: "Ajit Dandapani",
    position: "Founding Trustee, Safety Research Foundation",
    title: "Founder and CEO, JP Research",
    image: ajitImage,
    id: 2,
    bio: "A computer scientist with a background in both advanced computer and mechanical engineering systems and has many years of experience leading diverse and fast-paced computer technology companies in Silicon Valley. He has built and managed large teams and overseen design and development of complex technology, including hardware and software products.",
    details:
      "As Chief Executive Officer (CEO) of JP Research, Inc. (USA) and JP Research India Pvt. Ltd. (India), Mr. Dandapani has helped steer the company and its subsidiaries through periods of growth and expansion and has brought several software products to market. He had a lead role in establishing a subsidiary, PortalSoft, which was formed to develop a comprehensive case and data management system (CDMS) to retrieve, review and search case related information for engineering companies involved in litigation matters. At JP Research and other computer technology companies in Silicon Valley, Mr. Dandapani has developed open ended, unstructured and structured, searchable data bases, has been responsible for developing data analytics tools including keyword search algorithms for efficient retrieval of case related materials, photographs, deposition summaries, literature review and trial exhibits.",
    education: [
      "Computer Science Background",
      "Advanced Computer and Mechanical Engineering Systems",
    ],
    achievements: [
      "Founded JP Research Inc. (USA)",
      "Established JP Research India Pvt. Ltd.",
      "Founded PortalSoft subsidiary",
    ],
    expertise: [
      "Software Development",
      "Database Systems",
      "Data Analytics",
      "Team Leadership",
      "Product Development",
    ],
  },
  {
    name: "Chitra Subramaniam",
    position: "Trustee, Safety Research Foundation",
    title: "Director, JP Research",
    image: chitraImage,
    id: 3,
    bio: "Ms Chitra is a graduate in structure programming from the University of Maryland, U.S.A. and from International Institute of Management Sciences, Kolkata. She has served at various organisations in the U.S.A pertaining to data entry, financial records maintaining, payroll management and also accident reporting.",
    details:
      "Experienced in computer application, Ms Chitra has developed inventory control database, payroll management and is in-charge of in-house training of accounts and administration staff on computer applications at Amforge group. Besides, she actively campaigns for road safety and has been instrumental in setting up awareness campaigns for school goers in Pune.",
    education: [
      "Structure Programming (University of Maryland, USA)",
      "International Institute of Management Sciences, Kolkata",
    ],
    achievements: [
      "Developed inventory control database systems",
      "Led road safety awareness campaigns",
      "In-house training coordinator",
    ],
    expertise: [
      "Computer Applications",
      "Database Development",
      "Payroll Management",
      "Road Safety Campaigns",
      "Training & Development",
    ],
  },
  {
    name: "Sesh Subramaniam",
    position: "Trustee, Safety Research Foundation",
    title: "Director, JP Research",
    image: seshImage,
    id: 4,
    bio: "An entrepreneur of metal forming and field failures of automotive components for the last 4 decades. As a metal forming specialist and an innovative and extremely competent scientist, have developed state of the art metal forming techniques and has coordinated the standardization of technical processes in steel industries, Hot Forging, Warm Forging and Cold Forging and Auto Component Industries.",
    details:
      "Has been involved with several green field projects in India consisting of state of the art manufacturing techniques and thus have contributed further rapid growth of metal forming industries. In one of the successful projects, he has developed high technology manufacturing constant velocity joint items using warm/cold metal processing techniques, in conjunction with international organizations from Germany, UK, and Spain. The hands-on experience with failure analysis enabled him to publish numerous articles on the subject. Travelled extensively overseas for transfer of technology, machinery selection and marketing.\n\nCareer Summary:\nIndia: At present resident Board of Director for JP Research India Ltd. Served as CEO/Executive Director (working Board of Director) at India Forge and Drop Stampings Ltd., past 10 years, and at Amforge Industries Ltd for 4 years. Involved in development of various auto components and assembly for car manufacturers namely Maruti Suzuki India Ltd., Honda Motors Ltd. Mahindra & Mahindra Ltd., Tata Motors Ltd. and HST Germany and also several Greenfield Projects.\n\nOverseas: Plant Manager at Colorado Forge Ltd, USA and Chief Quality Manager at Precision Metals Inc. Sandiego, USA. The company was involved in manufacturing Air craft for Boeing industries.\n\nProfessional Memberships: Past Chairman – American Society for Materials – Pune Chapter, India. Life Member – International Association of Business Leaders Inc. – Newbern, NC, USA",
    education: ["Metal Forming Specialist", "40+ years industry experience"],
    achievements: [
      "Past Chairman - American Society for Materials, Pune Chapter",
      "Life Member - International Association of Business Leaders Inc.",
      "CEO/Executive Director positions",
    ],
    expertise: [
      "Metal Forming",
      "Automotive Components",
      "Manufacturing Techniques",
      "Failure Analysis",
      "International Business",
    ],
  },
  {
    name: "Sandip Nawale",
    position: "Head - Operations, Safety Research Foundation",
    title: "Head - Operations, SRF",
    image: sandipImage,
    id: 5,
    bio: "With nearly 18 years of experience in the development and CSR sectors, Sandip Nawale brings a wealth of expertise in Project Management, Monitoring and Evaluation, Corporate Social Responsibility, and Community Development. He holds a Master degree in Social Work with a focus on Urban and Rural Community Development, and he is certified in CSR from the Indian Institute of Corporate Affairs (IICA).",
    details:
      "Sandip has effectively led impactful programs with various organizations, including Vestas Wind Technology and BAIF Development Research Foundation, where he championed initiatives in areas such as child safety, environmental conservation, Health & Education and rural livelihoods.\n\nAt the Safety Research Foundation, Sandip heads the operations with a strong commitment to road safety and public awareness, especially focused on vulnerable road users. His role encompasses not only program execution but also strategic planning and stakeholder engagement, CSR Partnerships aiming to expand SRF's reach and enhance the impact of its initiatives. His vision for SRF is to foster a safe, informed, and responsible community through sustainable and data-driven solutions.",
    education: [
      "Master degree in Social Work (Urban and Rural Community Development)",
      "Certified in CSR from Indian Institute of Corporate Affairs (IICA)",
    ],
    achievements: [
      "18+ years in development and CSR sectors",
      "Led programs at Vestas Wind Technology",
      "Program leadership at BAIF Development Research Foundation",
    ],
    expertise: [
      "Project Management",
      "Corporate Social Responsibility",
      "Community Development",
      "Road Safety",
      "Stakeholder Engagement",
    ],
  },
  {
    name: "S Ananthanarayanan",
    position: "Trustee, Safety Research Foundation",
    title: "Trustee, SRF",
    image: ananthanarayananImage,
    id: 6,
    bio: "MR. S Ananthanarayanan is an Alumnus of College of Engineering, Guindy in Chennai. He is also a qualified Cost Accountant besides being a Fellow of the Indian Institution of Industrial Engineering. He has over thirty years experience in Manufacturing, Production Engineering and General Management in both Government and Private sectors.",
    details:
      "He has been associated with CII (Confederation of Indian Industries) since long and has held the positions of Chairman of Karnataka State and of the Southern Zone. Until recently, he was an Independent Director in a large company.",
    education: [
      "College of Engineering, Guindy, Chennai",
      "Qualified Cost Accountant",
      "Fellow of the Indian Institution of Industrial Engineering",
    ],
    achievements: [
      "Chairman of CII Karnataka State",
      "Chairman of CII Southern Zone",
      "Independent Director in large company",
      "30+ years in Manufacturing and General Management",
    ],
    expertise: [
      "Manufacturing",
      "Production Engineering",
      "General Management",
      "Cost Accounting",
      "Industrial Engineering",
    ],
  },
];

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts or ID changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const member = teamMembers.find((m) => m.id === parseInt(id));

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Team Member Not Found
          </h1>
          <button
            onClick={() => {
              navigate(-1);
              // Small delay to ensure navigation completes before scrolling
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => {
              navigate(-1);
              // Small delay to ensure navigation completes before scrolling
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Team
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              {/* Profile Image */}
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 shadow-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Basic Info */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h1>
                <p className="text-primary font-semibold mb-2">
                  {member.title}
                </p>
                <p className="text-gray-600 text-sm">{member.position}</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-700">
                    Safety Research Foundation
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-700">India & USA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-primary rounded-full"></div>
                About {member.name}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {member.bio}
              </p>
              <div className="prose prose-lg max-w-none">
                {member.details.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-primary" />
                Education & Qualifications
              </h3>
              <div className="space-y-3">
                {member.education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{edu}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                Key Achievements
              </h3>
              <div className="space-y-3">
                {member.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border-l-4 border-primary"
                  >
                    <Award className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-primary mb-6">
                Areas of Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {member.expertise.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-center font-semibold"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
