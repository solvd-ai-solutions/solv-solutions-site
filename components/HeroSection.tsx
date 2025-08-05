import { OutlineButton } from "./ui/outline-button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDemos = () => {
    const element = document.getElementById('demos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative px-6 overflow-hidden pt-280 pb-140">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-3">
        <div className="h-full w-full"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Main Headline - Much Bigger */}
        <div className="mb-4">
          <h1 className="font-bold text-black leading-tight max-w-5xl mx-auto" 
              style={{ fontSize: '64px', lineHeight: '1.1' }}>
            <span className="text-lavender">AI-Powered Micro-Tools</span><br />
            for your Small Business Needs
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl text-black mb-6 max-w-4xl mx-auto leading-relaxed">
          Get custom AI micro-apps built for your specific needs. From productivity tools 
          to business solutions, we create intelligent applications that work exactly how you want them to.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
          <OutlineButton 
            variant="lavender"
            size="lg"
            onClick={scrollToContact}
            className="flex items-center gap-3 px-8 py-4 text-lg group"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </OutlineButton>
          
          <OutlineButton 
            variant="primary"
            size="lg"
            onClick={scrollToDemos}
            className="hover:outline-coral px-8 py-4 text-lg"
          >
            View Demos
          </OutlineButton>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 outline-primary" 
               style={{ outline: '2px solid var(--color-black)', outlineOffset: '0' }}>
            <div className="text-3xl font-bold text-black mb-2">48hr</div>
            <div className="text-lg text-black font-medium">Average Delivery</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 outline-primary hover:outline-lavender transition-all" 
               style={{ outline: '2px solid var(--color-black)', outlineOffset: '0' }}>
            <div className="text-3xl font-bold text-black mb-2">100%</div>
            <div className="text-lg text-black font-medium">Custom Built</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 outline-primary" 
               style={{ outline: '2px solid var(--color-black)', outlineOffset: '0' }}>
            <div className="text-3xl font-bold text-black mb-2">∞</div>
            <div className="text-lg text-black font-medium">Possibilities</div>
          </div>
        </div>
      </div>
    </section>
  );
}