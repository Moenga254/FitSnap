import { AFRICAN_MEALS, getFeedback, AfricanMeal } from '../constants/africanFoods';

export interface MealAnalysisResult {
  mealName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  feedback: string;
  confidence: 'high' | 'medium' | 'low';
  region?: string;
}

export async function analyzeImageWithClaude(
  base64Image: string,
  mimeType: string = 'image/jpeg',
  userGoal: string = 'muscle'
): Promise<MealAnalysisResult> {
  const systemPrompt = `You are an expert African sports nutritionist and food recognition AI.
You specialise in East African, West African, and Southern African cuisines.
Common foods include: ugali, nyama choma, sukuma wiki, githeri, pilau, tilapia,
mandazi, matoke, injera, jollof rice, egusi soup, suya, pap, chakalaka.
Return ONLY a raw JSON object — no markdown, no backticks, no explanation.`;

  const userPrompt = `Analyze this meal photo. The user's fitness goal is: ${userGoal}.
Identify the food (prioritise African dishes if visible).
Return ONLY this JSON:
{
  "mealName": "string",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fats": number,
  "feedback": "1-2 sentences fitness-focused advice",
  "confidence": "high|medium|low",
  "region": "e.g. East Africa"
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType,
                data: base64Image,
              },
            },
            { type: 'text', text: userPrompt },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  const raw = data.content.map((b: any) => b.text || '').join('');
  const cleaned = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned) as MealAnalysisResult;
}

export function getMockAnalysis(userGoal: string = 'muscle'): MealAnalysisResult {
  const pool = AFRICAN_MEALS.filter(m =>
    userGoal === 'muscle' ? m.protein >= 28 : true
  );
  const meal = pool[Math.floor(Math.random() * pool.length)];
  return {
    mealName: meal.name,
    calories: meal.calories,
    protein: meal.protein,
    carbs: meal.carbs,
    fats: meal.fats,
    feedback: getFeedback(meal, userGoal),
    confidence: 'high',
    region: meal.region,
  };
}