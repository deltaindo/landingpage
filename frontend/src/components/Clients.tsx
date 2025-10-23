"use client";

const Clients = () => {
  const clients = Array(12).fill("Client Logo");

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">Dipercaya Oleh</h2>
          <p className="text-lg text-gray-600">
            Melayani BUMN, instansi pemerintah, dan perusahaan swasta di seluruh
            Indonesia
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-12">
            {clients.concat(clients).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-400 font-semibold"
              >
                Logo {(index % 12) + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
