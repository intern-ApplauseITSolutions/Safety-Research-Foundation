import { Target, Users, Shield, TrendingUp } from 'lucide-react';
import missionImage from '../../../assets/images/Child Safety Awarness 1.png';

export default function Mission() {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Our Mission
              </h2>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>
        </div>

        {/* Mission Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-dashed border-primary p-4">
                <img
                  src={missionImage}
                  alt="Child Safety Awareness"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Right Side - Mission Text */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-primary to-brand-green rounded-3xl shadow-2xl p-8 sm:p-10 border-4 border-dashed border-white">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Shield className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold text-sm">Building Safer Communities</span>
                </div>
                <p className="text-white/95 text-lg sm:text-xl leading-relaxed text-justify">
                  To equip children and youth with lifelong safe-road habits and empower communities to support them through awareness, safer infrastructure, and responsible mobility—ensuring today's learners become tomorrow's safety champions.
                </p>
              </div>

              {/* Mission Pillars */}
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1">Empower Youth</h4>
                      <p className="text-white/90 text-sm">Building lifelong safe-road habits in children and youth</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1">Safer Infrastructure</h4>
                      <p className="text-white/90 text-sm">Creating safer roads and environments for all</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/20">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1">Tomorrow's Champions</h4>
                      <p className="text-white/90 text-sm">Transforming today's learners into safety advocates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
