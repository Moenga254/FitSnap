import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Data Context
 * Manages app state including daily meals, goals, and nutrition tracking
 */

export interface Meal {
  id: string;
  timestamp: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  feedback: string;
}

export interface UserGoals {
  goal: "lose" | "build" | "maintain";
  calorieTarget: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
}

export interface DailyStats {
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

export interface AppState {
  goals: UserGoals;
  dailyStats: DailyStats;
  isLoading: boolean;
}

type Action =
  | { type: "SET_GOALS"; payload: UserGoals }
  | { type: "ADD_MEAL"; payload: Meal }
  | { type: "RESET_DAILY_STATS" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOAD_STATE"; payload: AppState };

const defaultGoals: UserGoals = {
  goal: "build",
  calorieTarget: 2500,
  proteinTarget: 120,
  carbTarget: 300,
  fatTarget: 80,
};

const getTodayDate = () => new Date().toISOString().split("T")[0];

const defaultDailyStats: DailyStats = {
  date: getTodayDate(),
  meals: [],
  totalCalories: 0,
  totalProtein: 0,
  totalCarbs: 0,
  totalFats: 0,
};

const initialState: AppState = {
  goals: defaultGoals,
  dailyStats: defaultDailyStats,
  isLoading: true,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_GOALS":
      return { ...state, goals: action.payload };

    case "ADD_MEAL": {
      const currentDate = getTodayDate();
      const isSameDay = state.dailyStats.date === currentDate;

      const meals = isSameDay ? [...state.dailyStats.meals, action.payload] : [action.payload];

      const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
      const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
      const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
      const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);

      return {
        ...state,
        dailyStats: {
          date: currentDate,
          meals,
          totalCalories,
          totalProtein,
          totalCarbs,
          totalFats,
        },
      };
    }

    case "RESET_DAILY_STATS": {
      const currentDate = getTodayDate();
      return {
        ...state,
        dailyStats: {
          date: currentDate,
          meals: [],
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFats: 0,
        },
      };
    }

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "LOAD_STATE":
      return action.payload;

    default:
      return state;
  }
}

interface DataContextType {
  state: AppState;
  setGoals: (goals: UserGoals) => void;
  addMeal: (meal: Meal) => void;
  resetDailyStats: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from AsyncStorage on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem("fitsnap_state");
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          // Check if it's a new day
          const currentDate = getTodayDate();
          if (parsedState.dailyStats.date !== currentDate) {
            // Reset daily stats for new day
            parsedState.dailyStats = {
              date: currentDate,
              meals: [],
              totalCalories: 0,
              totalProtein: 0,
              totalCarbs: 0,
              totalFats: 0,
            };
          }
          dispatch({ type: "LOAD_STATE", payload: parsedState });
        }
      } catch (error) {
        console.error("Failed to load state:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadState();
  }, []);

  // Save state to AsyncStorage whenever it changes
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem("fitsnap_state", JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save state:", error);
      }
    };

    if (!state.isLoading) {
      saveState();
    }
  }, [state]);

  const setGoals = (goals: UserGoals) => {
    dispatch({ type: "SET_GOALS", payload: goals });
  };

  const addMeal = (meal: Meal) => {
    dispatch({ type: "ADD_MEAL", payload: meal });
  };

  const resetDailyStats = () => {
    dispatch({ type: "RESET_DAILY_STATS" });
  };

  return (
    <DataContext.Provider value={{ state, setGoals, addMeal, resetDailyStats }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
}
