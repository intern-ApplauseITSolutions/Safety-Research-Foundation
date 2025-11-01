import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
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

  // Handle responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 gap-2 sm:gap-3 md:gap-4 px-2">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-primary max-w-[50px] sm:max-w-[100px] md:max-w-[150px] lg:max-w-[200px]"></div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Quote className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-primary flex-shrink-0" strokeWidth={2} />
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-brand-black text-center leading-tight px-1 sm:px-0">
              What People Say About Us
            </h2>
          </div>
          <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-primary/50 to-primary max-w-[50px] sm:max-w-[100px] md:max-w-[150px] lg:max-w-[200px]"></div>
        </div>
        <p className="text-center text-sm sm:text-base md:text-lg text-brand-black/70 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
          Hear from our partners, participants, and community members about their experience with Safety Research Foundation
        </p>

        {/* Testimonials Carousel */}
        <div 
          className="relative px-8 md:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-primary hover:shadow-xl transition-all duration-300 hover:scale-110 group touch-manipulation active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-primary group-hover:text-white transition-colors w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-primary hover:shadow-xl transition-all duration-300 hover:scale-110 group touch-manipulation active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-primary group-hover:text-white transition-colors w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Testimonials Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${(currentIndex % testimonials.length) * (100 / slidesPerView)}%)` }}
            >
              {/* Duplicate testimonials for infinite loop effect */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3 md:px-4 mb-4 md:mb-0"
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 border-2 border-dashed border-brand-black hover:border-primary min-h-[280px] sm:min-h-[320px] md:min-h-[350px] group flex flex-col">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <Quote className="text-primary/20 group-hover:text-primary/40 transition-colors duration-300 w-8 h-8 sm:w-10 sm:h-10" />
                      <div className="flex gap-0.5 sm:gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="text-primary fill-primary w-3 h-3 sm:w-4 sm:h-4"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-brand-black/80 mb-4 sm:mb-5 md:mb-6 leading-relaxed text-sm sm:text-base line-clamp-4 sm:line-clamp-5 flex-grow">
                      "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-primary/20 mt-auto">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 border-2 border-primary/20 group-hover:border-primary transition-colors flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-sm sm:text-base md:text-lg">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-brand-black group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-brand-black/60 line-clamp-2">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 flex-wrap px-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full touch-manipulation ${
                  index === currentIndex
                    ? 'w-6 sm:w-8 h-2.5 sm:h-3 bg-primary'
                    : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-300 hover:bg-primary/50 active:bg-primary/70'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
          <p className="text-brand-black/70 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
            Want to share your experience with us?
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary hover:bg-primary/90 active:bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm sm:text-base touch-manipulation"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
