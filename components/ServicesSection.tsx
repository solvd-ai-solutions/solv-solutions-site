import { OutlineCard, OutlineCardContent } from './ui/outline-card';
import { SectionDivider } from './SectionDivider';
import { serviceCategories } from '../lib/services';

const CATEGORY_COLORS = ['mint', 'coral', 'lavender'] as const;

export function ServicesSection() {
  return (
    <section id='services' className='py-16 px-6'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-black mb-4'>
            Services & Capabilities
          </h2>
          <p className='text-xl text-black max-w-3xl mx-auto leading-relaxed'>
            From full AI adoption strategy to the tools that make it stick —
            here&apos;s what we do.
          </p>
        </div>

        {serviceCategories.map((category, categoryIndex) => {
          const color = CATEGORY_COLORS[categoryIndex % CATEGORY_COLORS.length];
          return (
            <div key={category.name} className='mb-12 last:mb-0'>
              <h3 className='text-2xl font-semibold text-black mb-6'>
                {category.name}
              </h3>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {category.items.map(item => (
                  <OutlineCard key={item.title} hover accentColor={color}>
                    <OutlineCardContent className='p-5'>
                      <h4 className='font-semibold text-black mb-2 text-lg'>
                        {item.title}
                      </h4>
                      <p className='text-sm text-black leading-relaxed'>
                        {item.description}
                      </p>
                    </OutlineCardContent>
                  </OutlineCard>
                ))}
              </div>
              {categoryIndex < serviceCategories.length - 1 && (
                <div className='mt-12'>
                  <SectionDivider
                    pattern={categoryIndex === 0 ? 'dots' : 'diagonal'}
                    color={
                      CATEGORY_COLORS[
                        (categoryIndex + 1) % CATEGORY_COLORS.length
                      ]
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
