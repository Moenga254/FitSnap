import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NutritionEntry {
  id: string;
  mealName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: string;
  imageUri?: string;
}

export interface DailyLog {
  date: string;
  entries: NutritionEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface UserGoals {
  goal: 'muscle' | 'lose' | 'maintain';
  calorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatsTarget: number;
}

const DEFAULT_GOALS: UserGoals = {
  goal: 'muscle',
  calorieTarget: 2400,
  proteinTarget: 150,
  carbsTarget: 300,
  fatsTarget: 70,
};

const GOAL_PRESETS: Record<string, UserGoals> = {
  muscle:   { goal: 'muscle',   calorieTarget: 2400, proteinTarget: 150, carbsTarget: 300, fatsTarget: 70 },
  lose:     { goal: 'lose',     calorieTarget: 1800, proteinTarget: 140, carbsTarget: 180, fatsTarget: 55 },
  maintain: { goal: 'maintain', calorieTarget: 2200, proteinTarget: 120, carbsTarget: 260, fatsTarget: 65 },
};

function todayKey(): string {
  return new Date().toISOString().split('T')[0];
}

export function useAppState() {
  const [userGoals, setUserGoals] = useState<UserGoals>(DEFAULT_GOALS);
  const [todayLog, setTodayLog] = useState<DailyLog>({
    date: todayKey(),
    entries: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFats: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [goalsStr, todayStr] = await Promise.all([
        AsyncStorage.getItem('userGoals'),
        AsyncStorage.getItem(`log_${todayKey()}`),
      ]);
      if (goalsStr) setUserGoals(JSON.parse(goalsStr));
      if (todayStr) setTodayLog(JSON.parse(todayStr));
    } catch (e) {
      console.error('Failed to load data', e);
    } finally {
      setLoading(false);
    }
  };

  const addMealEntry = useCallback(async (
    entry: Omit<NutritionEntry, 'id' | 'timestamp'>
  ) => {
    const newEntry: NutritionEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    const updatedLog: DailyLog = {
      ...todayLog,
      entries: [...todayLog.entries, newEntry],
      totalCalories: todayLog.totalCalories + entry.calories,
      totalProtein: todayLog.totalProtein + entry.protein,
      totalCarbs: todayLog.totalCarbs + entry.carbs,
      totalFats: todayLog.totalFats + entry.fats,
    };
    setTodayLog(updatedLog);
    await AsyncStorage.setItem(`log_${todayKey()}`, JSON.stringify(updatedLog));
  }, [todayLog]);

  const saveGoals = useCallback(async (
    goalType: 'muscle' | 'lose' | 'maintain'
  ) => {
    const preset = GOAL_PRESETS[goalType];
    setUserGoals(preset);
    await AsyncStorage.setItem('userGoals', JSON.stringify(preset));
  }, []);

  const getInsightMessage = useCallback((): string => {
    const proteinLeft = userGoals.proteinTarget - todayLog.totalProtein;
    const calLeft = userGoals.calorieTarget - todayLog.totalCalories;

    if (todayLog.totalCalories > userGoals.calorieTarget) {
      return '⚠️ Calorie goal exceeded. Go easy on your next meal.';
    }
    if (proteinLeft > 30) {
      return `💪 Need ${Math.round(proteinLeft)}g more protein. Try nyama choma or tilapia.`;
    }
    if (proteinLeft > 0 && proteinLeft <= 30) {
      return `✅ Almost at protein goal — just ${Math.round(proteinLeft)}g to go!`;
    }
    if (calLeft > 800) {
      return '🍽️ Log your next meal to stay on track.';
    }
    return '🔥 Great job — you\'re hitting your targets today!';
  }, [todayLog, userGoals]);

  return {
    userGoals,
    todayLog,
    loading,
    addMealEntry,
    saveGoals,
    getInsightMessage,
    GOAL_PRESETS,
  };
}