import { Microscope, TrendingUp, Users, CheckCircle, ExternalLink } from 'lucide-react';

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

        {/* JP Research India Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-dashed border-brand-black hover:border-primary transition-all duration-300 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-brand-green p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  JP Research India Pvt. Ltd. (JPRI)
                </h3>
                <a 
                  href="https://www.jpri.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors duration-200 text-sm sm:text-base"
                >
                  <span>www.jpri.in</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <Microscope className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                SRF leverages technical expertise of <span className="font-semibold text-primary">JP Research India Pvt Ltd (JPRI)</span>, a research organisation with core expertise in scientific crash investigations, crash reconstructions, injury analysis and road safety assessments/audits.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                JPRI since 2011 has been instrumental in setting up of <span className="font-semibold text-primary">Road Accident Sampling System, India (RASSI)</span> a one of its kind initiatives to collect crash data across multiple locations and analysis for India specific conditions.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                With highly trained and motivated team of captive researchers, investigating experience of over 9000 crashes, crash & fire forensics, black spot assessments and presence across multiple locations, JPRI extends full technical knowhow and support to SRF on various road safety initiatives/projects.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border-l-4 border-primary">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Since 2011</h4>
                    <p className="text-sm text-gray-600">Leading crash data research</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-green/10 to-brand-green/5 rounded-xl p-4 border-l-4 border-brand-green">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">9000+ Crashes</h4>
                    <p className="text-sm text-gray-600">Investigated and analyzed</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-4 border-l-4 border-secondary sm:col-span-2 lg:col-span-1">
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Expert Team</h4>
                    <p className="text-sm text-gray-600">Highly trained researchers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Expertise Badge */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Core Expertise</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-white text-primary border border-primary rounded-full text-sm font-medium">
                  Scientific Crash Investigations
                </span>
                <span className="px-3 py-1 bg-white text-primary border border-primary rounded-full text-sm font-medium">
                  Crash Reconstructions
                </span>
                <span className="px-3 py-1 bg-white text-primary border border-primary rounded-full text-sm font-medium">
                  Injury Analysis
                </span>
                <span className="px-3 py-1 bg-white text-primary border border-primary rounded-full text-sm font-medium">
                  Road Safety Assessments
                </span>
                <span className="px-3 py-1 bg-white text-primary border border-primary rounded-full text-sm font-medium">
                  Safety Audits
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
