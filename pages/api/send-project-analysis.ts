import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      formData, 
      quote, 
      userContactInfo 
    } = req.body;

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

2. **PROJECT SCOPE BREAKDOWN**: Detailed breakdown of what this project entails, including:
   - Core functionality
   - Technical requirements
   - User experience considerations
   - Data management needs

3. **TIME ESTIMATION**: Convert the delivery timeline to hours and minutes of development work. Consider:
   - Frontend development hours
   - Backend development hours
   - Integration work hours
   - Testing and QA hours
   - Total estimated hours

4. **IMPORTANT HIGHLIGHTS**: Key considerations, risks, or special requirements that need attention.

5. **TECHNICAL RECOMMENDATIONS**: Suggested tech stack, architecture decisions, and best practices.

Format the response as JSON:
{
  "integrations": ["list of required integrations"],
  "projectScope": "detailed project breakdown",
  "timeEstimation": {
    "frontend": number,
    "backend": number,
    "integration": number,
    "testing": number,
    "total": number
  },
  "highlights": ["list of important points"],
  "technicalRecommendations": "detailed technical advice"
}`;

    const completion = await openai.chat.completions.create({
      model: "o4-mini",
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

    let analysisData;
    try {
      analysisData = JSON.parse(response);
    } catch (error) {
      // Fallback analysis
      analysisData = {
        integrations: ["Basic API integration", "Database setup"],
        projectScope: "Standard development project based on requirements",
        timeEstimation: {
          frontend: 20,
          backend: 30,
          integration: 10,
          testing: 15,
          total: 75
        },
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
Features: ${formData.features.join(", ")}
Other Features: ${formData.otherFeatures || 'None'}
User Count: ${formData.userCount}

QUOTE SUMMARY:
Total Price: $${quote.price}
Delivery Days: ${quote.deliveryDays}
Confidence: ${quote.confidence}%
Required Integrations: ${quote.requiredIntegrations ? quote.requiredIntegrations.join(", ") : 'None'}
Integration Cost: $${quote.breakdown.integrationCost}

AI ANALYSIS:
===========

REQUIRED INTEGRATIONS (AI-Determined):
${quote.requiredIntegrations ? quote.requiredIntegrations.map((integration: string) => `• ${integration}`).join('\n') : '• None required'}

ADDITIONAL INTEGRATIONS ANALYSIS:
${analysisData.integrations.map((integration: string) => `• ${integration}`).join('\n')}

PROJECT SCOPE:
${analysisData.projectScope}

TIME ESTIMATION:
Frontend Development: ${analysisData.timeEstimation.frontend} hours
Backend Development: ${analysisData.timeEstimation.backend} hours
Integration Work: ${analysisData.timeEstimation.integration} hours
Testing & QA: ${analysisData.timeEstimation.testing} hours
TOTAL: ${analysisData.timeEstimation.total} hours (${Math.floor(analysisData.timeEstimation.total / 8)} business days)

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
TOTAL: $${quote.price}
`;

    // Send email (you'll need to implement email sending)
    // For now, we'll just return the analysis data
    console.log('Email would be sent to business owner:', emailSubject, emailBody);

    res.status(200).json({ 
      message: "Analysis completed",
      analysis: analysisData,
      emailSubject,
      emailBody
    });

  } catch (error) {
    console.error("Error generating analysis:", error);
    res.status(500).json({ 
      message: "Error generating analysis",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
} 