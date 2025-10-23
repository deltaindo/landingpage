"use client";

const CTA = () => {
  const scrollToContact = () => {
    const element = document.getElementById("kontak");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Siap Tingkatkan Kompetensi K3 Tim Anda?
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
          Hubungi kami untuk konsultasi gratis dan jadwal pelatihan terbaru
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToContact}
            className="bg-secondary text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition transform hover:scale-105 shadow-lg"
          >
            Lihat Jadwal Pelatihan
          </button>
          <button
            onClick={scrollToContact}
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
          >
            Konsultasi Gratis
          </button>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-4xl mb-2">📞</div>
            <h3 className="font-bold mb-2">Telepon</h3>
            <p className="text-blue-100">+62 21 8888 9999</p>
          </div>
          <div>
            <div className="text-4xl mb-2">📱</div>
            <h3 className="font-bold mb-2">WhatsApp</h3>
            <p className="text-blue-100">+62 812 3456 7890</p>
          </div>
          <div>
            <div className="text-4xl mb-2">📧</div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-blue-100">info@deltaindo.co.id</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
