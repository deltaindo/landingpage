"use client";

const Business = () => {
  const businesses = [
    { name: "Logo Ipsum", icon: "🎯" },
    { name: "Logo Ipsum", icon: "⚡" },
    { name: "Logo Ipsum", icon: "🔧" },
    { name: "Logo Ipsum", icon: "💼" },
    { name: "Logo Ipsum", icon: "🏢" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Our Business</h2>
        </div>

        {/* Business Logos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {businesses.map((business, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 hover:bg-gray-50 rounded-xl transition group"
            >
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition">
                {business.icon}
              </div>
              <p className="font-bold text-dark">{business.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Business;
