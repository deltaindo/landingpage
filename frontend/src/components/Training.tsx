"use client";

import { useState } from "react";

const Training = () => {
  const [activeTab, setActiveTab] = useState<"kemnaker" | "bnsp" | "migas">(
    "kemnaker"
  );

  const trainingPrograms = {
    kemnaker: [
      { name: "Ahli K3 Umum", duration: "12 Hari", cert: "Kemnaker RI" },
      { name: "K3 Listrik", duration: "6 Hari", cert: "Kemnaker RI" },
      { name: "K3 Kebakaran", duration: "5 Hari", cert: "Kemnaker RI" },
      { name: "Operator Forklift", duration: "3 Hari", cert: "Kemnaker RI" },
      {
        name: "K3 Elevator & Escalator",
        duration: "6 Hari",
        cert: "Kemnaker RI",
      },
      { name: "K3 Diesel", duration: "5 Hari", cert: "Kemnaker RI" },
    ],
    bnsp: [
      { name: "P3K (Pertolongan Pertama)", duration: "3 Hari", cert: "BNSP" },
      { name: "Scaffolding", duration: "3 Hari", cert: "BNSP" },
      { name: "Rigging", duration: "3 Hari", cert: "BNSP" },
      { name: "Teknisi Lift", duration: "5 Hari", cert: "BNSP" },
    ],
    migas: [
      { name: "K3 Migas", duration: "7 Hari", cert: "Migas" },
      { name: "Fire Safety Migas", duration: "5 Hari", cert: "Migas" },
    ],
  };

  return (
    <section id="pelatihan" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">
            Program Pelatihan K3
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berbagai program pelatihan tersertifikasi untuk meningkatkan
            kompetensi K3
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {(["kemnaker", "bnsp", "migas"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab === "kemnaker"
                ? "Kemnaker RI"
                : tab === "bnsp"
                ? "BNSP"
                : "Migas"}
            </button>
          ))}
        </div>

        {/* Training Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingPrograms[activeTab].map((training, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="bg-gradient-to-br from-primary to-blue-700 h-32 flex items-center justify-center">
                <span className="text-white text-4xl">🎓</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2">
                  {training.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>⏱️ {training.duration}</span>
                  <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    {training.cert}
                  </span>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition group-hover:scale-105 transform">
                  Daftar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
