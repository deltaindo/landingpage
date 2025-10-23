"use client";

const SafetyServices = () => {
  const services = [
    {
      title: "Process Construction",
      subtitle: "Mechanical (M&E)",
      image: "/service1.jpg",
      icon: "⚙️",
    },
    {
      title: "Radiation Prevention",
      subtitle: "Environmental Management",
      image: "/service2.jpg",
      icon: "🔥",
    },
    {
      title: "Risk Management",
      subtitle: "Safety Planning",
      image: "/service3.jpg",
      icon: "👷",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-dark mb-2">
              Our Safety & Services
            </h2>
            <p className="text-gray-600">Get Info</p>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            View More
          </button>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
                {/* Placeholder - replace with actual images */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-8xl opacity-30">
                  {service.icon}
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-blue-200">{service.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyServices;
