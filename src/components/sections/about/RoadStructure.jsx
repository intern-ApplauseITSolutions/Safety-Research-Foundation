import React from 'react';
import { Construction, ShieldAlert, Wine, Gauge, Shield, TrafficCone } from 'lucide-react';

const RoadStructure = () => {
  const teams = [
    {
      id: 1,
      title: "Wear Helmets Always",
      description: "Saves lives in bike accidents — legal & lifesaving.",
      icon: ShieldAlert,
      iconColor: "bg-blue-500"
    },
    {
      id: 2,
      title: "No Drunk Driving",
      description: "Major cause of crashes — always avoid alcohol.",
      icon: Wine,
      iconColor: "bg-red-500"
    },
    {
      id: 3,
      title: "Follow Speed Limits",
      description: "Overspeed kills — slow down, stay safe.",
      icon: Gauge,
      iconColor: "bg-orange-500"
    },
    {
      id: 4,
      title: "Use Seat Belts",
      description: "Front or back — buckling up saves lives.",
      icon: Shield,
      iconColor: "bg-green-500"
    },
    {
      id: 5,
      title: "Obey Traffic Signals",
      description: "Red means stop — follow rules, prevent chaos.",
      icon: TrafficCone,
      iconColor: "bg-purple-500"
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes rotate-clockwise {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        @keyframes rotate-counter-clockwise {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes counter-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        
        .animate-rotate-clockwise {
          animation: rotate-clockwise 40s linear infinite;
        }
        
        .animate-rotate-counter-clockwise {
          animation: rotate-counter-clockwise 30s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-counter-rotate {
          animation: counter-rotate 40s linear infinite;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px) scale(1.02);
        }
        
        .center-glow {
          box-shadow: 0 0 40px 20px rgba(204, 68, 0, 0.3);
        }
      `}</style>
      
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header with Construction Logo - matching TwoWheelerOrg style */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"></div>
            <div className="mx-4 sm:mx-6 flex items-center gap-2 sm:gap-3">
              <Construction className="w-8 h-8 sm:w-10 sm:h-10 text-primary" strokeWidth={2} />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center">
                Road Safety Rules
              </h2>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-primary to-primary"></div>
          </div>

          {/* Subtitle with decorative elements */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 max-w-20 h-px bg-gradient-to-r from-transparent to-primary/30"></div>
              <div className="mx-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div className="flex-1 max-w-20 h-px bg-gradient-to-l from-transparent to-primary/30"></div>
            </div>
            <p className="text-lg text-gray-600 font-medium bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text">
              Essential safety rules everyone must follow to save lives on the road
            </p>
            <div className="flex items-center justify-center mt-3">
              <div className="flex-1 max-w-16 h-px bg-gradient-to-r from-transparent to-primary/20"></div>
              <div className="mx-2">
                <div className="w-1 h-1 bg-primary/60 rounded-full"></div>
              </div>
              <div className="flex-1 max-w-16 h-px bg-gradient-to-l from-transparent to-primary/20"></div>
            </div>
          </div>

          {/* Desktop Circular Layout */}
          <div className="hidden lg:block relative w-full max-w-6xl mx-auto">
            <div className="relative w-[800px] h-[800px] mx-auto">
              
              {/* Central Hub - Stationary */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary rounded-full flex items-center justify-center center-glow z-20">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SRF</span>
                  </div>
                </div>
              </div>

              {/* Outer Rotating Ring with Cards */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] animate-rotate-clockwise">
                {/* Team Cards */}
                {teams.map((team, index) => {
                  const angle = (index * 72) * (Math.PI / 180);
                  const radius = 300;
                  const x = 350 + Math.cos(angle) * radius - 140;
                  const y = 350 + Math.sin(angle) * radius - 90;

                  const Icon = team.icon;
                  return (
                    <div
                      key={team.id}
                      className="absolute w-72 h-44 card-hover animate-float animate-counter-rotate"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      <div className="bg-white rounded-xl shadow-2xl border-2 border-primary/30 p-6 h-full relative overflow-hidden">
                        {/* Background Accent */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                        
                        {/* Icon Badge */}
                        <div className={`absolute -top-3 -left-3 w-12 h-12 ${team.iconColor} text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                          <Icon size={24} />
                        </div>

                        <div className="flex flex-col h-full pt-4">
                          <h3 className="text-xl font-bold text-gray-800 text-center mb-3 leading-tight">
                            {team.title}
                          </h3>
                          <p className="text-sm text-gray-600 text-center leading-relaxed flex-grow">
                            {team.description}
                          </p>
                          
                          {/* Bottom Decorative Line */}
                          <div className="mt-3 pt-3 border-t border-primary/20">
                            <div className="w-16 h-1 bg-primary rounded-full mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Outer Ring */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border-4 border-primary border-dashed rounded-full opacity-30"></div>
              </div>

              {/* Middle Rotating Ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border-2 border-primary/70 border-dotted rounded-full opacity-40 animate-rotate-counter-clockwise"></div>

              {/* Inner Rotating Ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-3 border-primary/80 border-double rounded-full opacity-50 animate-rotate-clockwise" 
                   style={{ animationDuration: '25s' }}></div>

              {/* Connection Lines - Rotating with outer ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] animate-rotate-clockwise">
                {teams.map((team, index) => {
                  const angle = (index * 72) * (Math.PI / 180);
                  const startX = 350;
                  const startY = 350;
                  const endX = 350 + Math.cos(angle) * 300;
                  const endY = 350 + Math.sin(angle) * 300;
                  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                  const rotation = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

                  return (
                    <div
                      key={`line-${team.id}`}
                      className="absolute bg-gradient-to-r from-primary to-primary/70 h-0.5 opacity-40"
                      style={{
                        width: `${length}px`,
                        left: `${startX}px`,
                        top: `${startY}px`,
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: 'left center'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Responsive Version */}
          <div className="block lg:hidden mt-8">
            <div className="grid gap-8 md:grid-cols-2">
              {teams.map((team) => {
                const Icon = team.icon;
                return (
                  <div 
                    key={team.id} 
                    className="bg-white rounded-xl shadow-lg border-2 border-primary/30 p-6 card-hover relative overflow-hidden"
                  >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                    
                    {/* Icon Badge */}
                    <div className={`absolute -top-3 -left-3 w-12 h-12 ${team.iconColor} text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                      <Icon size={24} />
                    </div>

                    <div className="pt-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                        {team.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-center">
                        {team.description}
                      </p>
                      
                      {/* Bottom Decorative Line */}
                      <div className="mt-4 pt-3 border-t border-primary/20">
                        <div className="w-16 h-1 bg-primary rounded-full mx-auto"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Mobile Connection Visualization */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-full">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">All Rules Connected</span>
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadStructure;