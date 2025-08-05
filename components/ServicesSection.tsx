import { OutlineCard, OutlineCardContent } from "./ui/outline-card";

export function ServicesSection() {
  return (
    <section id="services" className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto leading-relaxed">
            Select the perfect solution for your needs. From our growing library of pre-built apps 
            to enterprise-level custom implementations, we have options for every business size.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <OutlineCard hover accentColor="lavender" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-lavender text-white px-4 py-2 text-sm font-semibold">
              Coming Soon
            </div>
            <OutlineCardContent className="p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-lavender text-white px-3 py-2 rounded text-sm font-semibold outline-lavender" style={{ outline: '2px solid var(--color-lavender)', outlineOffset: '0' }}>
                  Monthly
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">AI App Library</h3>
              <p className="text-lg text-black mb-8 leading-relaxed">
                Access to our growing library of pre-built AI applications. 
                Perfect for common use cases with instant deployment.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-lavender"></div>
                  <span>50+ ready-to-use apps</span>
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-lavender"></div>
                  <span>Instant deployment</span>
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-lavender"></div>
                  <span>Regular updates</span>
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-lavender"></div>
                  <span>Priority support</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-black mb-2">$49/month</div>
              <div className="text-base text-black">Cancel anytime</div>
            </OutlineCardContent>
          </OutlineCard>

          <OutlineCard hover accentColor="mint">
            <OutlineCardContent className="p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-mint text-white px-3 py-2 rounded text-sm font-semibold outline-mint" style={{ outline: '2px solid var(--color-mint)', outlineOffset: '0' }}>
                  Enterprise
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4">Custom Solutions</h3>
              <p className="text-lg text-black mb-8 leading-relaxed">
                Large-scale AI implementations with dedicated support, 
                custom integrations, and ongoing maintenance.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-mint"></div>
                  <span>Dedicated developer</span>
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-mint"></div>
                  <span>Custom integrations</span>
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-mint"></div>
                  <span>Ongoing maintenance</span>
                </div>
                <div className="flex items-center gap-3 text-base text-black">
                  <div className="w-2 h-2 rounded-full bg-mint"></div>
                  <span>24/7 priority support</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-black mb-2">Custom Quote</div>
                              <div className="text-base text-black">Let&apos;s discuss your needs</div>
            </OutlineCardContent>
          </OutlineCard>
        </div>
      </div>
    </section>
  );
}