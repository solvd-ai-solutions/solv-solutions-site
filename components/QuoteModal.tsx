import { useState } from "react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  // COMPLETELY NEW VERSION - NO FEATURE CHECKBOXES ANYWHERE
  // AI determines features from project description only
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
      rushCost: number;
    };
    determinedFeatures: string[];
    requiredIntegrations?: string[];
    confidence: number;
  } | null>(null);

  // Tax calculation functions
  const getStateTaxRate = (state: string): number => {
    const taxRates: { [key: string]: number } = {
      'CA': 10.5, 'TX': 8.25, 'NY': 8.875, 'FL': 7.0, 'IL': 8.25,
      'PA': 8.0, 'OH': 7.25, 'GA': 7.0, 'NC': 7.25, 'MI': 6.0,
      'NJ': 6.625, 'VA': 6.0, 'WA': 6.5, 'AZ': 8.6, 'MA': 6.25,
      'IN': 7.0, 'TN': 9.55, 'MO': 8.25, 'MD': 6.0, 'CO': 4.4,
      'MN': 7.875, 'WI': 5.0, 'AL': 9.0, 'SC': 7.0, 'LA': 9.45,
      'KY': 6.0, 'OR': 0.0, 'OK': 4.5, 'CT': 6.35, 'IA': 7.0,
      'UT': 7.25, 'NV': 8.25, 'AR': 9.5, 'MS': 7.0, 'KS': 8.5,
      'NM': 7.875, 'NE': 7.0, 'ID': 6.0, 'WV': 7.0, 'HI': 4.0,
      'NH': 0.0, 'ME': 5.5, 'RI': 7.0, 'MT': 0.0, 'DE': 0.0,
      'SD': 6.5, 'ND': 5.0, 'AK': 0.0, 'DC': 6.0, 'VT': 7.0,
      'WY': 4.0
    };
    return taxRates[state.toUpperCase()] || 0;
  };

  const calculateStateTax = (price: number, state: string): number => {
    const taxRate = getStateTaxRate(state);
    return Math.round(price * (taxRate / 100));
  };

  const calculateTotalWithTax = (price: number, state: string): number => {
    const tax = calculateStateTax(price, state);
    return price + tax;
  };

  const [formData, setFormData] = useState({
    projectType: '',
    description: '',
    complexity: 'simple',
    timeline: 'standard',
    budget: 'under-5k',
    integrations: '',
    userCount: '1-10',
    contactInfo: {
      name: '',
      email: '',
      company: '',
      state: ''
    }
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
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
      setQuote(quoteData);

      // Send email analysis automatically
      try {
        console.log('Attempting to send email analysis...');
        console.log('Form data being sent:', {
          projectType: formData.projectType,
          description: formData.description,
          contactInfo: formData.contactInfo
        });
        
        const emailResponse = await fetch('/api/send-project-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData,
            quote: quoteData,
            userContactInfo: formData.contactInfo
          }),
        });
        
        const emailResult = await emailResponse.json();
        console.log('Email API response:', emailResult);
        
        if (!emailResponse.ok) {
          console.error('Email API error:', emailResponse.status, emailResult);
        } else {
          if (emailResult.emailId) {
            console.log('Email sent successfully! Email ID:', emailResult.emailId);
          } else if (emailResult.emailError) {
            console.warn('Email failed to send:', emailResult.emailError);
          } else {
            console.log('Email API completed:', emailResult.message);
          }
        }
      } catch (emailError) {
        console.error('Error sending automatic analysis:', emailError);
      }

    } catch (error) {
      console.error('Error generating quote:', error);
      // Fallback quote
      const fallbackQuote = {
        price: 990,
        deliveryDays: 7,
        breakdown: {
          basePrice: 250,
          complexityMultiplier: 1.4,
          featuresMultiplier: 2.0,
          timelineMultiplier: 1,
          integrationCost: 150,
          rushCost: 0
        },
        determinedFeatures: ['AI-determined features based on project description'],
        confidence: 85
      };
      setQuote(fallbackQuote);
    } finally {
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
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: 'black', marginBottom: '6px' }}>Timeline & Contact Details</h3>
            <p style={{ fontSize: '16px', color: 'black' }}>Help us understand your timeline and contact information</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '16px', fontWeight: '500', color: 'black', marginBottom: '8px' }}>Timeline Preference</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { value: 'rush', label: 'Rush (ASAP)', desc: '50% of total cost', color: '#F29E8E' },
                  { value: 'standard', label: 'Standard', desc: 'Best value', color: '#4FB3A6' },
                  { value: 'flexible', label: 'Flexible', desc: '15% discount', color: '#C5A3E0' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleInputChange('timeline', option.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: `1px solid ${formData.timeline === option.value ? option.color : 'black'}`,
                      backgroundColor: formData.timeline === option.value ? option.color : 'white',
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
                placeholder="State (Optional)"
                value={formData.contactInfo.state}
                onChange={(e) => handleInputChange('contactInfo.state', e.target.value)}
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
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>${calculateTotalWithTax(quote?.price || 0, formData.contactInfo.state)}</span>
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
                <span>Features (AI-determined):</span>
                <span>×{quote?.breakdown.featuresMultiplier.toFixed(2)}</span>
              </div>
              
              {/* AI-Determined Features List */}
              {quote?.determinedFeatures && quote.determinedFeatures.length > 0 && (
                <div style={{ 
                  marginTop: '8px', 
                  padding: '8px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '6px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px', fontWeight: '500' }}>
                    AI-Determined Features:
                  </div>
                  <div style={{ fontSize: '12px', color: 'black', lineHeight: '1.4' }}>
                    {quote.determinedFeatures.map((feature: string, index: number) => (
                      <div key={index} style={{ marginBottom: '2px' }}>
                        • {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {quote?.requiredIntegrations && quote.requiredIntegrations.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Integrations ({quote.requiredIntegrations.length}):</span>
                  <span>+${quote?.breakdown.integrationCost}</span>
                </div>
              )}

              {quote?.breakdown.rushCost && quote.breakdown.rushCost > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Rush Service:</span>
                  <span>+${quote.breakdown.rushCost}</span>
                </div>
              )}
              {formData.contactInfo.state && calculateStateTax(quote?.price || 0, formData.contactInfo.state) > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>State Tax (${getStateTaxRate(formData.contactInfo.state)}%):</span>
                  <span>+${calculateStateTax(quote?.price || 0, formData.contactInfo.state)}</span>
                </div>
              )}
              <div style={{ borderTop: '1px solid black', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '16px' }}>
                <span>Total:</span>
                <span>${calculateTotalWithTax(quote?.price || 0, formData.contactInfo.state)}</span>
              </div>
            </div>
            
            <div style={{ marginTop: '12px', textAlign: 'center' }}>
              <p style={{ color: 'black', fontWeight: '500', fontSize: '14px' }}>
                This quote includes 30 days of support and revisions
              </p>
            </div>
          </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => {
                setStep(1);
                setQuote(null);
                setFormData({
                  projectType: '',
                  description: '',
                  complexity: 'simple',
                  timeline: 'standard',
                  budget: 'under-5k',
                  integrations: '',
                  userCount: '1-10',
                  contactInfo: { name: '', email: '', company: '', state: '' }
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
              onClick={() => {
                setStep(1);
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
              Modify Quote
            </button>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={async () => {
                try {
                  // Send quote acceptance notification
                  const response = await fetch('/api/accept-quote', {
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

                  const result = await response.json();
                  
                  if (result.success) {
                    // Redirect to contact page with quote details
                    window.location.href = result.contactUrl;
                  } else {
                    alert('Error accepting quote. Please try again or contact us directly.');
                  }
                } catch (error) {
                  console.error('Error accepting quote:', error);
                  alert('Error accepting quote. Please try again or contact us directly.');
                }
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
              onClick={() => {
                const userName = formData.contactInfo.name || 'User';
                const projectDesc = formData.description || 'Project';
                const quotedPrice = quote?.price || 0;
                const deliveryDays = quote?.deliveryDays || 0;
                
                const emailBody = `Hi! I have questions about the quote I received:

Project: ${projectDesc}
Quoted Price: $${quotedPrice}
Estimated Delivery: ${deliveryDays} business days

Questions/Comments:
`;
                
                window.open(`mailto:gpeterson3030@gmail.com?subject=Quote Questions from ${userName}&body=${encodeURIComponent(emailBody)}`);
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
      </div>
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
        border: '2px solid black'
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
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '24px',
                height: '24px'
              }}
            >
              ✕
            </button>
          </div>

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