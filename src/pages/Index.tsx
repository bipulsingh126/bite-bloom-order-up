
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfiniteFoodGrid from "@/components/InfiniteFoodGrid";
import { NavbarThemeToggle } from "@/components/NavbarThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen transition-colors">
      <Navbar />
      <NavbarThemeToggle />
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Menu Items</h2>
        <InfiniteFoodGrid />
      </div>
    </div>
  );
};

export default Index;
