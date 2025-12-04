import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Users, FileText, Award, CheckCircle, ExternalLink, Eye, X, Copy, Phone, Mail, Building, Briefcase, HandHeart, Landmark, Globe } from 'lucide-react';
import donateImage from '../assets/images/get involved-srf.png';

export default function GetInvolvedPage() {
  const navigate = useNavigate();
  const [copiedText, setCopiedText] = React.useState('');
  const [showDonationForm, setShowDonationForm] = React.useState(false);
  const [showThankYou, setShowThankYou] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('individual');
  const [selectedOption, setSelectedOption] = React.useState('csr');
  const [formData, setFormData] = React.useState({
    // Individual form data
    individual: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      state: '',
      country: 'India',
      currency: 'INR',
      amount: ''
    },
    // Organization form data
    organization: {
      companyName: '',
      contactPerson: '',
      designation: '',
      email: '',
      mobile: '',
      landline: '',
      streetAddress: '',
      apartment: '',
      city: '',
      zipCode: '',
      state: '',
      country: 'India',
      panCard: '',
      amount: '',
      currency: 'INR'
    }
  });

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label);
      setTimeout(() => setCopiedText(''), 2000);
    });
  };

  const showDonationFormHandler = () => {
    setShowDonationForm(true);
    setShowThankYou(false);
    document.body.style.overflow = 'hidden';
  };

  const closeDonationForm = () => {
    setShowDonationForm(false);
    setShowThankYou(false);
    document.body.style.overflow = 'unset';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowDonationForm(false);
    setShowThankYou(true);
  };

  const backToDonateForm = () => {
    setShowThankYou(false);
    setShowDonationForm(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value
      }
    }));
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
    'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const uspPoints = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Expert Leadership",
      description: "Led by trustees with strong academic and professional backgrounds in road safety research, policy, and engineering."
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Qualified Professional Team",
      description: "Driven by a skilled team of road safety specialists, researchers, and field practitioners with hands-on implementation experience."
    },
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "Data-Driven Solutions",
      description: "All programs are designed using scientific crash data, research insights, and evidence-based models to create measurable impact."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Strong Government Collaboration",
      description: "Consistent coordination with traffic police, RTOs, transport departments, urban local bodies, and education institutions for effective execution."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Proven Impact",
      description: "Successfully delivered high-impact road safety projects across cities, improving awareness, training systems, and safer infrastructure on the ground."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 -mt-10 md:-mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Get Involved with SRF
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join us in making Indian roads safer. Partner with us through CSR projects, volunteering,
              government collaborations, or NGO partnerships.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Options Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-black mb-12 text-center">
          Choose How You Want to Get Involved
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* CSR Opportunities */}
          <button
            onClick={() => setSelectedOption('csr')}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${selectedOption === 'csr'
              ? 'border-primary bg-primary/5 shadow-lg scale-105'
              : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
              }`}
          >
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-brand-black mb-2">CSR Opportunities</h3>
            <p className="text-sm text-gray-600">Partner with us for Corporate Social Responsibility projects</p>
          </button>

          {/* Volunteering */}
          <button
            onClick={() => setSelectedOption('volunteering')}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${selectedOption === 'volunteering'
              ? 'border-primary bg-primary/5 shadow-lg scale-105'
              : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
              }`}
          >
            <div className="bg-brand-green/10 p-3 rounded-lg w-fit mb-4">
              <HandHeart className="w-8 h-8 text-brand-green" />
            </div>
            <h3 className="text-lg font-bold text-brand-black mb-2">Volunteering</h3>
            <p className="text-sm text-gray-600">Individuals, Corporates & Institutions can volunteer</p>
          </button>

          {/* Government Organizations */}
          <button
            onClick={() => setSelectedOption('government')}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${selectedOption === 'government'
              ? 'border-primary bg-primary/5 shadow-lg scale-105'
              : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
              }`}
          >
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
              <Landmark className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-brand-black mb-2">Government Organizations</h3>
            <p className="text-sm text-gray-600">Collaborate with government agencies</p>
          </button>

          {/* NGOs */}
          <button
            onClick={() => setSelectedOption('ngos')}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${selectedOption === 'ngos'
              ? 'border-primary bg-primary/5 shadow-lg scale-105'
              : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
              }`}
          >
            <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-brand-black mb-2">NGOs</h3>
            <p className="text-sm text-gray-600">Partner with us as an NGO organization</p>
          </button>
        </div>

        {/* Content Based on Selected Option */}
        {selectedOption === 'csr' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-brand-black mb-6">CSR Opportunities: Projects</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Partner with Safety Research Foundation for impactful Corporate Social Responsibility projects focused on road safety.
              We offer customized CSR programs that align with your company's values and create measurable social impact.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Road Safety Awareness Programs</h4>
                <p className="text-sm text-gray-600">Conduct awareness sessions in schools, colleges, and communities</p>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Safety Equipment Distribution</h4>
                <p className="text-sm text-gray-600">Provide helmets, reflective jackets, and safety gear to vulnerable road users</p>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Road Safety Audits</h4>
                <p className="text-sm text-gray-600">Scientific assessment of road infrastructure and safety measures</p>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Data-Driven Research</h4>
                <p className="text-sm text-gray-600">Support evidence-based road safety research and analysis</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-brand-black mb-4">Contact Us for CSR Partnership</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:info@safetyresearchfoundation.org" className="flex items-center gap-2 text-primary hover:text-primary/80">
                  <Mail className="w-5 h-5" />
                  contact@safetyresearchfoundation.org                </a>
                <a href="tel:+918806943991" className="flex items-center gap-2 text-primary hover:text-primary/80">
                  <Phone className="w-5 h-5" />
                  +91 7030910122
                </a>
              </div>
            </div>
          </div>
        )}

        {selectedOption === 'volunteering' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-brand-black mb-6">Volunteering: Individuals / Corporates / Institutions</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Join our mission as a volunteer and contribute your time, skills, and passion to make Indian roads safer.
              We welcome individuals, corporate groups, and institutions to participate in our various road safety initiatives.
            </p>

            <div className="space-y-6 mb-8">
              <div className="border-l-4 border-brand-green pl-6">
                <h4 className="font-semibold text-brand-black mb-2">Individual Volunteers</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Participate in awareness campaigns, event organization, content creation, social media outreach, and field activities.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Awareness campaign volunteers</li>
                  <li>Event coordinators and support staff</li>
                  <li>Content creators and designers</li>
                  <li>Social media ambassadors</li>
                </ul>
              </div>

              <div className="border-l-4 border-primary pl-6">
                <h4 className="font-semibold text-brand-black mb-2">Corporate Volunteers</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Engage your employees in meaningful CSR activities through corporate volunteering programs.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Team volunteering for awareness drives</li>
                  <li>Skill-based volunteering (tech, design, legal, etc.)</li>
                  <li>Employee engagement programs</li>
                  <li>Pro-bono professional services</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h4 className="font-semibold text-brand-black mb-2">Institutional Volunteers</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Educational institutions can partner with us for student engagement and community service programs.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Student volunteer programs</li>
                  <li>Internship opportunities</li>
                  <li>Research collaborations</li>
                  <li>Campus awareness initiatives</li>
                </ul>
              </div>
            </div>

            <div className="bg-brand-green/10 p-6 rounded-lg">
              <h4 className="font-semibold text-brand-black mb-4">Ready to Volunteer?</h4>
              <p className="text-sm text-gray-700 mb-4">
                Fill out our volunteer form or contact us directly to start making a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:volunteer@safetyresearchfoundation.org" className="flex items-center gap-2 text-brand-green hover:text-brand-green/80">
                  <Mail className="w-5 h-5" />
                  volunteer@safetyresearchfoundation.org
                </a>
                <a href="tel:+917030910122" className="flex items-center gap-2 text-brand-green hover:text-brand-green/80">
                  <Phone className="w-5 h-5" />
                  +91 7030910122
                </a>
              </div>
            </div>
          </div>
        )}

        {selectedOption === 'government' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-brand-black mb-6">Government Organizations</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Safety Research Foundation actively collaborates with government agencies, traffic police departments,
              and municipal corporations to implement data-driven road safety solutions and policy recommendations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Traffic Police Collaboration</h4>
                <p className="text-sm text-gray-600">
                  Support traffic enforcement with scientific crash investigation, data analysis, and safety equipment distribution.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Municipal Partnerships</h4>
                <p className="text-sm text-gray-600">
                  Work with municipal corporations on road safety audits, infrastructure improvements, and public awareness campaigns.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Policy Advisory</h4>
                <p className="text-sm text-gray-600">
                  Provide evidence-based recommendations for road safety policies and regulations.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Training Programs</h4>
                <p className="text-sm text-gray-600">
                  Conduct specialized training for government officials on crash investigation and road safety management.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-brand-black mb-4">Partner with Us</h4>
              <p className="text-sm text-gray-700 mb-4">
                Government agencies interested in collaboration can reach out to discuss partnership opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:info@safetyresearchfoundation.org" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Mail className="w-5 h-5" />
                  contact@safetyresearchfoundation.org                </a>
                <a href="tel:+918806943991" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                  <Phone className="w-5 h-5" />
                  +91 7030910122
                </a>
              </div>
            </div>
          </div>
        )}

        {selectedOption === 'ngos' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-brand-black mb-6">NGO Partnerships</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We believe in collaborative action for road safety. Partner with Safety Research Foundation to amplify impact,
              share resources, and work together towards reducing road traffic injuries and fatalities across India.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Joint Awareness Campaigns</h4>
                <p className="text-sm text-gray-600">
                  Collaborate on large-scale awareness programs, combining resources and expertise for greater reach and impact.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Resource Sharing</h4>
                <p className="text-sm text-gray-600">
                  Share research data, educational materials, best practices, and technical expertise to strengthen road safety initiatives.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Capacity Building</h4>
                <p className="text-sm text-gray-600">
                  Joint training programs and workshops to enhance organizational capabilities in road safety interventions.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold text-brand-black mb-3">Advocacy & Policy</h4>
                <p className="text-sm text-gray-600">
                  Work together on advocacy initiatives and policy recommendations to influence road safety legislation.
                </p>
              </div>
            </div>

            <div className="bg-purple-100 p-6 rounded-lg">
              <h4 className="font-semibold text-brand-black mb-4">Explore Partnership Opportunities</h4>
              <p className="text-sm text-gray-700 mb-4">
                NGOs working in road safety, public health, or community development can connect with us for collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:partnerships@safetyresearchfoundation.org" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                  <Mail className="w-5 h-5" />
                  partnerships@safetyresearchfoundation.org
                </a>
                <a href="tel:+918806943991" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                  <Phone className="w-5 h-5" />
                  +91 7030910122
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Registration Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-black mb-8 text-center">
            Registration Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-brand-black">12A Provisional Approval</h3>
              </div>
              <p className="text-brand-black/70 font-mono text-sm sm:text-base">
                80G: AATTS4811J25PN01
              </p>
            </div>

            <div className="bg-brand-green/10 rounded-lg p-6 border border-brand-green/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-brand-green/20 p-2 rounded-lg">
                  <Award className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-lg font-semibold text-brand-black">80G Provisional Approval</h3>
              </div>
              <p className="text-brand-black/70 font-mono text-sm sm:text-base">
                12A: AATTS4811JE20206
              </p>
            </div>
          </div>
        </div>

        {/* Our USP Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Image */}
            <div className="relative overflow-hidden">
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                <img
                  src={donateImage}
                  alt="Road Safety Mission - Supporting safer roads in India"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-2">Our Unique Strengths</h3>
                    <p className="text-sm opacity-90">
                      Combining expertise, transparency, and government collaboration
                      to create meaningful impact in road safety across India.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - USP Points */}
            <div className="p-6 sm:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-black mb-8">
                Why Choose SRF?
              </h2>

              <div className="space-y-6">
                {uspPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
                      {point.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black mb-2">{point.title}</h4>
                      <p className="text-brand-black/60 text-sm leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-black mb-8">
              Make a Difference Today
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                className="group bg-gradient-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                onClick={showDonationFormHandler}
              >
                <Heart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                Click here to donate
                <ExternalLink className="w-5 h-5 opacity-70" />
              </button>

              <button
                className="group bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                onClick={() => {
                  // Navigate to events page with images tab open
                  navigate('/events', {
                    state: {
                      tab: 'events',
                      section: 'media',
                      mediaTab: 'images'
                    }
                  });
                }}
              >
                <Eye className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                Glimpse of SRF activities
              </button>
            </div>

            <div className="mt-8 p-6 bg-brand-green/10 rounded-lg border border-brand-green/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-brand-green" />
                <span className="font-semibold text-green-800">Tax Benefit Available</span>
              </div>
              <p className="text-green-700 text-sm">
                All donations are eligible for 80G tax exemption under the Income Tax Act.
                You will receive an official certificate for tax purposes.
              </p>
            </div>
          </div>
        </div>


        {/* Impact Statement */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-black mb-6">
            Your Contribution Drives Future Change
          </h2>
          <p className="text-brand-black/70 text-lg leading-relaxed max-w-4xl mx-auto">
            Your support will empower us to expand road safety education, strengthen community awareness, and provide training that protects students, parents, and drivers. It will help us equip traffic police with modern safety tools, conduct advanced crash investigations, and advocate for safer road infrastructure across India.
            With every contribution, you will be helping build a safer future—one where preventable road accidents are reduced, and more families reach home safely every day.
          </p>
          <div className="mt-8 text-center">
            <p className="text-primary font-semibold text-lg">
              Together, we will create long-term, measurable change in road safety across the country.
            </p>
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-brand-black">WAY TO DONATION</h2>
                <button
                  onClick={closeDonationForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <p className="text-center text-brand-black/60 mb-6">(Donation Only In Indian Rupees)</p>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('individual')}
                  className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${activeTab === 'individual'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-brand-black/70'
                    }`}
                >
                  Individual
                </button>
                <button
                  onClick={() => setActiveTab('organization')}
                  className={`px-6 py-3 font-medium transition-colors duration-200 border-b-2 ${activeTab === 'organization'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-brand-black/70'
                    }`}
                >
                  Organisation
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit}>
                {activeTab === 'individual' ? (
                  /* Individual Form */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">First Name*</label>
                        <input
                          type="text"
                          required
                          value={formData.individual.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Last Name*</label>
                        <input
                          type="text"
                          required
                          value={formData.individual.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-black/70 mb-1">Email Address*</label>
                      <input
                        type="email"
                        required
                        value={formData.individual.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-black/70 mb-1">Mobile Number*</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          India +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.individual.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Select Your State*</label>
                        <select
                          required
                          value={formData.individual.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select State</option>
                          {indianStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Country</label>
                        <input
                          type="text"
                          value={formData.individual.country}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-black/70 mb-1">Donation Amount* (INR)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.individual.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter amount in INR"
                      />
                    </div>
                  </div>
                ) : (
                  /* Organization Form */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-black/70 mb-1">Name of the Company*</label>
                      <input
                        type="text"
                        required
                        value={formData.organization.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Name of the Contact Person*</label>
                        <input
                          type="text"
                          required
                          value={formData.organization.contactPerson}
                          onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Designation of the Contact Person*</label>
                        <input
                          type="text"
                          required
                          value={formData.organization.designation}
                          onChange={(e) => handleInputChange('designation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-black/70 mb-1">Email Address*</label>
                      <input
                        type="email"
                        required
                        value={formData.organization.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Mobile Number*</label>
                        <input
                          type="tel"
                          required
                          value={formData.organization.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Landline Number</label>
                        <input
                          type="tel"
                          value={formData.organization.landline}
                          onChange={(e) => handleInputChange('landline', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-black/70 mb-1">Street Address*</label>
                      <input
                        type="text"
                        required
                        value={formData.organization.streetAddress}
                        onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-black/70 mb-1">Apartment, suite, etc</label>
                      <input
                        type="text"
                        value={formData.organization.apartment}
                        onChange={(e) => handleInputChange('apartment', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">City*</label>
                        <input
                          type="text"
                          required
                          value={formData.organization.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">ZIP / Postal Code*</label>
                        <input
                          type="text"
                          required
                          value={formData.organization.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Select your state*</label>
                        <select
                          required
                          value={formData.organization.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">Select State</option>
                          {indianStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Country</label>
                        <input
                          type="text"
                          value={formData.organization.country}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Enter PAN Card Number*</label>
                        <input
                          type="text"
                          required
                          value={formData.organization.panCard}
                          onChange={(e) => handleInputChange('panCard', e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="ABCDE1234F"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-black/70 mb-1">Donation Amount* (INR)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={formData.organization.amount}
                          onChange={(e) => handleInputChange('amount', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Enter amount in INR"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 text-center">
                  <button
                    type="submit"
                    className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Proceed to Donate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-brand-black mb-2">Thank You!</h2>
                <p className="text-brand-black/60 max-w-2xl mx-auto">
                  Thank You for your interest to Contribute for the cause of Road Safety. You may use the below mentioned SRF Bank Account details for online/NEFT/RTGS/IMPS transfer of funds through your bank account
                </p>
              </div>

              {/* Bank Details */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-brand-black mb-4 text-center">SRF Account Details for Bank Transfer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-brand-black/60">Account name</p>
                    <p className="font-semibold text-brand-black">Safety Research Foundation</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-brand-black/60">Account No</p>
                    <p className="font-semibold text-brand-black">50200031767840</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-brand-black/60">Type of A/C</p>
                    <p className="font-semibold text-brand-black">Current Account</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-brand-black/60">Bank Name</p>
                    <p className="font-semibold text-brand-black">HDFC Bank Limited</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg md:col-span-2">
                    <p className="text-sm text-brand-black/60">IFSC Code</p>
                    <p className="font-semibold text-brand-black">HDFC0001068</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Transaction Receipt/Details may be sent to
                    <a href="mailto:donate@safetyresearchfoundation.org" className="text-blue-600 hover:text-blue-700 ml-1">
                      donate@safetyresearchfoundation.org
                    </a>
                  </p>
                </div>
              </div>

              {/* Alternative Payment Method */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-brand-black mb-3">Alternative Payment Method</h4>
                <p className="text-brand-black/70 mb-4">
                  You may also donate via <strong>Cheque/Demand Draft</strong> in favour of <strong>Safety Research Foundation</strong>,
                  Payable at Coimbatore and send to the following mailing address:
                </p>
                <div className="bg-white p-4 rounded-lg border">
                  <address className="text-brand-black/70 not-italic">
                    <strong>Safety Research Foundation</strong><br />
                    Office No.504, S.No.128,<br />
                    Seasons Business Square, Seasons Road,<br />
                    Sanewadi, Aundh,<br />
                    Pune – 411 007 Maharashtra.<br />
                    India.<br /><br />
                    <strong>Phone:</strong> +91 7030910122<br />
                    <strong>Phone:</strong> +91 7030910122
                  </address>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={backToDonateForm}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Back to Donate form
                </button>
                <button
                  onClick={closeDonationForm}
                  className="bg-gray-100 text-brand-black/70 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
