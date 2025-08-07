import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'processing' | 'error'>('processing');

  useEffect(() => {
    // Check payment status from URL parameters
    const { payment_intent_client_secret } = router.query;
    
    if (payment_intent_client_secret) {
      // In a real implementation, you'd verify the payment status with your backend
      setPaymentStatus('success');
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Payment Success - Solvd AI Solutions</title>
        <meta name="description" content="Payment completed successfully" />
      </Head>
      
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Inter, sans-serif',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '2px solid black',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#10B981',
            color: 'white',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>
              Payment Successful!
            </h1>
            <p style={{
              fontSize: '16px',
              opacity: '0.9',
              margin: 0
            }}>
              Thank you for your payment
            </p>
          </div>

          {/* Content */}
          <div style={{ padding: '32px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: '0 0 16px 0',
                color: 'black'
              }}>
                What's Next?
              </h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                textAlign: 'left',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    1
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'black', marginBottom: '4px' }}>
                      Confirmation Email
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      You'll receive a payment confirmation email within the next few minutes.
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    2
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'black', marginBottom: '4px' }}>
                      Project Review
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      Our team will review your project requirements within 24 hours.
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{
                    backgroundColor: '#10B981',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    3
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'black', marginBottom: '4px' }}>
                      Project Kickoff
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      You'll receive a kickoff email with next steps and timeline.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '24px',
              border: '1px solid #e9ecef'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                margin: '0 0 12px 0',
                color: 'black'
              }}>
                📧 Contact Information
              </h3>
              
              <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Email:</strong> hello@solvd.ai
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Website:</strong> https://www.solvdaisolutions.com
                </div>
                <div>
                  <strong>Response Time:</strong> Within 24 hours
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => window.location.href = 'https://www.solvdaisolutions.com'}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  backgroundColor: '#8B5CF6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                🏠 Return to Homepage
              </button>
              
              <button
                onClick={() => window.location.href = 'mailto:hello@solvd.ai?subject=Payment Confirmation - Questions'}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  backgroundColor: 'transparent',
                  color: '#8B5CF6',
                  border: '1px solid #8B5CF6',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                📧 Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 