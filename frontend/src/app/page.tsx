"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MediaInfo from "@/components/MediaInfo";
import Services from "@/components/Services";
import Training from "@/components/Training";
import Trainers from "@/components/Trainers";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/old CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <MediaInfo />
      <Services />
      <Training />
      <Trainers />
      <Clients />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />

      {/* Floating WhatsApp Button with Team Menu */}
      <FloatingWhatsApp />
    </main>
  );
}
