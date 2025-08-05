import React from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { ContactSection } from "./components/ContactSection";
import { SectionDivider } from "./components/SectionDivider";

// Debug logs:
console.log("🔍 Navigation:", Navigation);
console.log("🔍 HeroSection:", HeroSection);
console.log("🔍 AboutSection:", AboutSection);
console.log("🔍 FeaturesGrid:", FeaturesGrid);
console.log("🔍 SectionDivider:", SectionDivider);
console.log("🔍 ContactSection:", ContactSection);

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Geometric Divider */}
      <SectionDivider pattern="diagonal" color="mint" />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Geometric Divider */}
      <SectionDivider pattern="triangles" color="coral" />
      
      {/* Features Grid - "See Our AI Apps in Action" */}
      <FeaturesGrid />
      
      {/* Geometric Divider */}
      <SectionDivider pattern="waves" color="lavender" />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Spacer */}
      <div className="py-8"></div>
      
      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 outline-white" style={{ outline: '2px solid white', outlineOffset: '0' }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img 
                src="/Assets/white_on_black_logo.png"
                alt="Solvd: AI Solutions" 
                style={{ width: '150px', height: 'auto' }}
              />
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#about" className="text-white hover:text-lavender transition-colors font-medium px-3 py-2">
                About
              </a>
              <a href="#contact" className="text-white hover:text-lavender transition-colors font-medium px-3 py-2">
                Contact
              </a>
            </div>
          </div>
          
          <div className="border-t-2 border-white mt-6 pt-4 text-center text-white">
            <p className="text-lg">&copy; 2024 Solvd: AI Solutions. All rights reserved. Custom AI solutions for every business need.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}