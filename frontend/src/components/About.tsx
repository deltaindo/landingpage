// src/components/About.tsx
"use client";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "Pf98Ui1ejPM"; // YouTube Video ID

  return (
    <section id="tentang" className="py-16 bg-white">
      {/* Unified container: small, consistent left gutter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title (stick to left) */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">
            Tentang Kami
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mt-1">
            About Us
          </h2>
        </div>

        {/* 12-col grid, stable visual ratio: 7/12 (video) : 5/12 (stats) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Video */}
          <div className="lg:col-span-7">
            <div className="relative w-full overflow-hidden rounded-xl shadow-lg bg-black">
              {/* Custom aspect ratio ~ 9:5 */}
              <div className="relative w-full aspect-[9/5]">
                {isPlaying ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title="About Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {/* Poster placeholder — replace with your thumbnail */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                    {/* Play button */}
                    <button
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play video"
                      className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 bg-white text-primary rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105"
                      style={{ width: "5rem", height: "5rem" }}
                    >
                      <FaPlay className="ml-1 text-2xl" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Stats/Copy */}
          <div className="lg:col-span-5">
            <div className="space-y-8">
              {/* Since */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-3xl font-bold text-dark mb-2">Sejak</h3>
                <p className="text-gray-700 leading-relaxed">
                  Berdiri sejak <span className="font-semibold">2001</span>{" "}
                  berkomitmen membangun kemajuan industri secara berkelanjutan.
                </p>
              </div>

              {/* Clients */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-3xl font-bold text-dark mb-2">Klien</h3>
                <p className="text-gray-700 leading-relaxed">
                  Dipercaya oleh{" "}
                  <span className="font-semibold">lebih dari 1,100</span>{" "}
                  perusahaan di seluruh Indonesia dalam menghadirkan solusi HR
                  dan keselamatan yang ahli.
                </p>
              </div>

              {/* CTA (optional, aligns left) 
              <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Get a Quote <span className="-mt-0.5">→</span>
              </button>
              */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
