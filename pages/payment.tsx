import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function PaymentPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [customer, setCustomer] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setAmount(router.query.amount as string || '');
      setProject(router.query.project as string || '');
      setCustomer(router.query.customer as string || '');
    }
  }, [router.isReady, router.query]);

  const handlePayment = async (paymentMethod: string) => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      alert(`Payment processing for $${amount} via ${paymentMethod}. In a real implementation, this would integrate with Stripe, PayPal, or another payment processor.`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Payment - Solvd AI Solutions</title>
        <meta name="description" content="Complete your payment for your AI project" />
      </Head>
      
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Inter, sans-serif',
        padding: '24px'
      }}>
        <div style={{
          maxWidth: '600px',
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
            padding: '24px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>
              💳 Complete Payment
            </h1>
            <p style={{
              fontSize: '16px',
              opacity: '0.9',
              margin: 0
            }}>
              Secure payment for your AI project
            </p>
          </div>

          {/* Content */}
          <div style={{ padding: '32px' }}>
            {/* Project Summary */}
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '24px',
              border: '1px solid #e9ecef'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 16px 0',
                color: 'black'
              }}>
                📋 Project Summary
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Customer:</span>
                  <span style={{ fontWeight: '500', color: 'black' }}>{customer || 'Not specified'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Project:</span>
                  <span style={{ fontWeight: '500', color: 'black' }}>{project || 'Not specified'}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  borderTop: '1px solid #e9ecef',
                  paddingTop: '8px',
                  marginTop: '8px'
                }}>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: 'black' }}>Total Amount:</span>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#8B5CF6' }}>
                    ${amount || '0'}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 16px 0',
                color: 'black'
              }}>
                💳 Choose Payment Method
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => handlePayment('Credit Card')}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: '#8B5CF6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isLoading ? '⏳ Processing...' : '💳 Pay with Credit Card'}
                </button>
                
                <button
                  onClick={() => handlePayment('PayPal')}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: '#0070BA',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isLoading ? '⏳ Processing...' : '🔗 Pay with PayPal'}
                </button>
                
                <button
                  onClick={() => handlePayment('Bank Transfer')}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: '#4FB3A6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {isLoading ? '⏳ Processing...' : '🏦 Pay with Bank Transfer'}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div style={{
              backgroundColor: '#F29E8E',
              color: 'white',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>
                🔒 Secure Payment Processing
              </div>
              <div style={{ fontSize: '12px', opacity: '0.9', marginTop: '4px' }}>
                All payments are encrypted and secure. You'll receive a confirmation email once payment is complete.
              </div>
            </div>

            {/* Back Button */}
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button
                onClick={() => router.back()}
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
                ← Back to Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 