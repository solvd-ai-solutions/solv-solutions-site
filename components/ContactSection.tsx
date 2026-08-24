import { useState } from 'react';
import { OutlineButton } from './ui/outline-button';
import { QuoteModal } from './QuoteModal';
import { scrollToSection } from './ui/utils';

const CONTACT_EMAIL = 'geoff@persono.app';

export function ContactSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <section id='contact' className='py-140 px-6'>
        <div className='container mx-auto max-w-6xl'>
          <div className='text-center mb-6'>
            <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
              Ready to Get Started?
            </h2>
            <p className='text-xl text-black max-w-4xl mx-auto leading-relaxed'>
              Get an instant AI-powered quote or reach out to talk through your
              project. Pricing and scope get worked out together, not on this
              page.
            </p>
          </div>

          {/* Contact Options */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <OutlineButton
              variant='mint'
              onClick={() => {
                const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=AI Quote Request&body=Hi Geoff,%0D%0A%0D%0AI'm interested in getting an AI quote for my project.%0D%0A%0D%0AProject Description:%0D%0A%0D%0A%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`;
                window.location.href = mailtoLink;
              }}
              className='w-full py-4 text-lg'
            >
              Get AI Quote
            </OutlineButton>

            <OutlineButton
              variant='lavender'
              onClick={() => scrollToSection('services')}
              className='w-full py-4 text-lg'
            >
              Explore Services
            </OutlineButton>

            <OutlineButton
              variant='coral'
              onClick={() => {
                const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=Project Inquiry&body=Hi Geoff,%0D%0A%0D%0AI'd like to talk through a project.%0D%0A%0D%0ACurrent Systems:%0D%0A%0D%0A%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`;
                window.location.href = mailtoLink;
              }}
              className='w-full py-4 text-lg'
            >
              Discuss a Project
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
