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
    const prompt = `You are an expert AI development consultant. Based on the project details, generate a comprehensive quote with the following requirements:

PROJECT DETAILS:
- Type: ${projectType}
- Description: ${description}
- Complexity: ${complexity}
- Timeline: ${timeline}
- Budget: ${budget}
- User Count: ${userCount}

PRICING RULES:
- Base development cost: $300
- Complexity multipliers: Simple (1.0x), Moderate (1.2x), Complex (1.4x)
- Feature multiplier: 1 + (number of features × 0.1)
- Timeline multipliers: Rush (0.5x), Standard (1.0x), Flexible (0.85x)
- Integration costs: $50 each for first 5, $75 each after 5
- Rush service: 50% of total cost
- Delivery times: Simple (1-2 days), Moderate (2-4 days), Complex (5-7+ days)

TASK:
1. Analyze the project description and determine what features are actually needed (don't rely on user selection)
2. Calculate the total price based on the pricing rules
3. Determine required integrations based on the project needs
4. Provide detailed reasoning for the quote

Please respond with a JSON object in this exact format:
{
  "price": number,
  "deliveryDays": number,
  "confidence": number,
  "breakdown": {
    "basePrice": 300,
    "complexityMultiplier": number,
    "featuresMultiplier": number,
    "timelineMultiplier": number,
    "integrationCost": number,
    "rushCost": number
  },
  "requiredIntegrations": ["list of integrations needed"],
  "determinedFeatures": ["list of features the AI determined are needed"],
  "reasoning": "detailed explanation of pricing and feature decisions"
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