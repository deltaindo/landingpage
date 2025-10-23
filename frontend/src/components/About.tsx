"use client";

import { FaPlay } from "react-icons/fa";

const About = () => {
  return (
    <section id="tentang" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-dark mb-2">About Us</h2>
          <p className="text-gray-600">Our details</p>
        </div>

        {/* Content with Heading */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-dark leading-relaxed max-w-3xl"></h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Video Player */}
          <div className="relative">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer">
              {/* Video Thumbnail - Replace with actual video */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              <button className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <FaPlay className="text-primary text-2xl ml-1" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-4xl font-bold text-dark mb-2">Since</h3>
              <div className="text-xl text-gray-700">
                <p>
                  Established in <span className="font-bold">2001</span> with
                </p>
                <p>a strong foundation in</p>
                <p>industrial development</p>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-4xl font-bold text-dark mb-2">Clients</h3>
              <div className="text-xl text-gray-700">
                <p>
                  Trusted by <span className="font-bold">over 1,000</span>
                </p>
                <p>clients across Indonesia,</p>
                <p>providing support for size</p>
                <p>safety analysis.</p>
              </div>
            </div>

            <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
              <span>Get a Quote</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
