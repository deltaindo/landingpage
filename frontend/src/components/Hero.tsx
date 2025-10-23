"use client";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="beranda"
      className="relative h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/hero-team.jpg')`,
        }}
      >
        {/* Placeholder gradient if no image */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Trusted for Safety,
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Guided by Expertise
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;
