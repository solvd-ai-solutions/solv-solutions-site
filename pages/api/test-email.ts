import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Testing email with Resend...');
    console.log('Resend API Key present:', !!process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Solvd AI Solutions <onboarding@resend.dev>',
      to: ['gpeterson3030@gmail.com'],
      subject: 'Test Email from Solvd AI Solutions',
      text: 'This is a test email to verify Resend is working properly.',
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ 
        message: 'Email sending failed', 
        error: error.message 
      });
    }

    console.log('Test email sent successfully:', data);
    res.status(200).json({ 
      message: 'Test email sent successfully',
      data 
    });

  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      message: 'Error sending test email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 