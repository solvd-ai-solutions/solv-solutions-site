import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ContactPage() {
  const router = useRouter();
  const [quoteData, setQuoteData] = useState<{
    amount?: string;
    project?: string;
    customer?: string;
    email?: string;
    quote?: any;
  } | null>(null);

  useEffect(() => {
    if (router.isReady && router.query.quote) {
      try {
        const decodedQuote = decodeURIComponent(router.query.quote as string);
        const parsedQuote = JSON.parse(decodedQuote);
        setQuoteData(parsedQuote);
      } catch (error) {
        console.error('Error parsing quote data:', error);
      }
    }
  }, [router.isReady, router.query.quote]);

  return (
    <>
      <Head>
        <title>Contact Us - Solvd AI Solutions</title>
        <meta name="description" content="Get in touch to start your AI project" />
      </Head>
      
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Inter, sans-serif',
        padding: '24px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '2px solid black',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#8B5CF6',
            color: 'white',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>
              Quote Accepted!
            </h1>
            <p style={{
              fontSize: '16px',
              opacity: '0.9',
              margin: 0
            }}>
              Let&apos;s get started on your AI project
            </p>
          </div>

          {/* Content */}
          <div style={{ padding: '32px' }}>
            {quoteData && (
              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '32px',
                border: '1px solid #e9ecef'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: '0 0 16px 0',
                  color: 'black'
                }}>
                  📋 Your Project Quote
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Customer:</span>
                    <span style={{ fontWeight: '500', color: 'black' }}>{quoteData.customer || 'Not specified'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Project:</span>
                    <span style={{ fontWeight: '500', color: 'black' }}>{quoteData.project || 'Not specified'}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    borderTop: '1px solid #e9ecef',
                    paddingTop: '12px',
                    marginTop: '8px'
                  }}>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: 'black' }}>Total Amount:</span>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#8B5CF6' }}>
                      ${quoteData.amount || '0'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: '0 0 16px 0',
                color: 'black'
              }}>
                Next Steps
              </h2>
              
              <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
                We&apos;re excited to work on your project! Here&apos;s how to get started:
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '20px',
                border: '1px solid #e9ecef',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📧</div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: 'black' }}>
                  Email Us
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
                  Send us an email with your project details
                </p>
                <button
                  onClick={() => {
                    const subject = `Project Quote - ${quoteData?.customer || 'Customer'} - $${quoteData?.amount || '0'}`;
                    const body = `Hi! I'd like to proceed with my AI project:

Project: ${quoteData?.project || 'Not specified'}
Customer: ${quoteData?.customer || 'Not specified'}
Quoted Amount: $${quoteData?.amount || '0'}

I'm ready to get started!`;
                    window.location.href = `mailto:hello@solvd.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#8B5CF6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Send Email
                </button>
              </div>

              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '20px',
                border: '1px solid #e9ecef',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>💬</div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: 'black' }}>
                  Schedule Call
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
                  Book a consultation to discuss your project
                </p>
                <button
                  onClick={() => window.open('https://calendly.com/your-calendar', '_blank')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#4FB3A6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Book Call
                </button>
              </div>

              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '20px',
                border: '1px solid #e9ecef',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📱</div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: 'black' }}>
                  Contact Info
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>
                  Get in touch through any channel
                </p>
                <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                  <div>Email: hello@solvd.ai</div>
                  <div>Website: solvdaisolutions.com</div>
                  <div>Response: Within 24 hours</div>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div style={{
              backgroundColor: '#F29E8E',
              color: 'white',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 12px 0' }}>
                🚀 What Happens Next?
              </h3>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '8px' }}>1. We&apos;ll review your project requirements</div>
                <div style={{ marginBottom: '8px' }}>2. Send you a detailed project plan</div>
                <div style={{ marginBottom: '8px' }}>3. Begin development according to your timeline</div>
                <div>4. Keep you updated throughout the process</div>
              </div>
            </div>

            {/* Back Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => window.location.href = 'https://www.solvdaisolutions.com'}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                ← Back to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 