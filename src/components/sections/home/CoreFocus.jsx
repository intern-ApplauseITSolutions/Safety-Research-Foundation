import React from 'react';

export default function CoreFocus() {
    return (
        <section className="py-8 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                <div className="bg-gradient-to-r from-primary/10 via-brand-green/10 to-primary/10 rounded-3xl p-8 md:p-12 border-2 border-dashed border-primary/30">

                    {/* Heading Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            Safety Research Foundation
                        </h2>
                        <p className="text-gray-700 text-base md:text-lg">
                            Creating a culture of road safety through education, research, and community engagement
                        </p>
                    </div>

                    {/* Blue Content Box */}
                    <div className="bg-primary rounded-2xl p-8 shadow-lg max-w-5xl mx-auto">
                        <p className="text-white text-lg md:text-xl leading-relaxed text-center sm:text-left">
                            Our core focus is on empowering children and young road users to become responsible with road safety awareness. We work to strengthen road safety awareness, improve driver behaviour and support accident-prevention strategies backed by scientific evidence.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}
