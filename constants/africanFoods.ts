export interface AfricanMeal {
  id: string;
  name: string;
  region: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fitnessTag: 'muscle' | 'energy' | 'balanced' | 'light';
}

export const AFRICAN_MEALS: AfricanMeal[] = [
  {
    id: 'ugali_beef',
    name: 'Ugali & Beef Stew',
    region: 'East Africa',
    emoji: '🍲',
    calories: 680,
    protein: 38,
    carbs: 82,
    fats: 18,
    fitnessTag: 'muscle',
  },
  {
    id: 'nyama_choma',
    name: 'Nyama Choma',
    region: 'Kenya / Tanzania',
    emoji: '🥩',
    calories: 520,
    protein: 52,
    carbs: 4,
    fats: 32,
    fitnessTag: 'muscle',
  },
  {
    id: 'githeri',
    name: 'Githeri',
    region: 'Kenya',
    emoji: '🫘',
    calories: 420,
    protein: 22,
    carbs: 65,
    fats: 6,
    fitnessTag: 'balanced',
  },
  {
    id: 'sukuma_wiki',
    name: 'Sukuma Wiki & Ugali',
    region: 'Kenya',
    emoji: '🥬',
    calories: 380,
    protein: 14,
    carbs: 62,
    fats: 8,
    fitnessTag: 'balanced',
  },
  {
    id: 'pilau',
    name: 'Pilau Rice',
    region: 'Coastal Kenya',
    emoji: '🍛',
    calories: 580,
    protein: 28,
    carbs: 76,
    fats: 16,
    fitnessTag: 'energy',
  },
  {
    id: 'tilapia',
    name: 'Tilapia & Ugali',
    region: 'Lake Victoria',
    emoji: '🐟',
    calories: 490,
    protein: 44,
    carbs: 58,
    fats: 10,
    fitnessTag: 'muscle',
  },
  {
    id: 'jollof_rice',
    name: 'Jollof Rice & Chicken',
    region: 'West Africa',
    emoji: '🍚',
    calories: 620,
    protein: 34,
    carbs: 78,
    fats: 16,
    fitnessTag: 'balanced',
  },
  {
    id: 'suya',
    name: 'Suya Skewers',
    region: 'Nigeria',
    emoji: '🍢',
    calories: 440,
    protein: 46,
    carbs: 8,
    fats: 24,
    fitnessTag: 'muscle',
  },
  {
    id: 'injera_tibs',
    name: 'Injera & Tibs',
    region: 'Ethiopia',
    emoji: '🫓',
    calories: 560,
    protein: 32,
    carbs: 64,
    fats: 18,
    fitnessTag: 'balanced',
  },
  {
    id: 'mandazi',
    name: 'Mandazi',
    region: 'East Africa',
    emoji: '🍩',
    calories: 310,
    protein: 6,
    carbs: 52,
    fats: 9,
    fitnessTag: 'energy',
  },
];

export function getFeedback(meal: AfricanMeal, goal: string): string {
  if (goal === 'muscle' && meal.protein < 25) {
    return '⚠️ Low protein for muscle building. Add eggs, fish, or beans.';
  }
  if (goal === 'lose' && meal.calories > 600) {
    return '⚠️ High calories for weight loss. Try a smaller portion.';
  }
  const tags: Record<string, string> = {
    muscle: '💪 Great for muscle building — strong protein content.',
    energy: '⚡ High-energy meal — good fuel before a workout.',
    balanced: '✅ Well-balanced macros — fits most fitness goals.',
    light: '🥗 Light meal — consider pairing with a protein source.',
  };
  return tags[meal.fitnessTag];
}