import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ message: 'Webhook signature verification failed' });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ message: 'Error processing webhook' });
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const { project, customer, customerEmail } = paymentIntent.metadata;
  const amount = (paymentIntent.amount / 100).toFixed(2);

  // Create email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send confirmation email to customer
  if (customerEmail) {
    const customerEmailContent = `
🎉 **Payment Confirmed!** 🎉

Thank you for your payment of **$${amount}** for your AI project.

**Project Details:**
- Project: ${project}
- Customer: ${customer}
- Payment ID: ${paymentIntent.id}
- Payment Date: ${new Date().toLocaleDateString()}

**What's Next:**
1. We'll review your project requirements within 24 hours
2. You'll receive a project kickoff email with next steps
3. Our team will begin development according to your timeline

**Contact Information:**
- Email: hello@solvd.ai
- Website: https://www.solvdaisolutions.com

Thank you for choosing Solvd AI Solutions!

---
This is an automated confirmation. Please save this email for your records.
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `🎉 Payment Confirmed - ${project}`,
      html: customerEmailContent.replace(/\n/g, '<br>'),
    });
  }

  // Send notification email to you
  const notificationEmailContent = `
💰 **PAYMENT RECEIVED!** 💰

**Payment Details:**
- Amount: $${amount}
- Customer: ${customer}
- Project: ${project}
- Payment ID: ${paymentIntent.id}
- Customer Email: ${customerEmail || 'Not provided'}

**Next Steps:**
1. Review project requirements
2. Send kickoff email to customer
3. Begin project development

---
Payment received at ${new Date().toLocaleString()}
    `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'gpeterson3030@gmail.com',
    subject: `💰 PAYMENT RECEIVED - ${customer} - $${amount}`,
    html: notificationEmailContent.replace(/\n/g, '<br>'),
  });
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const { project, customer, customerEmail } = paymentIntent.metadata;
  const amount = (paymentIntent.amount / 100).toFixed(2);

  // Create email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send failure notification to you
  const failureEmailContent = `
❌ **PAYMENT FAILED** ❌

**Payment Details:**
- Amount: $${amount}
- Customer: ${customer}
- Project: ${project}
- Payment ID: ${paymentIntent.id}
- Customer Email: ${customerEmail || 'Not provided'}
- Failure Reason: ${paymentIntent.last_payment_error?.message || 'Unknown'}

**Action Required:**
Contact the customer to resolve payment issues.

---
Payment failed at ${new Date().toLocaleString()}
    `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'gpeterson3030@gmail.com',
    subject: `❌ PAYMENT FAILED - ${customer} - $${amount}`,
    html: failureEmailContent.replace(/\n/g, '<br>'),
  });
} 