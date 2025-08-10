import { useState } from 'react';
import { OutlineButton } from './ui/outline-button';
import { QuoteModal } from './QuoteModal';
import { scrollToSection } from './ui/utils';

export function ContactSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  console.log('ContactSection rendered, isQuoteModalOpen:', isQuoteModalOpen);

  return (
    <>
      <section id='contact' className='py-140 px-6'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-6'>
            <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
              Ready to Get Started?
            </h2>
            <p className='text-xl text-black max-w-4xl mx-auto leading-relaxed'>
              Get an instant AI-powered quote, reach out to discuss your
              project, or start immediately. Choose the option that works best
              for you.
            </p>
          </div>

          {/* Contact Options */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <OutlineButton
              variant='mint'
              onClick={() => {
                const mailtoLink = `mailto:gpeterson3030@gmail.com?subject=AI Quote Request&body=Hi Geoff,%0D%0A%0D%0AI'm interested in getting an AI quote for my project.%0D%0A%0D%0AProject Description:%0D%0A%0D%0A%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`;
                window.location.href = mailtoLink;
              }}
              className='w-full py-4 text-lg'
            >
              Get AI Quote
            </OutlineButton>

            <OutlineButton
              variant='lavender'
              onClick={() => scrollToSection('codex-demo')}
              className='w-full py-4 text-lg'
            >
              Explore Codex
            </OutlineButton>

            <OutlineButton
              variant='coral'
              onClick={() => {
                const mailtoLink = `mailto:gpeterson3030@gmail.com?subject=Codex Integration Inquiry&body=Hi Geoff,%0D%0A%0D%0AI'd like to discuss integrating Codex automation into my business processes.%0D%0A%0D%0ACurrent Systems:%0D%0A%0D%0A%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`;
                window.location.href = mailtoLink;
              }}
              className='w-full py-4 text-lg'
            >
              Discuss Codex
            </OutlineButton>
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
