import { useState } from "react";
import { OutlineCard, OutlineCardContent } from "./ui/outline-card";
import { OutlineButton } from "./ui/outline-button";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  console.log('QuoteModal rendered, isOpen:', isOpen);
  
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quote, setQuote] = useState<{
    price: number;
    deliveryDays: number;
    breakdown: {
      basePrice: number;
      complexityMultiplier: number;
      featuresMultiplier: number;
      timelineMultiplier: number;
      integrationCost: number;
    };
    features: string[];
    confidence: number;
  } | null>(null);
  const [formData, setFormData] = useState({
    projectType: '',
    description: '',
    features: [] as string[],
    otherFeatures: '',
    timeline: '',
    budget: '',
    complexity: '',
    integrations: '',
    userCount: '',
    contactInfo: {
      name: '',
      email: '',
      company: ''
    }
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const generateQuote = async () => {
    const startTime = Date.now();
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectType: formData.projectType,
          description: formData.description,
          features: formData.features,
          timeline: formData.timeline,
          budget: formData.budget,
          complexity: formData.complexity,
          integrations: formData.integrations,
          userCount: formData.userCount
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quote');
      }

      const quoteData = await response.json();
      console.log('API Response:', quoteData);
      
      // Validate the API response
      const basePrice = 300;
      const complexityMultiplier = quoteData.breakdown.complexityMultiplier;
      const featuresMultiplier = quoteData.breakdown.featuresMultiplier;
      const timelineMultiplier = quoteData.breakdown.timelineMultiplier;
      const integrationCost = quoteData.breakdown.integrationCost;
      
      // Validate the API response but don't override unless there's a major discrepancy
      const calculatedPrice = Math.round((basePrice * complexityMultiplier * featuresMultiplier * timelineMultiplier) + integrationCost);
      console.log('API Response:', quoteData);
      console.log('Calculated price:', calculatedPrice, 'API price:', quoteData.price);
      console.log('Integration cost from API:', integrationCost);
      
      // Only override if there's a major discrepancy (more than 20% difference)
      if (Math.abs(calculatedPrice - quoteData.price) > (quoteData.price * 0.2)) {
        quoteData.price = calculatedPrice;
        console.log('Using calculated price due to major discrepancy:', calculatedPrice);
      }
      
      setQuote(quoteData);
    } catch (error) {
      console.error('Error generating quote:', error);
      // Fallback to simulated quote if API fails
      const basePrice = 300;
      let complexity = 1;
      let timeMultiplier = 1;
      let rushCost = 0;
      
      // Complexity scoring
      if (formData.complexity === 'simple') complexity = 1;
      else if (formData.complexity === 'moderate') complexity = 1.2;
      else if (formData.complexity === 'complex') complexity = 1.4;
      
      // Feature additions
      const otherFeaturesCount = formData.otherFeatures ? formData.otherFeatures.split(',').filter(f => f.trim()).length : 0;
      const totalFeatures = formData.features.length + otherFeaturesCount;
      const featureMultiplier = 1 + (totalFeatures * 0.1);
      
      // Timeline adjustments
      if (formData.timeline === 'rush') {
        timeMultiplier = 0.5;
      } else if (formData.timeline === 'standard') timeMultiplier = 1;
      else if (formData.timeline === 'flexible') timeMultiplier = 0.85;
      
      // Integration complexity
      let integrationCost = 0;
      const integrations = formData.integrations.split(',').filter(i => i.trim());
      integrations.forEach((integration, index) => {
        if (index < 5) {
          integrationCost += 50;
        } else {
          integrationCost += 75;
        }
      });
      
      // Calculate base price before rush cost
      const basePriceWithMultipliers = Math.round((basePrice * complexity * featureMultiplier * timeMultiplier) + integrationCost);
      
      // Rush cost is 50% of the total cost
      if (formData.timeline === 'rush') {
        rushCost = Math.round(basePriceWithMultipliers * 0.5);
      }
      
      const finalPrice = basePriceWithMultipliers + rushCost;
      
      // Delivery time calculation
      let deliveryDays = formData.complexity === 'simple' ? 2 : 
                        formData.complexity === 'moderate' ? 4 : 7;
      if (formData.timeline === 'rush') deliveryDays = Math.max(1, Math.floor(deliveryDays / 2));
      if (formData.timeline === 'flexible') deliveryDays += 2;
      
      setQuote({
        price: finalPrice,
        deliveryDays: deliveryDays,
        breakdown: {
          basePrice: basePrice,
          complexityMultiplier: complexity,
          featuresMultiplier: featureMultiplier,
          timelineMultiplier: timeMultiplier,
          integrationCost: integrationCost,
          rushCost: rushCost
        },
        features: formData.features,
        confidence: 85
      });
    } finally {
      // Ensure loading screen is shown for at least 2 seconds
      const minLoadingTime = 2000;
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setIsGenerating(false);
        setStep(3);
      }, remainingTime);
    }
  };

  const renderStep1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '6px' }}>Tell Us About Your Project</h3>
        <p style={{ fontSize: '16px', color: 'black' }}>We&apos;ll use AI to generate an accurate quote based on your needs</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '6px' }}>Project Type</label>
                      <select 
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '12px',
                border: '1px solid black',
                fontSize: '16px',
                backgroundColor: 'white'
              }}
            value={formData.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
          >
            <option value="">Select project type...</option>
            <option value="productivity">Productivity Tool</option>
            <option value="business">Business Management</option>
            <option value="ecommerce">E-commerce Solution</option>
            <option value="data">Data Analysis Tool</option>
            <option value="automation">Workflow Automation</option>
            <option value="other">Custom/Other</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '6px' }}>Project Description</label>
                      <textarea 
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '12px',
                border: '1px solid black',
                fontSize: '16px',
                backgroundColor: 'white',
                minHeight: '80px',
                resize: 'vertical'
              }}
            rows={4}
            placeholder="Describe what you need your AI app to do..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '6px' }}>Complexity Level</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { level: 'simple', color: '#4FB3A6', label: '1-2 main features' },
              { level: 'moderate', color: '#C5A3E0', label: '3-5 features' },
              { level: 'complex', color: '#F29E8E', label: '6+ features' }
            ].map(({ level, color, label }) => (
              <button
                key={level}
                onClick={() => handleInputChange('complexity', level)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: `1px solid ${formData.complexity === level ? color : 'black'}`,
                  backgroundColor: formData.complexity === level ? color : 'white',
                  color: formData.complexity === level ? 'black' : 'black',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: '500', textTransform: 'capitalize' }}>{level}</div>
                <div style={{ fontSize: '14px', marginTop: '4px' }}>
                  {label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => setStep(2)}
          disabled={!formData.projectType || !formData.description || !formData.complexity}
          style={{
            width: '100%',
            padding: '8px 20px',
            fontSize: '16px',
            backgroundColor: (!formData.projectType || !formData.description || !formData.complexity) ? '#ccc' : '#8B5CF6',
            color: (!formData.projectType || !formData.description || !formData.complexity) ? '#666' : 'white',
            border: `1px solid ${(!formData.projectType || !formData.description || !formData.complexity) ? '#ccc' : '#8B5CF6'}`,
            borderRadius: '12px',
            cursor: (!formData.projectType || !formData.description || !formData.complexity) ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!(!formData.projectType || !formData.description || !formData.complexity)) {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#8B5CF6';
            }
          }}
          onMouseLeave={(e) => {
            if (!(!formData.projectType || !formData.description || !formData.complexity)) {
              e.target.style.backgroundColor = '#8B5CF6';
              e.target.style.color = 'white';
            }
          }}
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {isGenerating ? (
        <div style={{ textAlign: 'center', padding: '32px 20px' }}>
          {/* Animated loading icon */}
          <div style={{ 
            backgroundColor: '#8B5CF6', 
            borderRadius: '50%', 
            padding: '20px', 
            width: 'fit-content', 
            margin: '0 auto 24px',
            border: '2px solid #8B5CF6',
            animation: 'pulse 2s infinite'
          }}>
            <div style={{ width: '32px', height: '32px', color: 'white', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨</div>
          </div>
          
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '12px' }}>AI is Analyzing Your Project...</h3>
          
          {/* Progress steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxWidth: '300px', margin: '0 auto 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#4FB3A6' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#4FB3A6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>✓</div>
              <span>Analyzing project requirements</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#4FB3A6' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#4FB3A6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>✓</div>
              <span>Determining required integrations</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#8B5CF6' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#8B5CF6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', animation: 'spin 1s linear infinite' }}>⟳</div>
              <span>Calculating optimal pricing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#ccc' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#ccc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>○</div>
              <span>Generating detailed breakdown</span>
            </div>
          </div>
          
          <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>This usually takes 10-15 seconds...</p>
          
          {/* Loading animation styles */}
          <style jsx>{`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '6px' }}>Project Specifications</h3>
        <p style={{ fontSize: '16px', color: 'black' }}>Help us understand the scope and timeline</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '8px' }}>Key Features (select all that apply)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {[
              'User Authentication',
              'Data Export/Import',
              'Real-time Updates',
              'Mobile Responsive',
              'Search & Filter',
              'File Upload',
              'Email Notifications',
              'Dashboard/Analytics',
              'Multi-user Support',
              'Custom Branding'
            ].map((feature) => (
              <button
                key={feature}
                onClick={() => handleFeatureToggle(feature)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textAlign: 'left',
                  border: `1px solid ${formData.features.includes(feature) ? '#4FB3A6' : 'black'}`,
                  backgroundColor: formData.features.includes(feature) ? '#4FB3A6' : 'white',
                  color: formData.features.includes(feature) ? 'white' : 'black',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px'
                }}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '8px' }}>Other Features (optional)</label>
          <textarea
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid black',
              fontSize: '14px',
              backgroundColor: 'white',
              minHeight: '60px',
              resize: 'vertical'
            }}
            placeholder="Add any other features you need (these will be counted in the total features and affect pricing)"
            value={formData.otherFeatures || ''}
            onChange={(e) => handleInputChange('otherFeatures', e.target.value)}
          />
          <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Other features will be added to the total number of features and will affect the pricing.
          </p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '8px' }}>Timeline Preference</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[
              { value: 'rush', label: 'Rush (ASAP)', desc: '+$250 cost' },
              { value: 'standard', label: 'Standard', desc: 'Best value' },
              { value: 'flexible', label: 'Flexible', desc: '15% discount' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleInputChange('timeline', option.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: `1px solid ${formData.timeline === option.value ? '#F29E8E' : 'black'}`,
                  backgroundColor: formData.timeline === option.value ? '#F29E8E' : 'white',
                  color: formData.timeline === option.value ? 'white' : 'black',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px'
                }}
              >
                <div style={{ fontWeight: '500' }}>{option.label}</div>
                <div style={{ fontSize: '12px', marginTop: '2px' }}>{option.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '8px' }}>Contact Information</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid black',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
              placeholder="Your Name"
              value={formData.contactInfo.name}
              onChange={(e) => handleInputChange('contactInfo.name', e.target.value)}
            />
            <input
              type="email"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid black',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
              placeholder="Email Address"
              value={formData.contactInfo.email}
              onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
            />
          </div>
          <input
            type="text"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid black',
              fontSize: '14px',
              backgroundColor: 'white',
              marginTop: '8px'
            }}
            placeholder="Company (Optional)"
            value={formData.contactInfo.company}
            onChange={(e) => handleInputChange('contactInfo.company', e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        <button 
          onClick={() => setStep(1)}
          style={{
            padding: '8px 20px',
            fontSize: '14px',
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Back
        </button>
        <button 
          onClick={generateQuote}
          disabled={!formData.timeline || !formData.contactInfo.name || !formData.contactInfo.email}
          style={{
            padding: '8px 20px',
            fontSize: '14px',
            backgroundColor: (!formData.timeline || !formData.contactInfo.name || !formData.contactInfo.email) ? '#ccc' : '#8B5CF6',
            color: 'white',
            border: '1px solid #8B5CF6',
            borderRadius: '8px',
            cursor: (!formData.timeline || !formData.contactInfo.name || !formData.contactInfo.email) ? 'not-allowed' : 'pointer',
            fontWeight: '500'
          }}
        >
          Generate Quote
        </button>
      </div>
          </div>
        )}
    </div>
  );

  const renderStep3 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {isGenerating ? (
        <div style={{ textAlign: 'center', padding: '32px 20px' }}>
          {/* Animated loading icon */}
          <div style={{ 
            backgroundColor: '#8B5CF6', 
            borderRadius: '50%', 
            padding: '20px', 
            width: 'fit-content', 
            margin: '0 auto 24px',
            border: '2px solid #8B5CF6',
            animation: 'pulse 2s infinite'
          }}>
            <div style={{ width: '32px', height: '32px', color: 'white', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨</div>
          </div>
          
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '12px' }}>AI is Analyzing Your Project...</h3>
          
          {/* Progress steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxWidth: '300px', margin: '0 auto 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#4FB3A6' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#4FB3A6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>✓</div>
              <span>Analyzing project requirements</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#4FB3A6' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#4FB3A6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>✓</div>
              <span>Determining required integrations</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#8B5CF6' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#8B5CF6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', animation: 'spin 1s linear infinite' }}>⟳</div>
              <span>Calculating optimal pricing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#ccc' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#ccc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>○</div>
              <span>Generating detailed breakdown</span>
            </div>
          </div>
          
          <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>This usually takes 10-15 seconds...</p>
          
          {/* Loading animation styles */}
          <style jsx>{`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{ 
              backgroundColor: '#8B5CF6', 
              borderRadius: '8px', 
              padding: '8px', 
              width: 'fit-content', 
              margin: '0 auto 8px',
              border: '1px solid #8B5CF6'
            }}>
              <div style={{ width: '20px', height: '20px', color: 'white', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨</div>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'black', marginBottom: '4px' }}>Your AI-Generated Quote</h3>
            <p style={{ fontSize: '14px', color: 'black' }}>Based on your project requirements and complexity analysis</p>
          </div>

          <div style={{ 
            border: '1px solid black', 
            borderRadius: '8px', 
            padding: '12px',
            marginBottom: '12px'
          }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '20px', height: '20px', color: '#8B5CF6', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💰</div>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>${quote?.price}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'black' }}>Total Project Cost</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '20px', height: '20px', color: '#4FB3A6', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⏰</div>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>{quote?.deliveryDays}</span>
                    <span style={{ fontSize: '14px', color: 'black' }}>days</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'black' }}>Estimated Delivery Time</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', color: 'black' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Base Development:</span>
                  <span>${quote?.breakdown.basePrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Complexity Factor ({formData.complexity}):</span>
                  <span>×{quote?.breakdown.complexityMultiplier}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Features ({formData.features.length + (formData.otherFeatures ? formData.otherFeatures.split(',').filter(f => f.trim()).length : 0)} total):</span>
                  <span>×{quote?.breakdown.featuresMultiplier.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Timeline ({formData.timeline}):</span>
                  <span>×{quote?.breakdown.timelineMultiplier}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Integrations ({quote?.requiredIntegrations ? quote.requiredIntegrations.length : 0}):</span>
                  <span>+${quote?.breakdown.integrationCost || 0}</span>
                </div>

                {quote?.breakdown.rushCost && quote.breakdown.rushCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Rush Service:</span>
                    <span>+${quote.breakdown.rushCost}</span>
                  </div>
                )}
                <div style={{ borderTop: '1px solid black', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '16px' }}>
                  <span>Total:</span>
                  <span>${quote?.price}</span>
                </div>
              </div>
              
              <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#8B5CF6', borderRadius: '8px', border: '1px solid #8B5CF6' }}>
                <p style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>
                  AI Confidence: {quote?.confidence}% • This quote includes 30 days of support and revisions
                </p>
              </div>
            </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button 
              onClick={() => {
                setStep(1);
                setQuote(null);
                setFormData({
                  projectType: '',
                  description: '',
                  features: [],
                  timeline: '',
                  budget: '',
                  complexity: '',
                  integrations: '',
                  userCount: '',
                  contactInfo: { name: '', email: '', company: '' }
                });
              }}
              style={{
                flex: 1,
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: '#4FB3A6',
                color: 'white',
                border: '1px solid #4FB3A6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              New Quote
            </button>
            <button 
              onClick={async () => {
                // Send detailed analysis to business owner
                try {
                  await fetch('/api/send-project-analysis', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      formData,
                      quote,
                      userContactInfo: formData.contactInfo
                    }),
                  });
                } catch (error) {
                  console.error('Error sending analysis:', error);
                }
                
                // Send email to client
                window.location.href = `mailto:hello@solvd.ai?subject=Project Quote - ${quote?.price}&body=Hi! I just generated a quote for my project:%0A%0AProject: ${formData.description}%0AQuoted Price: ${quote?.price}%0AEstimated Delivery: ${quote?.deliveryDays} business days%0A%0AI'd like to proceed with this project.`;
              }}
              style={{
                flex: 1,
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: '#8B5CF6',
                color: 'white',
                border: '1px solid #8B5CF6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Accept Quote
            </button>
            <button 
              onClick={async () => {
                // Send detailed analysis to business owner
                try {
                  await fetch('/api/send-project-analysis', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      formData,
                      quote,
                      userContactInfo: formData.contactInfo
                    }),
                  });
                } catch (error) {
                  console.error('Error sending analysis:', error);
                }
                
                // Send email to client
                window.location.href = `mailto:hello@solvd.ai?subject=Quote Questions&body=Hi! I have questions about the quote I received:%0A%0AProject: ${formData.description}%0AQuoted Price: ${quote?.price}%0AEstimated Delivery: ${quote?.deliveryDays} business days%0A%0AQuestions/Comments:`;
              }}
              style={{
                flex: 1,
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: '#F29E8E',
                color: 'white',
                border: '1px solid #F29E8E',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Ask Questions
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid black'
      }}>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                backgroundColor: '#8B5CF6', 
                borderRadius: '8px', 
                padding: '12px',
                border: '2px solid #8B5CF6'
              }}>
                <div style={{ width: '24px', height: '24px', color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨</div>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'black' }}>AI Quote Generator</h2>
            </div>
            <button 
              onClick={onClose}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '2px solid black',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px'
              }}
            >
              ✕
            </button>
          </div>

          {/* Progress Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '500',
                  backgroundColor: step >= stepNum ? '#8B5CF6' : 'white',
                  color: step >= stepNum ? 'white' : 'black',
                  border: step >= stepNum ? 'none' : '2px solid black'
                }}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div style={{
                    width: '64px',
                    height: '4px',
                    margin: '0 8px',
                    backgroundColor: step > stepNum ? '#8B5CF6' : 'black'
                  }}></div>
                )}
              </div>
            ))}
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
}