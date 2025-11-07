import React from 'react';
import { Heart, CheckCircle, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function DonatePage() {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const whyDonate = [
    "100% of your donation goes directly to road safety initiatives",
    "Tax benefits under Section 80G of Income Tax Act",
    "Transparent reporting on fund utilization",
    "Make a measurable impact on road safety",
    "Join a community of change-makers",
    "Receive regular updates on our work"
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-brand-green to-secondary py-20 sm:py-24 md:py-28 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-bounce">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-semibold text-sm">Make a Difference Today</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Donation Saves Lives
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Every contribution helps us create safer roads, educate communities, and prevent accidents. 
              Join us in our mission to make Indian roads safer for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-white hover:bg-gray-50 text-primary px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3">
                <Heart className="w-6 h-6 fill-current" />
                Donate Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-3">
                Learn More
                <TrendingUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white border-b-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-primary mb-2">100K+</div>
              <div className="text-sm text-gray-600 font-medium">Students Reached</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-brand-green mb-2">200+</div>
              <div className="text-sm text-gray-600 font-medium">Schools Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-secondary mb-2">1500+</div>
              <div className="text-sm text-gray-600 font-medium">Drivers Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-orange-500 mb-2">2500+</div>
              <div className="text-sm text-gray-600 font-medium">Parents Engaged</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Donate to Safety Research Foundation?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Your contribution directly supports evidence-based road safety initiatives that create lasting change. 
                We work with communities, schools, and government agencies to build a culture of road safety across India.
              </p>
              <div className="space-y-4">
                {whyDonate.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-brand-green/10 rounded-2xl p-8 border-2 border-dashed border-primary">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Donate</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {['₹1,000', '₹2,500', '₹5,000', '₹10,000'].map((amount) => (
                  <button
                    key={amount}
                    className="bg-white hover:bg-primary hover:text-white border-2 border-gray-200 hover:border-primary py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-lg"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-primary to-brand-green hover:from-brand-green hover:to-primary text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 fill-current" />
                Proceed to Donate
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-brand-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Every Contribution Counts
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            Whether it's ₹500 or ₹50,000, your donation helps us save lives and create safer roads. 
            Join hundreds of donors who believe in our mission.
          </p>
          <button className="bg-white hover:bg-gray-50 text-primary px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center gap-3">
            <Heart className="w-6 h-6 fill-current" />
            Make Your Donation Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
