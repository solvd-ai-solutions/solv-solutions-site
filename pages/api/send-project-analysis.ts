import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { Resend } from 'resend';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Tax calculation function
const getStateTaxRate = (state: string): number => {
  const taxRates: { [key: string]: number } = {
    'CA': 7.25, 'TX': 6.25, 'NY': 8.875, 'FL': 6.0, 'IL': 6.25,
    'PA': 6.0, 'OH': 5.75, 'GA': 4.0, 'NC': 4.75, 'MI': 6.0,
    'NJ': 6.625, 'VA': 5.3, 'WA': 6.5, 'AZ': 5.6, 'MA': 6.25,
    'IN': 7.0, 'TN': 7.0, 'MO': 4.225, 'MD': 6.0, 'CO': 2.9,
    'MN': 6.875, 'WI': 5.0, 'AL': 4.0, 'SC': 6.0, 'LA': 4.45,
    'KY': 6.0, 'OR': 0.0, 'OK': 4.5, 'CT': 6.35, 'IA': 6.0,
    'UT': 4.85, 'NV': 6.85, 'AR': 6.5, 'MS': 7.0, 'KS': 6.5,
    'NM': 5.125, 'NE': 5.5, 'ID': 6.0, 'WV': 6.0, 'HI': 4.0,
    'NH': 0.0, 'ME': 5.5, 'RI': 7.0, 'MT': 0.0, 'DE': 0.0,
    'SD': 4.5, 'ND': 5.0, 'AK': 0.0, 'DC': 6.0, 'VT': 6.0,
    'WY': 4.0
  };
  return taxRates[state.toUpperCase()] || 0;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Email API called with data:', req.body);
  console.log('Environment variables check - RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');

  try {
    const { 
      formData, 
      quote, 
      userContactInfo 
    } = req.body;

    console.log('Processing email for:', userContactInfo);

    // Create a comprehensive analysis prompt
    const analysisPrompt = `Analyze this AI development project and provide a detailed breakdown:

PROJECT DETAILS:
- Type: ${formData.projectType}
- Description: ${formData.description}
- Complexity: ${formData.complexity}
- Timeline: ${formData.timeline}
- Budget Range: ${formData.budget}
- Features: ${formData.features.join(", ")}
- Other Features: ${formData.otherFeatures || 'None'}
- User Count: ${formData.userCount}

QUOTE DETAILS:
- Total Price: $${quote.price}
- Delivery Days: ${quote.deliveryDays}
- Confidence: ${quote.confidence}%

Please provide a comprehensive analysis including:

1. **REQUIRED INTEGRATIONS ANALYSIS**: The AI has determined the following integrations are needed: ${quote.requiredIntegrations ? quote.requiredIntegrations.join(", ") : 'None'}. Please analyze if these are appropriate and suggest any additional integrations that might be needed.

2. **MINIMAL INTEGRATIONS REQUIRED**: What is the absolute minimum number and type of integrations needed to complete this project successfully? Focus on essential integrations only.

3. **AI TOOLS RECOMMENDATION**: What specific AI tools would be most beneficial for this project? Consider tools like:
   - Figma (for design)
   - Make (for automation)
   - Cursor (for coding)
   - GitHub Copilot (for development)
   - ChatGPT/Claude (for planning)
   - Other relevant AI tools
   Please specify which tools are essential vs. optional.

4. **TIME ESTIMATION WITH AI ASSISTANCE**: Convert the delivery timeline to hours and minutes of development work, assuming AI tools are used to accelerate the process. Consider:
   - Frontend development hours (with AI assistance)
   - Backend development hours (with AI assistance)
   - Integration work hours (with AI assistance)
   - Testing and QA hours (with AI assistance)
   - Total estimated hours with AI tools
   - Time savings compared to traditional development

5. **PROJECT SCOPE BREAKDOWN**: Detailed breakdown of what this project entails, including:
   - Core functionality
   - Technical requirements
   - User experience considerations
   - Data management needs

6. **IMPORTANT HIGHLIGHTS**: Key considerations, risks, or special requirements that need attention.

7. **TECHNICAL RECOMMENDATIONS**: Suggested tech stack, architecture decisions, and best practices.

Format the response as JSON:
{
  "integrations": ["list of required integrations"],
  "minimalIntegrations": ["list of absolutely essential integrations only"],
  "aiTools": {
    "essential": ["list of essential AI tools"],
    "optional": ["list of optional AI tools"],
    "recommendations": "detailed explanation of AI tool usage"
  },
  "timeEstimation": {
    "frontend": number,
    "backend": number,
    "integration": number,
    "testing": number,
    "total": number,
    "timeSavings": "percentage or hours saved with AI tools"
  },
  "projectScope": "detailed project breakdown",
  "highlights": ["list of important points"],
  "technicalRecommendations": "detailed technical advice"
}`;

    console.log('Calling OpenAI for analysis...');
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert AI development consultant with deep technical knowledge. Provide detailed, accurate analysis for development projects."
        },
        {
          role: "user",
          content: analysisPrompt
        }
      ],
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    console.log('OpenAI analysis received');

    let analysisData;
    try {
      analysisData = JSON.parse(response);
    } catch (parseError) {
      console.log('Failed to parse OpenAI response, using fallback:', parseError);
      // Fallback analysis
      analysisData = {
        integrations: ["Basic API integration", "Database setup"],
        minimalIntegrations: ["Basic API integration", "Database setup"],
        aiTools: {
          essential: ["Basic API integration", "Database setup"],
          optional: ["Figma", "Make", "Cursor", "GitHub Copilot", "ChatGPT/Claude"],
          recommendations: "Use modern web technologies and best practices"
        },
        timeEstimation: {
          frontend: 20,
          backend: 30,
          integration: 10,
          testing: 15,
          total: 75,
          timeSavings: "50%"
        },
        projectScope: "Standard development project based on requirements",
        highlights: ["Standard complexity project", "Requires standard integrations"],
        technicalRecommendations: "Use modern web technologies and best practices"
      };
    }

    // Create email content
    const emailSubject = `New Quote Project Details from ${userContactInfo.name}`;
    const emailBody = `
NEW QUOTE PROJECT ANALYSIS
=========================

CLIENT INFORMATION:
Name: ${userContactInfo.name}
Email: ${userContactInfo.email}
Company: ${userContactInfo.company}

PROJECT DETAILS:
Type: ${formData.projectType}
Description: ${formData.description}
Complexity: ${formData.complexity}
Timeline: ${formData.timeline}
Budget Range: ${formData.budget}
User Count: ${formData.userCount}
State: ${formData.contactInfo.state || 'Not specified'}

QUOTE SUMMARY:
Total Price: $${quote.price}
Delivery Days: ${quote.deliveryDays}
Confidence: ${quote.confidence}%
Required Integrations: ${quote.requiredIntegrations ? quote.requiredIntegrations.join(", ") : 'None'}
Integration Cost: $${quote.breakdown.integrationCost}
State Tax: ${formData.contactInfo.state ? `$${Math.round(quote.price * (getStateTaxRate(formData.contactInfo.state) / 100))}` : 'N/A'}
Total with Tax: ${formData.contactInfo.state ? `$${quote.price + Math.round(quote.price * (getStateTaxRate(formData.contactInfo.state) / 100))}` : `$${quote.price}`}

AI ANALYSIS:
===========

DETERMINED FEATURES (AI-Analyzed):
${quote.determinedFeatures ? quote.determinedFeatures.map((feature: string) => `• ${feature}`).join('\n') : '• Features determined by AI analysis'}

REQUIRED INTEGRATIONS (AI-Determined):
${quote.requiredIntegrations ? quote.requiredIntegrations.map((integration: string) => `• ${integration}`).join('\n') : '• None required'}

MINIMAL INTEGRATIONS REQUIRED:
${analysisData.minimalIntegrations.map((integration: string) => `• ${integration}`).join('\n')}

AI TOOLS RECOMMENDATION:
Essential AI Tools:
${analysisData.aiTools.essential.map((tool: string) => `• ${tool}`).join('\n')}

Optional AI Tools:
${analysisData.aiTools.optional.map((tool: string) => `• ${tool}`).join('\n')}

AI Tools Recommendations:
${analysisData.aiTools.recommendations}

TIME ESTIMATION (WITH AI ASSISTANCE):
Frontend Development: ${analysisData.timeEstimation.frontend} hours
Backend Development: ${analysisData.timeEstimation.backend} hours
Integration Work: ${analysisData.timeEstimation.integration} hours
Testing & QA: ${analysisData.timeEstimation.testing} hours
TOTAL: ${analysisData.timeEstimation.total} hours (${Math.floor(analysisData.timeEstimation.total / 8)} business days)
Time Savings with AI: ${analysisData.timeEstimation.timeSavings}

PROJECT SCOPE:
${analysisData.projectScope}

IMPORTANT HIGHLIGHTS:
${analysisData.highlights.map((highlight: string) => `• ${highlight}`).join('\n')}

TECHNICAL RECOMMENDATIONS:
${analysisData.technicalRecommendations}

COST BREAKDOWN:
Base Development: $${quote.breakdown.basePrice}
Complexity Multiplier: ×${quote.breakdown.complexityMultiplier}
Features Multiplier: ×${quote.breakdown.featuresMultiplier}
Timeline Multiplier: ×${quote.breakdown.timelineMultiplier}
Integration Cost: +$${quote.breakdown.integrationCost}
${quote.breakdown.rushCost > 0 ? `Rush Cost: +$${quote.breakdown.rushCost}` : ''}
Subtotal: $${quote.price}
${formData.contactInfo.state ? `State Tax (${getStateTaxRate(formData.contactInfo.state)}%): +$${Math.round(quote.price * (getStateTaxRate(formData.contactInfo.state) / 100))}` : ''}
TOTAL: ${formData.contactInfo.state ? `$${quote.price + Math.round(quote.price * (getStateTaxRate(formData.contactInfo.state) / 100))}` : `$${quote.price}`}
`;

    console.log('Preparing to send email...');
    console.log('Resend API Key present:', !!process.env.RESEND_API_KEY);
    console.log('Email subject:', emailSubject);
    console.log('Email to: gpeterson3030@gmail.com');

    // Send email using Resend
    try {
      console.log('Attempting to send email with Resend...');
      console.log('From: Solvd AI Solutions <onboarding@resend.dev>');
      console.log('To: gpeterson3030@gmail.com');
      console.log('Subject length:', emailSubject.length);
      console.log('Body length:', emailBody.length);
      
      const { data, error } = await resend.emails.send({
        from: 'Solvd AI Solutions <onboarding@resend.dev>',
        to: ['gpeterson3030@gmail.com'],
        subject: emailSubject,
        text: emailBody,
      });

      if (error) {
        console.error('Resend error details:', JSON.stringify(error, null, 2));
        throw new Error(`Email sending failed: ${error.message || JSON.stringify(error)}`);
      }

      console.log('Email sent successfully! Response:', JSON.stringify(data, null, 2));
      
      return res.status(200).json({ 
        message: "Analysis completed and email sent successfully",
        analysis: analysisData,
        emailId: data?.id,
        emailSubject
      });
      
    } catch (emailError) {
      console.error('Email sending error details:', emailError);
      console.error('Error stack:', emailError instanceof Error ? emailError.stack : 'No stack trace');
      
      // Return success but note email failure
      return res.status(200).json({ 
        message: "Analysis completed but email failed to send",
        analysis: analysisData,
        emailError: emailError instanceof Error ? emailError.message : String(emailError),
        emailSubject,
        emailBody: emailBody.substring(0, 500) + '...' // Include partial body for debugging
      });
    }

  } catch (error) {
    console.error("Error generating analysis:", error);
    res.status(500).json({ 
      message: "Error generating analysis",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
} 