import { OutlineCard, OutlineCardContent } from "./ui/outline-card";
import { OutlineButton } from "./ui/outline-button";
import { Hammer, Heart, ArrowRight } from "lucide-react";

export function FeaturesGrid() {
  const scrollToDemo = (demoId: string) => {
    const element = document.getElementById(demoId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="demos" className="py-140 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            See Our AI Apps in Action
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Explore real examples of custom AI applications we&apos;ve built. 
            Each one is tailored to solve specific problems with intelligent automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <OutlineCard hover accentColor="coral">
            <OutlineCardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-coral rounded-lg p-3 outline-coral" style={{ outline: '2px solid var(--color-coral)', outlineOffset: '0' }}>
                  <Hammer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-black">Cut & Order Manager</h3>
              </div>
              
              <p className="text-lg text-black mb-6 leading-relaxed">
                Streamline your hardware store&apos;s custom cutting service. Calculate precise costs, 
                track jobs with QR codes, and automatically manage inventory with smart reorder alerts.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-coral"></div>
                  Custom pricing with labor & waste calculations
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-coral"></div>
                  QR-coded job tickets for easy tracking
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-coral"></div>
                  Real-time stock alerts & reorder automation
                </div>
              </div>

              <OutlineButton 
                variant="coral"
                onClick={() => window.open('https://cut-order-manager-git-main-geoff-petersons-projects.vercel.app', '_blank', 'noopener,noreferrer')}
                className="w-full flex items-center justify-center gap-3 group py-3 text-lg"
              >
                View Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </OutlineButton>
            </OutlineCardContent>
          </OutlineCard>

          <OutlineCard hover accentColor="mint">
            <OutlineCardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-mint rounded-lg p-3 outline-mint" style={{ outline: '2px solid var(--color-mint)', outlineOffset: '0' }}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-black">Pet Bio Generator</h3>
              </div>
              
              <p className="text-lg text-black mb-6 leading-relaxed">
                Transform pet adoption listings in minutes. Upload photos, add keywords, and let AI create 
                compelling adoption bios with formatted cards ready for web or print.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-mint"></div>
                  AI-powered photo analysis & descriptions
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-mint"></div>
                  Heartwarming, adoption-focused copy
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-mint"></div>
                  Multi-format export (PNG, PDF, HTML)
                </div>
              </div>

              <OutlineButton 
                variant="mint"
                onClick={() => scrollToDemo('pet-bio-demo')}
                className="w-full flex items-center justify-center gap-3 group py-3 text-lg"
              >
                View Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </OutlineButton>
            </OutlineCardContent>
          </OutlineCard>
        </div>
      </div>
    </section>
  );
}