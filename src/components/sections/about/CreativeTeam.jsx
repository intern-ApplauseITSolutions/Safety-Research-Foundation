import { Users, Award, Heart, Lightbulb, Handshake, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import team member images
import jeyaImage from '../../../assets/team/Ms-Jeya-Padmanaban-1.jpg';
import ajitImage from '../../../assets/team/Mr-Ajit-Dandapani.jpg';
import chitraImage from '../../../assets/team/Chitra Subramaniam.png';
import seshImage from '../../../assets/team/Sesh Subramaniam.png';
import sandipImage from '../../../assets/team/Sandip Nawale.png';
import ananthanarayananImage from '../../../assets/images/image2.jpeg';

const teamMembers = [
  {
    name: "Jeya Padmanaban",
    position: "Founding Trustee",
    organization: "Safety Research Foundation",
    title: "President and Founder, JP Research",
    image: jeyaImage,
    id: 1,
    bio: "An internationally known statistician with a BS degree in mathematics (India) and an MS in Operations Research/Statistics (George Washington University, USA), Ms. Jeya Padmanaban has been performing statistical analyses of motor vehicle accident data to address vehicle safety and occupant injury experience for over 20 years.",
    details: "Ms. Padmanaban has a long history of interacting closely with local, state, and federal personnel particularly those at the U.S. National Highway Traffic Safety Administration (NHTSA) responsible for collecting, coding, and analyzing automobile accident data. Her in-depth knowledge of not only the information contained in these databases but of how that data is collected and coded is the foundation for the performance of careful, competent auto safety research at every level. Currently she is applying this knowledge to directing the development of new, detailed, and consistent data collection and analysis efforts for various localities in India.\n\nOften recognized for excellence in her field, Ms. Padmanaban was honoured with the Society of Automotive Engineers (SAE) 2001 WEC/BREED Award for Women's Leadership. An elected Board Member of the Association for the Advancement of Automotive Medicine (AAAM), she has also served on the Crashworthiness Subcommittee of NHTSA's Event Data Recorder working group (1998), the AAAM Scientific Program Committee (1995-1998), and the Safety Advisory Panel for SAE/TOPTEC."
  },
  {
    name: "Ajit Dandapani",
    position: "Trustee",
    organization: "Safety Research Foundation",
    title: "Founder and CEO, JP Research",
    image: ajitImage,
    id: 2,
    bio: "A computer scientist with a background in both advanced computer and mechanical engineering systems and has many years of experience leading diverse and fast-paced computer technology companies in Silicon Valley. He has built and managed large teams and overseen design and development of complex technology, including hardware and software products.",
    details: "As Chief Executive Officer (CEO) of JP Research, Inc. (USA) and JP Research India Pvt. Ltd. (India), Mr. Dandapani has helped steer the company and its subsidiaries through periods of growth and expansion and has brought several software products to market. He had a lead role in establishing a subsidiary, PortalSoft, which was formed to develop a comprehensive case and data management system (CDMS) to retrieve, review and search case related information for engineering companies involved in litigation matters. At JP Research and other computer technology companies in Silicon Valley, Mr. Dandapani has developed open ended, unstructured and structured, searchable data bases, has been responsible for developing data analytics tools including keyword search algorithms for efficient retrieval of case related materials, photographs, deposition summaries, literature review and trial exhibits."
  },
  {
    name: "Chitra Subramaniam",
    position: "Trustee",
    organization: "Safety Research Foundation",
    title: "Director, JP Research",
    image: chitraImage,
    id: 3,
    bio: "Ms Chitra is a graduate in structure programming from the University of Maryland, U.S.A. and from International Institute of Management Sciences, Kolkata. She has served at various organisations in the U.S.A pertaining to data entry, financial records maintaining, payroll management and also accident reporting.",
    details: "Experienced in computer application, Ms Chitra has developed inventory control database, payroll management and is in-charge of in-house training of accounts and administration staff on computer applications at Amforge group. Besides, she actively campaigns for road safety and has been instrumental in setting up awareness campaigns for school goers in Pune."
  },
  {
    name: "Sesh Subramaniam",
    position: "Trustee",
    organization: "Safety Research Foundation",
    title: "Director, JP Research",
    image: seshImage,
    id: 4,
    bio: "An entrepreneur of metal forming and field failures of automotive components for the last 4 decades. As a metal forming specialist and an innovative and extremely competent scientist, have developed state of the art metal forming techniques and has coordinated the standardization of technical processes in steel industries, Hot Forging, Warm Forging and Cold Forging and Auto Component Industries.",
    details: "Has been involved with several green field projects in India consisting of state of the art manufacturing techniques and thus have contributed further rapid growth of metal forming industries. In one of the successful projects, he has developed high technology manufacturing constant velocity joint items using warm/cold metal processing techniques, in conjunction with international organizations from Germany, UK, and Spain. The hands-on experience with failure analysis enabled him to publish numerous articles on the subject. Travelled extensively overseas for transfer of technology, machinery selection and marketing.\n\nCareer Summary:\nIndia: At present resident Board of Director for JP Research India Ltd. Served as CEO/Executive Director (working Board of Director) at India Forge and Drop Stampings Ltd., past 10 years, and at Amforge Industries Ltd for 4 years. Involved in development of various auto components and assembly for car manufacturers namely Maruti Suzuki India Ltd., Honda Motors Ltd. Mahindra & Mahindra Ltd., Tata Motors Ltd. and HST Germany and also several Greenfield Projects.\n\nOverseas: Plant Manager at Colorado Forge Ltd, USA and Chief Quality Manager at Precision Metals Inc. Sandiego, USA. The company was involved in manufacturing Air craft for Boeing industries.\n\nProfessional Memberships: Past Chairman – American Society for Materials – Pune Chapter, India. Life Member – International Association of Business Leaders Inc. – Newbern, NC, USA"
  },
  {
    name: "Sandip Nawale",
    position: "Head - Operations",
    organization: "Safety Research Foundation",
    title: "Head - Operations, SRF",
    image: sandipImage,
    id: 5,
    bio: "With nearly 18 years of experience in the development and CSR sectors, Sandip Nawale brings a wealth of expertise in Project Management, Monitoring and Evaluation, Corporate Social Responsibility, and Community Development. He holds a Master degree in Social Work with a focus on Urban and Rural Community Development, and he is certified in CSR from the Indian Institute of Corporate Affairs (IICA).",
    details: "Sandip has effectively led impactful programs with various organizations, including Vestas Wind Technology and BAIF Development Research Foundation, where he championed initiatives in areas such as child safety, environmental conservation, Health & Education and rural livelihoods.\n\nAt the Safety Research Foundation, Sandip heads the operations with a strong commitment to road safety and public awareness, especially focused on vulnerable road users. His role encompasses not only program execution but also strategic planning and stakeholder engagement, CSR Partnerships aiming to expand SRF's reach and enhance the impact of its initiatives. His vision for SRF is to foster a safe, informed, and responsible community through sustainable and data-driven solutions."
  },
  {
    name: "S Ananthanarayanan",
    position: "Trustee",
    organization: "Safety Research Foundation",
    title: "Trustee, SRF",
    image: ananthanarayananImage,
    id: 6,
    bio: "MR. S Ananthanarayanan is an Alumnus of College of Engineering, Guindy in Chennai. He is also a qualified Cost Accountant besides being a Fellow of the Indian Institution of Industrial Engineering. He has over thirty years experience in Manufacturing, Production Engineering and General Management in both Government and Private sectors.",
    details: "He has been associated with CII (Confederation of Indian Industries) since long and has held the positions of Chairman of Karnataka State and of the Southern Zone. Until recently, he was an Independent Director in a large company."
  }
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pioneering new approaches to road safety"
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "Working together for greater impact"
  },
  {
    icon: Shield,
    title: "Independence",
    description: "Maintaining objectivity in our mission"
  },
  {
    icon: Heart,
    title: "Honesty",
    description: "Transparent in all our endeavors"
  },
  {
    icon: Award,
    title: "High Integrity",
    description: "Upholding the highest ethical standards"
  }
];

