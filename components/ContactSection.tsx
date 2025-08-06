import { useState } from "react";
import { OutlineCard, OutlineCardContent } from "./ui/outline-card";
import { OutlineButton } from "./ui/outline-button";
import { QuoteModal } from "./QuoteModal";

export function ContactSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  
  console.log('ContactSection rendered, isQuoteModalOpen:', isQuoteModalOpen);

  return (
    <>
      <section id="contact" className="py-140 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-black max-w-4xl mx-auto leading-relaxed">
              Get an instant AI-powered quote, reach out to discuss your project, or start immediately. 
              Choose the option that works best for you.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-8">
            <OutlineCard hover accentColor="mint">
              <OutlineCardContent className="text-center p-8">
                <div className="bg-mint rounded-lg p-4 w-fit mx-auto mb-6 outline-mint" style={{ outline: '2px solid var(--color-mint)', outlineOffset: '0' }}>
                  <div className="w-8 h-8 text-white text-2xl flex items-center justify-center">🧮</div>
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">Get Instant Quote</h3>
                <p className="text-lg text-black mb-6 leading-relaxed">
                  Tell our AI about your project and get an accurate quote in under 5 minutes.
                </p>
                <OutlineButton 
                  variant="mint"
                  className="w-full py-3 text-lg"
                  onClick={() => {
                    console.log('Generate Quote button clicked');
                    setIsQuoteModalOpen(true);
                    console.log('Modal state set to true');
                  }}
                >
                  Generate Quote
                </OutlineButton>
              </OutlineCardContent>
            </OutlineCard>

            <OutlineCard hover accentColor="lavender">
              <OutlineCardContent className="text-center p-8">
                <div className="bg-lavender rounded-lg p-4 w-fit mx-auto mb-6 outline-lavender" style={{ outline: '2px solid var(--color-lavender)', outlineOffset: '0' }}>
                  <div className="w-8 h-8 text-white text-2xl flex items-center justify-center">💬</div>
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">Contact Us</h3>
                <p className="text-lg text-black mb-6 leading-relaxed">
                  Reach out via email or schedule a call to discuss your project requirements.
                </p>
                
                {/* Contact Buttons */}
                <div>
                  <OutlineButton 
                    variant="lavender"
                    className="w-full py-3 text-lg flex items-center justify-center gap-2 mb-6"
                    onClick={() => {
                      // Open Calendly in a new tab
                      if (typeof window !== 'undefined') {
                        window.open('https://calendly.com/gpeterson3030/30min', '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    📅
                    Book a Call
                  </OutlineButton>
                  <OutlineButton 
                    variant="primary"
                    className="w-full py-3 text-lg flex items-center justify-center gap-2 hover:outline-lavender"
                    onClick={(e) => {
                      e.preventDefault();
                      const emailBody = `Hi! I'm interested in discussing a custom AI solution.

Please include any details about your project requirements, timeline, and budget range.

Looking forward to hearing from you!`;
                      
                      // Try different approaches for email
                      try {
                        // Method 1: Direct window.location
                        window.location.href = `mailto:gpeterson3030@gmail.com?subject=New Project Inquiry&body=${encodeURIComponent(emailBody)}`;
                      } catch (error) {
                        console.error('Error opening email:', error);
                        // Method 2: Create temporary link and click it
                        const link = document.createElement('a');
                        link.href = `mailto:gpeterson3030@gmail.com?subject=New Project Inquiry&body=${encodeURIComponent(emailBody)}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }
                    }}
                  >
                    📧
                    Email Us
                  </OutlineButton>
                </div>
              </OutlineCardContent>
            </OutlineCard>

            <OutlineCard hover accentColor="coral">
              <OutlineCardContent className="text-center p-8">
                <div className="bg-coral rounded-lg p-4 w-fit mx-auto mb-6 outline-coral" style={{ outline: '2px solid var(--color-coral)', outlineOffset: '0' }}>
                  <div className="w-8 h-8 text-white text-2xl flex items-center justify-center">💳</div>
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">Start Now</h3>
                <p className="text-lg text-black mb-6 leading-relaxed">
                  Ready to begin? Pay securely and we&apos;ll start your project immediately.
                </p>
                
                {/* PayPal Integration */}
                <div className="w-full">
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" rel="noopener noreferrer" className="w-full">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" value="YOUR_ACTUAL_PAYPAL_BUTTON_ID_HERE" />
                    <OutlineButton 
                      variant="coral"
                      type="submit"
                      className="w-full py-3 text-lg"
                    >
                      Pay with PayPal
                    </OutlineButton>
                  </form>
                </div>
              </OutlineCardContent>
            </OutlineCard>
          </div>
        </div>
      </section>

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </>
  );
}