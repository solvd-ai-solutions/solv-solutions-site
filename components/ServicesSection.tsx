export function ServicesSection() {
  return (
    <section id='services' className='py-16 px-6'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
            Choose Your Plan
          </h2>
          <p className='text-xl text-black max-w-4xl mx-auto leading-relaxed'>
            Select the perfect solution for your needs. From our growing library
            of pre-built apps to enterprise-level custom implementations, we
            have options for every business size.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-mint'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Custom AI Applications
            </h3>
            <p className='text-gray-600'>
              Tailored AI solutions that solve your specific business challenges
              and streamline operations.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-lavender'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Codex Automation
            </h3>
            <p className='text-gray-600'>
              AI-driven workflow automation that connects your tools and
              processes for seamless operations.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-coral'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Process Optimization
            </h3>
            <p className='text-gray-600'>
              Streamline your workflows with intelligent automation and
              data-driven insights.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-mint'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Integration Services
            </h3>
            <p className='text-gray-600'>
              Connect your existing systems with Codex-powered automation for
              maximum efficiency.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-lavender'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              AI Training & Support
            </h3>
            <p className='text-gray-600'>
              Get your team up to speed with comprehensive training and ongoing
              support.
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-6 border-2 border-coral'>
            <h3 className='text-xl font-semibold text-gray-800 mb-3'>
              Maintenance & Updates
            </h3>
            <p className='text-gray-600'>
              Keep your AI solutions current with regular updates and proactive
              maintenance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
