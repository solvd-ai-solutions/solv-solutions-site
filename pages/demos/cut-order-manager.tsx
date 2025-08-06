import { useEffect } from 'react';
import Head from 'next/head';

export default function CutOrderManagerDemo() {
  useEffect(() => {
    // Redirect immediately when the page loads
    window.location.replace('https://cut-order-manager-git-main-geoff-petersons-projects.vercel.app');
  }, []);

  return (
    <>
      <Head>
        <title>Cut & Order Manager Demo - Solvd AI Solutions</title>
        <meta name="description" content="Hardware store cutting service management system with QR tracking and inventory automation." />
        <meta property="og:title" content="Cut & Order Manager Demo" />
        <meta property="og:description" content="Hardware store cutting service management system with QR tracking and inventory automation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://solvdaisolutions.com/demos/cut-order-manager" />
      </Head>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#f8f9fa',
        padding: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '2px solid #000',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px'
          }}>
            🔄
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#000',
            marginBottom: '12px'
          }}>
            Redirecting to Cut & Order Manager Demo
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '24px'
          }}>
            You&apos;ll be redirected to the live demo automatically. If you&apos;re not redirected, click the button below.
          </p>
          <a 
            href="https://cut-order-manager-git-main-geoff-petersons-projects.vercel.app"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#F29E8E',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              border: '2px solid #F29E8E',
              fontWeight: '500',
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#F29E8E';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F29E8E';
              e.currentTarget.style.color = 'white';
            }}
          >
            🔨 Launch Demo
          </a>
        </div>
      </div>
    </>
  );
}