export default function CreativeTeam() {
  const navigate = useNavigate();

  const handleTeamMemberClick = (memberId) => {
    navigate(`/team/${memberId}`);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Creative Team
              </h2>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              Our team is driven by <span className="font-semibold text-primary">Innovation</span>, <span className="font-semibold text-primary">Collaboration</span>, <span className="font-semibold text-primary">Independence</span>, <span className="font-semibold text-primary">Honesty</span> and <span className="font-semibold text-primary">high Integrity</span> working together to serve our partners and communities across India in advancing the shared mission of safer roads and responsible mobility.
            </p>
          </div>
        </div>


        {/* Team Members */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer border-2 border-dashed border-brand-black hover:border-primary h-full flex flex-col"
                onClick={() => handleTeamMemberClick(member.id)}
              >
                {/* Team Member Photo */}
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback initials (hidden by default) */}
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center" style={{display: 'none'}}>
                    <span className="text-lg font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                
                {/* Member Info */}
                <div className="text-center flex-1 flex flex-col justify-between">
                  <div className="min-h-[90px] flex flex-col justify-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{member.name}</h4>
                    <p className="text-primary font-semibold text-sm leading-tight mb-1">{member.position}</p>
                    <p className="text-gray-600 text-xs leading-tight">{member.organization}</p>
                  </div>
                  
                  <div className="mt-auto">
                    {/* Decorative Element */}
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
