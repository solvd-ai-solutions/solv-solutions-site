import { OutlineCard, OutlineCardContent } from "./ui/outline-card";
import { OutlineButton } from "./ui/outline-button";
import { Hammer, Heart, QrCode, Printer, AlertTriangle, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DemoSections() {
  return (
    <>
      {/* Hardware Store Cut & Order Manager Demo */}
      <section id="cut-manager-demo" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-coral rounded-lg p-4 outline-coral" style={{ outline: '2px solid var(--color-coral)', outlineOffset: '0' }}>
                  <Hammer className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-black">Cut & Order Manager</h2>
              </div>
              
              <p className="text-xl text-black leading-relaxed">
                Eliminate manual calculations and inventory guesswork. This tablet-based system handles 
                your store&apos;s custom cutting workflow from quote to reorder, with built-in pricing logic 
                and real-time stock tracking.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-coral mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-black text-lg mb-2">Smart Pricing Engine</h4>
                    <p className="text-lg text-black leading-relaxed">Automatically calculates costs using your exact formula: material + labor + waste allowance + markup.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-coral mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-black text-lg mb-2">Job Tracking System</h4>
                    <p className="text-lg text-black leading-relaxed">Generate QR-coded tickets for each cut job, making it easy to track progress and fulfill orders.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-coral mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-black text-lg mb-2">Inventory Intelligence</h4>
                    <p className="text-lg text-black leading-relaxed">Monitor stock levels in real-time and get alerts when it&apos;s time to reorder popular materials.</p>
                  </div>
                </div>
              </div>

              <OutlineButton 
                variant="coral" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => {
                  // Link to the Cut & Order Manager demo
                  window.open('https://demo1.solvdaisolutions.com', '_blank', 'noopener,noreferrer');
                }}
              >
                Try It Now
              </OutlineButton>
            </div>

            <div className="relative">
              <OutlineCard className="shadow-lg">
                <OutlineCardContent className="p-0">
                  <div className="bg-coral p-8 text-white rounded-t" style={{ borderRadius: 'var(--radius) var(--radius) 0 0' }}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Hammer className="w-6 h-6" />
                        <span className="font-semibold text-lg">New Cut Order</span>
                      </div>
                      <span className="bg-white text-coral px-3 py-2 rounded font-semibold outline-white" style={{ outline: '2px solid white', outlineOffset: '0' }}>
                        Job #1247
                      </span>
                    </div>
                    <div className="text-base opacity-90">2x4 Pine Lumber - Custom Cut</div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-black text-lg">Cut Specifications</h4>
                        <div className="text-base text-black space-y-2">
                          <div>Material: 2x4 Pine</div>
                          <div>Length: 7.5 feet</div>
                          <div>Quantity: 12 pieces</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-black text-lg">Cost Breakdown</h4>
                        <div className="text-base text-black space-y-2">
                          <div>Material: $67.20</div>
                          <div>Labor: $15.00</div>
                          <div>Waste: $8.40</div>
                          <div className="font-semibold text-black border-t-2 border-black pt-2 text-lg">Total: $90.60</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white rounded-lg p-4 outline-primary" style={{ outline: '2px solid var(--color-black)', outlineOffset: '0' }}>
                      <div className="flex items-center gap-3">
                        <QrCode className="w-6 h-6 text-coral" />
                        <span className="text-base font-semibold text-black">Job Ticket Ready</span>
                      </div>
                      <OutlineButton size="sm" variant="coral" className="px-4 py-2">
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                      </OutlineButton>
                    </div>

                    <div className="bg-coral rounded-lg p-4 outline-coral" style={{ outline: '2px solid var(--color-coral)', outlineOffset: '0' }}>
                      <div className="flex items-center gap-3 text-white">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="text-base font-semibold">Stock Alert</span>
                      </div>
                      <div className="text-sm text-white mt-2 opacity-90">
                        2x4 Pine stock: 47 pieces remaining (reorder threshold: 50)
                      </div>
                    </div>
                  </div>
                </OutlineCardContent>
              </OutlineCard>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer between demos */}
      <div className="py-16 bg-white"></div>

      {/* Animal Shelter Pet Bio Generator Demo */}
      <section id="pet-bio-demo" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <OutlineCard className="shadow-lg">
                <OutlineCardContent className="p-0">
                  <div className="bg-mint p-8 text-white rounded-t" style={{ borderRadius: 'var(--radius) var(--radius) 0 0' }}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Heart className="w-6 h-6" />
                        <span className="font-semibold text-lg">Generated Bio</span>
                      </div>
                      <span className="bg-white text-mint px-3 py-2 rounded font-semibold outline-white" style={{ outline: '2px solid white', outlineOffset: '0' }}>
                        Ready for Review
                      </span>
                    </div>
                    <div className="text-base opacity-90">Golden Retriever Mix • 3 years old</div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="flex gap-6">
                      <div className="w-28 h-28 bg-coral rounded-lg flex items-center justify-center overflow-hidden outline-coral" style={{ outline: '2px solid var(--color-coral)', outlineOffset: '0' }}>
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face"
                          alt="Golden retriever mix"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <h3 className="font-semibold text-black text-xl">Meet Buddy! 🎾</h3>
                        <p className="text-base text-black leading-relaxed">
                          Buddy is a playful Golden Retriever mix who can&apos;t resist a tennis ball and loves making new friends. 
                          This gentle soul enjoys long walks, belly rubs, and would be perfect for an active family looking for a loyal companion.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-black text-lg">Key Details</h4>
                      <div className="grid grid-cols-2 gap-3 text-base text-black">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-mint"></div>
                          Good with kids
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-mint"></div>
                          House trained
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-mint"></div>
                          Loves fetch
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-mint"></div>
                          Medium energy
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <OutlineButton variant="primary" size="sm" className="flex-1 py-3">
                        Edit Bio
                      </OutlineButton>
                      <OutlineButton variant="mint" size="sm" className="flex-1 py-3">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </OutlineButton>
                    </div>
                  </div>
                </OutlineCardContent>
              </OutlineCard>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-mint rounded-lg p-4 outline-mint" style={{ outline: '2px solid var(--color-mint)', outlineOffset: '0' }}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-black">Pet Bio Generator</h2>
              </div>
              
              <p className="text-xl text-black leading-relaxed">
                Save hours on adoption listings while creating more compelling pet profiles. 
                Simply upload photos and add basic info—AI handles the rest, creating heartwarming 
                bios that help pets find their forever homes faster.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-mint mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-black text-lg mb-2">Intelligent Photo Analysis</h4>
                    <p className="text-lg text-black leading-relaxed">AI examines pet photos to identify key features and personality traits that make each animal unique.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-mint mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-black text-lg mb-2">Adoption-Focused Copy</h4>
                    <p className="text-lg text-black leading-relaxed">Crafts compelling descriptions that highlight each pet&apos;s best qualities and ideal home situation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-mint mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-black text-lg mb-2">Multi-Format Export</h4>
                    <p className="text-lg text-black leading-relaxed">Export as web-ready cards, printable flyers, or social media posts—all beautifully formatted.</p>
                  </div>
                </div>
              </div>

              <OutlineButton 
                variant="mint" 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => {
                  // Always use the canonical www domain for consistency
                  window.open('https://www.solvdaisolutions.com/demos/pet-bio-generator', '_blank', 'noopener,noreferrer');
                }}
              >
                Try It Now
              </OutlineButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}