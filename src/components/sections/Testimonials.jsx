import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);
  const testimonials = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      role: "Traffic Police Commissioner, Mumbai",
      rating: 5,
      text: "The Safety Research Foundation has been instrumental in transforming road safety awareness in our city. Their innovative training programs and community engagement initiatives have significantly reduced accident rates."
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "School Principal, Delhi Public School",
      rating: 5,
      text: "We partnered with Safety Research Foundation for student road safety workshops, and the impact has been remarkable. Students are now more aware of traffic rules and safe practices."
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Commercial Vehicle Driver",
      rating: 5,
      text: "As a professional driver for 15 years, I thought I knew everything about road safety. The advanced driving course by SRF opened my eyes to many aspects I had overlooked. Their training has made me a more responsible and safer driver."
    },
    {
      id: 4,
      name: "Sneha Desai",
      role: "Corporate HR Manager, Tech Solutions Ltd",
      rating: 5,
      text: "We organized a road safety awareness program for our employees through Safety Research Foundation. The session was incredibly informative and well-structured. Our employees appreciated the practical tips and real-life examples."
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Two-Wheeler Enthusiast & Blogger",
      rating: 5,
      text: "The two-wheeler safety campaign by SRF is a game-changer. Their focus on helmet awareness and defensive riding techniques has helped thousands of riders like me. I now promote their initiatives on my blog."
    },
    {
      id: 6,
      name: "Meera Reddy",
      role: "NGO Director, Child Safety Initiative",
      rating: 5,
      text: "Collaborating with Safety Research Foundation has been a wonderful experience. Their expertise in road safety education for children is unmatched. The materials they provide are age-appropriate, engaging, and highly effective."
    },
    {
      id: 7,
      name: "Arjun Mehta",
      role: "Accident Survivor & Safety Advocate",
      rating: 5,
      text: "After my accident, I realized how important road safety education is. SRF helped me recover not just physically but mentally by involving me in their awareness campaigns. Now I actively participate in spreading road safety awareness."
    },
    {
      id: 8,
      name: "Kavita Iyer",
      role: "Community Leader, Bangalore",
      rating: 5,
      text: "The community outreach programs conducted by Safety Research Foundation have created a lasting impact in our neighborhood. Their approach is practical, culturally sensitive, and highly effective in changing behaviors."
    },
    {
      id: 9,
      name: "Rohit Malhotra",
      role: "Fleet Manager, Logistics Company",
      rating: 5,
      text: "We implemented SRF's fleet safety training program across our organization. The results have been outstanding - reduced accidents, lower insurance costs, and improved driver morale. Their training methodology is world-class."
    },
    {
      id: 10,
      name: "Anita Deshmukh",
      role: "Parent & PTA Member",
      rating: 5,
      text: "As a parent, road safety is always a concern. The workshops conducted by Safety Research Foundation at our school have given me peace of mind. My children now understand traffic rules and practice safe road behavior consistently."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Calculate visible testimonials (show 3 at a time on large screens)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-12 sm:py-14 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-center mb-10 sm:mb-12 md:mb-16 gap-4">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-primary min-w-[50px] max-w-[200px]"></div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary flex-shrink-0" strokeWidth={2} />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-black whitespace-nowrap">
              What People Say About Us
            </h2>
          </div>
          <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-primary/50 to-primary min-w-[50px] max-w-[200px]"></div>
        </div>
        <p className="text-center text-base sm:text-lg text-brand-black/70 max-w-2xl mx-auto mb-8">
          Hear from our partners, participants, and community members about their experience with Safety Research Foundation
        </p>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-primary group-hover:text-white transition-colors" size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-primary group-hover:text-white transition-colors" size={24} />
          </button>

          {/* Testimonials Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${(currentIndex % testimonials.length) * (100 / 3)}%)` }}
            >
              {/* Duplicate testimonials for infinite loop effect */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-dashed border-brand-black hover:border-primary h-full group">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start mb-4">
                      <Quote className="text-primary/20 group-hover:text-primary/40 transition-colors duration-300" size={40} />
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-primary fill-primary"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-brand-black/80 mb-6 leading-relaxed line-clamp-4">
                      "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-primary/20">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 group-hover:border-primary transition-colors flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-black group-hover:text-primary transition-colors">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-brand-black/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-primary'
                    : 'w-3 h-3 bg-gray-300 hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-brand-black/70 mb-4 text-base sm:text-lg">
            Want to share your experience with us?
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
