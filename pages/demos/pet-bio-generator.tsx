import { useEffect } from 'react';
import Head from 'next/head';

export default function PetBioGeneratorDemo() {
  useEffect(() => {
    // For now, redirect to main page since we don't have a live URL yet
    // Replace this URL when you have the Pet Bio Generator deployed
    window.location.replace('https://solvdaisolutions.com/#demos');
  }, []);

  return (
    <>
      <Head>
        <title>Pet Bio Generator Demo - Solvd AI Solutions</title>
        <meta name="description" content="AI-powered pet adoption bio generator with photo analysis and formatted card export." />
        <meta property="og:title" content="Pet Bio Generator Demo" />
        <meta property="og:description" content="AI-powered pet adoption bio generator with photo analysis and formatted card export." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://solvdaisolutions.com/demos/pet-bio-generator" />
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
            🚧
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#000',
            marginBottom: '12px'
          }}>
            Pet Bio Generator Demo
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '24px'
          }}>
            This demo is coming soon! We're working on deploying the Pet Bio Generator.
            You'll be redirected back to see our other demos.
          </p>
          <a 
            href="https://solvdaisolutions.com/#demos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#4FB3A6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              border: '2px solid #4FB3A6',
              fontWeight: '500',
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#4FB3A6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4FB3A6';
              e.currentTarget.style.color = 'white';
            }}
          >
            ❤️ Back to Demos
          </a>
        </div>
      </div>
    </>
  );
}