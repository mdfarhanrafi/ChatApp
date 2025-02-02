"use client";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Features from "@/components/features";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
