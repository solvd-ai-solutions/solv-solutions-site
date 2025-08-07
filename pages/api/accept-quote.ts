import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { formData, quote, userContactInfo } = req.body;

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Calculate total with tax
    const getStateTaxRate = (state: string): number => {
      const taxRates: { [key: string]: number } = {
        'CA': 7.25, 'NY': 8.875, 'TX': 6.25, 'FL': 6.0, 'IL': 6.25,
        'PA': 6.0, 'OH': 5.75, 'GA': 4.0, 'NC': 4.75, 'MI': 6.0,
        'NJ': 6.625, 'VA': 5.3, 'WA': 6.5, 'AZ': 5.6, 'MA': 6.25,
        'TN': 7.0, 'IN': 7.0, 'MO': 4.225, 'MD': 6.0, 'CO': 2.9,
        'MN': 6.875, 'WI': 5.0, 'LA': 4.45, 'AL': 4.0, 'SC': 6.0,
        'KY': 6.0, 'OR': 0.0, 'OK': 4.5, 'CT': 6.35, 'IA': 6.0,
        'UT': 4.85, 'NV': 6.85, 'AR': 6.5, 'MS': 7.0, 'KS': 6.5,
        'NM': 5.125, 'NE': 5.5, 'WV': 6.0, 'ID': 6.0, 'HI': 4.0,
        'NH': 0.0, 'ME': 5.5, 'MT': 0.0, 'RI': 7.0, 'DE': 0.0,
        'SD': 4.5, 'ND': 5.0, 'AK': 0.0, 'VT': 6.0, 'WY': 4.0
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

    const totalWithTax = calculateTotalWithTax(quote?.price || 0, userContactInfo?.state || '');

    // Email content for notification
    const emailContent = `
🎉 **QUOTE ACCEPTED!** 🎉

**Customer Information:**
- Name: ${userContactInfo?.name || 'Not provided'}
- Email: ${userContactInfo?.email || 'Not provided'}
- Company: ${userContactInfo?.company || 'Not provided'}
- State: ${userContactInfo?.state || 'Not provided'}

**Project Details:**
- Project Type: ${formData?.projectType || 'Not specified'}
- Description: ${formData?.description || 'Not provided'}
- Complexity: ${formData?.complexity || 'Not specified'}
- Timeline: ${formData?.timeline || 'Not specified'}
- Budget Range: ${formData?.budget || 'Not specified'}
- User Count: ${formData?.userCount || 'Not specified'}

**Quote Breakdown:**
- Base Price: $${quote?.breakdown?.basePrice || 0}
- Complexity Multiplier: ×${quote?.breakdown?.complexityMultiplier || 1}
- Features Multiplier: ×${quote?.breakdown?.featuresMultiplier || 1}
- Integration Cost: $${quote?.breakdown?.integrationCost || 0}
- Rush Cost: $${quote?.breakdown?.rushCost || 0}
- State Tax: $${calculateStateTax(quote?.price || 0, userContactInfo?.state || '')}
- **TOTAL: $${totalWithTax}**

**Delivery:**
- Estimated Days: ${quote?.deliveryDays || 0} business days
- Confidence: ${(quote?.confidence || 0) * 100}%

**AI-Determined Features:**
${quote?.determinedFeatures?.map((feature: string) => `• ${feature}`).join('\n') || 'None specified'}

**Required Integrations:**
${quote?.requiredIntegrations?.map((integration: string) => `• ${integration}`).join('\n') || 'None specified'}

---
This quote was accepted at ${new Date().toLocaleString()}
    `;

    // Send notification email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'gpeterson3030@gmail.com',
      subject: `🎉 QUOTE ACCEPTED - ${userContactInfo?.name || 'Customer'} - $${totalWithTax}`,
      html: emailContent.replace(/\n/g, '<br>'),
    });

    // Redirect to payment portal with all necessary information
    const paymentUrl = `https://www.solvdaisolutions.com/payment?amount=${totalWithTax}&project=${encodeURIComponent(formData?.description || '')}&customer=${encodeURIComponent(userContactInfo?.name || '')}&email=${encodeURIComponent(userContactInfo?.email || '')}`;

    res.status(200).json({ 
      success: true, 
      message: 'Quote accepted successfully',
      paymentUrl 
    });

  } catch (error) {
    console.error('Error accepting quote:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error accepting quote',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 