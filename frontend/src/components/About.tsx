// src/components/About.tsx

"use client";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

export const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "Pf98Ui1ejPM"; // YouTube Video ID

  return (
    <section id="about" className="bg-gray-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12">
          {/* Left Column: Video Player (65% width) */}
          <div className="w-full lg:w-[65%]">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
              About Us
            </h2>
            <p className="text-gray-500 mb-6">Our stories</p>

            <div className="relative rounded-lg shadow-xl overflow-hidden">
              {/* Custom Aspect Ratio Container (approx 9:5) */}
              <div className="relative w-full" style={{ paddingTop: "55.6%" }}>
                {isPlaying ? (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    <img
                      src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                      alt="Delta Indonesia Company Profile"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-slate-900 bg-opacity-60 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110"
                        aria-label="Play video"
                      >
                        <FaPlay className="text-blue-600 text-2xl ml-1" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Stats (35% width) */}
          <div className="w-full lg:w-[35%] mt-12 lg:mt-0 lg:pl-10 flex flex-col justify-center">
            <div className="mb-12">
              <h3 className="text-5xl lg:text-6xl font-bold text-gray-800">
                Since
              </h3>
              <p className="mt-2 text-gray-600 max-w-sm">
                Established in <span className="font-semibold">2001</span> with
                a strong foundation in industrial development
              </p>
            </div>
            <div>
              <h3 className="text-5xl lg:text-6xl font-bold text-gray-800">
                Clients
              </h3>
              <p className="mt-2 text-gray-600 max-w-sm">
                Trusted by <span className="font-semibold">over 1,100</span>{" "}
                clients across Indonesia, providing expert HR and safety
                solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
