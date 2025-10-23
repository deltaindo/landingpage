"use client";

const HappyClients = () => {
  const testimonials = [
    {
      text: "Lorem ipsum dolor sit amet consectetur. Condimentum urna at mattis tellus lobortis fusce. Quisque sit quam tortor maecenas justo integer amet pellentesque et. Duis pulvinar egestas fringilla est.",
      name: "John Doe",
      position: "CEO, Company",
      avatar: "👤",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur. Condimentum urna at mattis tellus lobortis fusce. Quisque sit quam tortor maecenas justo integer amet pellentesque et. Duis pulvinar egestas fringilla est.",
      name: "Jane Smith",
      position: "Manager, Corp",
      avatar: "👤",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">
            Our Happy Clients
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
            >
              <p className="text-gray-700 leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-dark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyClients;
