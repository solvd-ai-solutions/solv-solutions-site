import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, project, customer, email } = req.body;

    // Validate required fields
    if (!amount || !project || !customer) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: amount, project, customer' 
      });
    }

    // Convert amount to cents (Stripe expects amounts in cents)
    const amountInCents = Math.round(parseFloat(amount) * 100);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: {
        project: project,
        customer: customer,
        customerEmail: email || '',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating payment intent',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 