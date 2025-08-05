import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { projectType, description, features, timeline, budget, complexity, integrations, userCount } = req.body;

    // Create a prompt for the AI to generate a quote
    const prompt = `Generate a detailed quote for an AI development project with the following specifications:

Project Type: ${projectType}
Description: ${description}
Features: ${features.join(", ")}
Timeline: ${timeline}
Budget Range: ${budget}
Complexity: ${complexity}
User Count: ${userCount}

Pricing Rules:
- Base development cost: $200
- Simple complexity: 1.0x multiplier, 1-2 business days delivery
- Moderate complexity: 1.3x multiplier, 2-4 business days delivery  
- Complex complexity: 1.6x multiplier, 5-7+ business days delivery
- Rush timeline: cuts delivery time in half, adds 50% of total cost
- Each integration: $50 (first 5), $75 each (after 5)
- Features multiplier: 1.1 per feature selected

IMPORTANT: Based on the project type, description, features, and user count, determine what integrations will be needed. Common integrations include:
- Payment processing (Stripe, PayPal)
- Email services (SendGrid, Mailgun)
- Database services (MongoDB, PostgreSQL)
- Cloud storage (AWS S3, Google Cloud Storage)
- Authentication (Auth0, Firebase Auth)
- Analytics (Google Analytics, Mixpanel)
- Communication APIs (Twilio, Slack)
- Social media APIs (Facebook, Twitter, LinkedIn)
- E-commerce platforms (Shopify, WooCommerce)
- CRM systems (Salesforce, HubSpot)

Please provide:
1. A total price estimate based on the pricing rules above
2. Delivery timeline in business days based on complexity and rush status
3. Cost breakdown (base price, complexity multiplier, features multiplier, timeline multiplier, integration costs)
4. List of features included
5. List of required integrations based on project analysis
6. Confidence level (0-100)
7. Detailed reasoning for the quote

Format the response as JSON with the following structure:
{
  "price": number,
  "deliveryDays": number,
  "breakdown": {
    "basePrice": 300,
    "complexityMultiplier": number,
    "featuresMultiplier": number,
    "timelineMultiplier": number,
    "integrationCost": number
  },
  "features": string[],
  "requiredIntegrations": ["list of integrations needed"],
  "confidence": number,
  "reasoning": string
}`;

    const completion = await openai.chat.completions.create({
      model: "o4-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert AI development consultant. Provide accurate, realistic quotes based on project specifications. Consider market rates, complexity, and timeline factors."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    // Try to parse the JSON response
    let quoteData;
    try {
      quoteData = JSON.parse(response);
      
      // Validate and correct the calculations
      const basePrice = 300;
      const complexityMultiplier = quoteData.breakdown.complexityMultiplier;
      const featuresMultiplier = quoteData.breakdown.featuresMultiplier;
      const timelineMultiplier = quoteData.breakdown.timelineMultiplier;
      
      // Use AI-determined integrations or fallback to user-provided ones
      const aiIntegrations = quoteData.requiredIntegrations || [];
      const userIntegrations = integrations ? integrations.split(',').filter((i: string) => i.trim()) : [];
      const finalIntegrations = aiIntegrations.length > 0 ? aiIntegrations : userIntegrations;
      
      // Calculate correct integration cost based on AI-determined integrations
      let correctIntegrationCost = 0;
      finalIntegrations.forEach((integration: string, index: number) => {
        if (index < 5) {
          correctIntegrationCost += 50;
        } else {
          correctIntegrationCost += 75;
        }
      });
      
      // Override the AI's integration cost with the correct calculation
      quoteData.breakdown.integrationCost = correctIntegrationCost;
      quoteData.requiredIntegrations = finalIntegrations;
      
      // Recalculate the price with correct integration cost
      const calculatedPrice = Math.round((basePrice * complexityMultiplier * featuresMultiplier * timelineMultiplier) + correctIntegrationCost);
      
      // Update the price if it doesn't match
      if (Math.abs(calculatedPrice - quoteData.price) > 10) {
        console.log('Price mismatch detected. Recalculating...');
        quoteData.price = calculatedPrice;
      }
      
    } catch (error) {
      // If JSON parsing fails, create a fallback response
      // Calculate integration cost properly
      let integrationCost = 0;
      const integrationList = integrations ? integrations.split(',').filter((i: string) => i.trim()) : [];
      integrationList.forEach((integration: string, index: number) => {
        if (index < 5) {
          integrationCost += 50;
        } else {
          integrationCost += 75;
        }
      });
      
      // Calculate proper fallback values
      const basePrice = 300;
      const complexityMultiplier = complexity === 'simple' ? 1.0 : complexity === 'moderate' ? 1.2 : 1.4;
      const featuresMultiplier = 1 + (features.length * 0.1);
      const timelineMultiplier = timeline === 'rush' ? 0.5 : timeline === 'flexible' ? 0.85 : 1.0;
      
      // Determine integrations based on project type and features
      let fallbackIntegrations: string[] = [];
      if (projectType === 'ecommerce') {
        fallbackIntegrations = ['Payment Processing', 'Inventory Management', 'Email Marketing'];
      } else if (projectType === 'business') {
        fallbackIntegrations = ['Database', 'Email Service', 'Analytics'];
      } else if (projectType === 'productivity') {
        fallbackIntegrations = ['Cloud Storage', 'Authentication', 'Email Service'];
      } else if (projectType === 'data') {
        fallbackIntegrations = ['Database', 'Analytics', 'Cloud Storage'];
      } else if (projectType === 'automation') {
        fallbackIntegrations = ['API Integration', 'Email Service', 'Database'];
      }
      
      // Calculate integration cost for fallback integrations
      let fallbackIntegrationCost = 0;
      fallbackIntegrations.forEach((integration: string, index: number) => {
        if (index < 5) {
          fallbackIntegrationCost += 50;
        } else {
          fallbackIntegrationCost += 75;
        }
      });
      
      const calculatedPrice = Math.round((basePrice * complexityMultiplier * featuresMultiplier * timelineMultiplier) + fallbackIntegrationCost);
      
              quoteData = {
          price: calculatedPrice,
          deliveryDays: complexity === 'simple' ? 2 : complexity === 'moderate' ? 4 : 7,
          breakdown: {
            basePrice: basePrice,
            complexityMultiplier: complexityMultiplier,
            featuresMultiplier: featuresMultiplier,
            timelineMultiplier: timelineMultiplier,
            integrationCost: fallbackIntegrationCost
          },
          features: features,
          requiredIntegrations: fallbackIntegrations,
          confidence: 85,
          reasoning: "Generated based on project specifications"
        };
    }

    res.status(200).json(quoteData);
  } catch (error) {
    console.error("Error generating quote:", error);
    res.status(500).json({ 
      message: "Error generating quote",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
} 