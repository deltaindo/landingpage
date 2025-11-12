"use client";

const WhyUs = () => {
  const benefits = [
    {
      icon: "✓",
      title: "Terakreditasi Resmi",
      description:
        "Ditunjuk dan diakui oleh Kementerian Ketenagakerjaan RI dan BNSP",
    },
    {
      icon: "👨‍🏫",
      title: "Instruktur Profesional",
      description: "Instruktur bersertifikat dan berpengalaman di bidangnya",
    },
    {
      icon: "🏢",
      title: "Fasilitas Modern",
      description:
        "Ruang pelatihan lengkap dengan alat praktik standar industri",
    },
    {
      icon: "🔄",
      title: "Fleksibel",
      description:
        "Public training dan in-house training sesuai kebutuhan perusahaan",
    },
    {
      icon: "💬",
      title: "Konsultasi Gratis",
      description: "Konsultasi program pelatihan dan sertifikasi tanpa biaya",
    },
    {
      icon: "🏆",
      title: "Terpercaya",
      description:
        "Dipercaya oleh BUMN, instansi pemerintah, dan perusahaan swasta",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">
            Mengapa Memilih Delta Indonesia?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Keunggulan yang membuat kami menjadi pilihan terbaik untuk pelatihan
            K3
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl hover:bg-gray-50 transition group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
