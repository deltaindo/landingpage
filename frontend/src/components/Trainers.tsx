"use client";

const Trainers = () => {
  const trainers = [
    {
      name: "R. Agil Agustin AM",
      title: "Senior Trainer",
      image: "/trainer1.jpg",
    },
    {
      name: "T. Surya Adi SE",
      title: "Lead Instructor",
      image: "/trainer2.jpg",
    },
    {
      name: "Imam Suhre MSME MT",
      title: "Technical Expert",
      image: "/trainer3.jpg",
    },
    {
      name: "T. Imam Tirsan SMTH",
      title: "Safety Specialist",
      image: "/trainer4.jpg",
    },
  ];

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Trainer</h2>
        </div>

        {/* Trainer Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="text-center">
              {/* Photo */}
              <div className="mb-6 mx-auto">
                <div className="w-48 h-64 bg-white rounded-2xl overflow-hidden shadow-xl mx-auto">
                  {/* Placeholder - replace with actual photos */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-600 text-6xl">
                    👤
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="text-white">
                <h3 className="font-bold text-lg mb-1">{trainer.name}</h3>
                <p className="text-blue-200 text-sm">{trainer.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Trainers;
