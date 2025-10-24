"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa";

const About = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section id="tentang" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-dark mb-2">About Us</h2>
          <p className="text-gray-600 text-lg">Our stories</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Video Player */}
          <div className="relative">
            {!isVideoPlaying ? (
              <div
                onClick={handlePlayVideo}
                className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer relative"
              >
                {/* Video Thumbnail Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>

                {/* Play Button */}
                <button className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <FaPlay className="text-primary text-2xl ml-1" />
                </button>
              </div>
            ) : (
              <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/Pf98Ui1ejPM?autoplay=1"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Delta Indonesia Video"
                ></iframe>
              </div>
            )}
          </div>

          {/* Right Side - Stats with Vertical Line Separators */}
          <div className="space-y-0">
            {/* Since Block */}
            <div className="border-l-4 border-gray-300 pl-8 py-8">
              <h3 className="text-5xl font-bold text-dark mb-4">Since</h3>
              <div className="text-gray-700 text-lg leading-relaxed">
                <p>
                  Established in <span className="font-bold">2001</span> with
                </p>
                <p>a strong foundation in</p>
                <p>industrial development</p>
              </div>
            </div>

            {/* Clients Block */}
            <div className="border-l-4 border-gray-300 pl-8 py-8">
              <h3 className="text-5xl font-bold text-dark mb-4">Clients</h3>
              <div className="text-gray-700 text-lg leading-relaxed">
                <p>
                  Trusted by <span className="font-bold">over 1,100</span>
                </p>
                <p>clients across Indonesia,</p>
                <p>providing expert HR and</p>
                <p>safety solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
