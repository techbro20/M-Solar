import React from "react";
import HeroSection from "../components/home/HeroSection";
import ProductCarousel from "../components/home/ProductCarousel";
import FeaturesSection from "../components/home/FeaturesSection";

const Home = () => {
  return (
    <div className="space-y-8">
      <HeroSection />
      <ProductCarousel />
      <FeaturesSection />
    </div>
  );
};

export default Home;
