import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Payment Form Component
function PaymentForm({ amount, project, customer, email }: { 
  amount: string; 
  project: string; 
  customer: string; 
  email: string; 
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          project,
          customer,
          email,
        }),
      });

      const { success, clientSecret, error: apiError } = await response.json();

      if (!success) {
        throw new Error(apiError || 'Failed to create payment intent');
      }

      // Confirm payment
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px 20px'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'black' }}>
          Payment Processing
        </h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Your payment is being processed. You&apos;ll receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      
      {error && (
        <div style={{
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          padding: '12px',
          borderRadius: '6px',
          marginTop: '16px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || isLoading}
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
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        {isLoading ? '⏳ Processing...' : '💳 Pay $' + amount}
      </button>
    </form>
  );
}

// Main Payment Page Component
export default function PaymentPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [customer, setCustomer] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    if (router.isReady) {
      setAmount(router.query.amount as string || '');
      setProject(router.query.project as string || '');
      setCustomer(router.query.customer as string || '');
      setEmail(router.query.email as string || '');
    }
  }, [router.isReady, router.query]);

  // Create payment intent when component mounts
  useEffect(() => {
    if (amount && project && customer) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          project,
          customer,
          email,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setClientSecret(data.clientSecret);
        }
      })
      .catch(error => {
        console.error('Error creating payment intent:', error);
      });
    }
  }, [amount, project, customer, email]);

  if (!clientSecret) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Inter, sans-serif',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>⏳</div>
          <div style={{ fontSize: '16px', color: '#666' }}>Loading payment form...</div>
        </div>
      </div>
    );
  }

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

            {/* Stripe Payment Form */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 16px 0',
                color: 'black'
              }}>
                💳 Payment Details
              </h3>
              
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm 
                  amount={amount} 
                  project={project} 
                  customer={customer} 
                  email={email}
                />
              </Elements>
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
                Powered by Stripe. Your payment information is encrypted and secure.
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