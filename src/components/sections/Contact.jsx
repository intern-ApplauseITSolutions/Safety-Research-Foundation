import React from 'react';

export default function Contact() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <p>📧 Email: info@roadsafety.org</p>
                <p>📞 Phone: +91 98765 43210</p>
                <p>🏢 Address: 123 Safety Street, Pune, Maharashtra, India</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-dashed border-brand-black hover:border-primary hover:shadow-xl transition-all duration-300 h-full">
              <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows="4" 
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
