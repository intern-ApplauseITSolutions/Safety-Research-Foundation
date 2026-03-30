import { Microscope } from 'lucide-react';
import jpLogo from '../../../assets/images/partners/JP logo.png';
import hummingbird from '../../../assets/images/partners/Hummingbird-Communications.jpeg';
import hdTechno from '../../../assets/images/partners/hd-techno-system.jpg';

const partners = [
  { image: jpLogo, name: 'JP Research India Pvt. Ltd. (JPRI)' },
  { image: hummingbird, name: 'Hummingbird Communications' },
  { image: hdTechno, name: 'HD Techno System' },
];

export default function TechnicalExpertise() {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
              <Microscope className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Our Technical Expertise
              </h2>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>
        </div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-8 w-full"
            >
              <div className="w-full flex items-center justify-center mb-6 px-4">
                <img
                  src={partner.image}
                  alt={partner.name}
                  style={{ width: '100%', height: '120px', objectFit: 'contain' }}
                />
              </div>
              <p className="text-center text-gray-800 font-semibold text-base">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
