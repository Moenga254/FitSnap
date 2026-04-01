import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Progress Screen
 * Displays daily/weekly nutrition statistics and trends
 */
export default function ProgressScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");

  // Mock daily stats
  const dailyStats = {
    calories: 2100,
    protein: 85,
    carbs: 250,
    fats: 65,
  };

  // Mock weekly data
  const weeklyData = [
    { day: "Mon", calories: 2300, protein: 95 },
    { day: "Tue", calories: 2100, protein: 85 },
    { day: "Wed", calories: 2450, protein: 110 },
    { day: "Thu", calories: 2200, protein: 88 },
    { day: "Fri", calories: 2350, protein: 105 },
    { day: "Sat", calories: 2500, protein: 120 },
    { day: "Sun", calories: 2100, protein: 85 },
  ];

  const weeklyAverage = {
    calories: Math.round(weeklyData.reduce((sum, d) => sum + d.calories, 0) / 7),
    protein: Math.round(weeklyData.reduce((sum, d) => sum + d.protein, 0) / 7),
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Progress</Text>
            <Text className="text-sm text-muted">Your nutrition stats</Text>
          </View>

          {/* View Mode Toggle */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setViewMode("daily")}
              className={`flex-1 rounded-full py-3 items-center border ${
                viewMode === "daily"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <Text
                className={`font-semibold ${
                  viewMode === "daily" ? "text-background" : "text-foreground"
                }`}
              >
                Daily
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setViewMode("weekly")}
              className={`flex-1 rounded-full py-3 items-center border ${
                viewMode === "weekly"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              }`}
            >
              <Text
                className={`font-semibold ${
                  viewMode === "weekly" ? "text-background" : "text-foreground"
                }`}
              >
                Weekly
              </Text>
            </Pressable>
          </View>

          {/* Daily View */}
          {viewMode === "daily" && (
            <View className="gap-4">
              <Text className="text-lg font-semibold text-foreground">Today's Summary</Text>

              {/* Calories */}
              <View className="w-full bg-surface rounded-2xl p-6 border border-border">
                <Text className="text-sm text-muted mb-2">Calories</Text>
                <View className="flex-row items-baseline gap-2">
                  <Text className="text-4xl font-bold text-foreground">{dailyStats.calories}</Text>
                  <Text className="text-sm text-muted">kcal</Text>
                </View>
              </View>

              {/* Macros Grid */}
              <View className="flex-row gap-3">
                {/* Protein */}
                <View className="flex-1 bg-primary/10 rounded-2xl p-4 border border-primary">
                  <Text className="text-xs text-muted mb-1">Protein</Text>
                  <View className="flex-row items-baseline gap-1">
                    <Text className="text-2xl font-bold text-primary">{dailyStats.protein}</Text>
                    <Text className="text-xs text-muted">g</Text>
                  </View>
                </View>

                {/* Carbs */}
                <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
                  <Text className="text-xs text-muted mb-1">Carbs</Text>
                  <View className="flex-row items-baseline gap-1">
                    <Text className="text-2xl font-bold text-foreground">{dailyStats.carbs}</Text>
                    <Text className="text-xs text-muted">g</Text>
                  </View>
                </View>

                {/* Fats */}
                <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
                  <Text className="text-xs text-muted mb-1">Fats</Text>
                  <View className="flex-row items-baseline gap-1">
                    <Text className="text-2xl font-bold text-foreground">{dailyStats.fats}</Text>
                    <Text className="text-xs text-muted">g</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Weekly View */}
          {viewMode === "weekly" && (
            <View className="gap-4">
              <Text className="text-lg font-semibold text-foreground">Weekly Average</Text>

              {/* Weekly Summary Cards */}
              <View className="gap-3">
                <View className="w-full bg-surface rounded-2xl p-6 border border-border">
                  <Text className="text-sm text-muted mb-2">Avg Calories</Text>
                  <View className="flex-row items-baseline gap-2">
                    <Text className="text-4xl font-bold text-foreground">
                      {weeklyAverage.calories}
                    </Text>
                    <Text className="text-sm text-muted">kcal</Text>
                  </View>
                </View>

                <View className="w-full bg-primary/10 rounded-2xl p-6 border border-primary">
                  <Text className="text-sm text-muted mb-2">Avg Protein</Text>
                  <View className="flex-row items-baseline gap-2">
                    <Text className="text-4xl font-bold text-primary">
                      {weeklyAverage.protein}
                    </Text>
                    <Text className="text-sm text-muted">g</Text>
                  </View>
                </View>
              </View>

              {/* Weekly Breakdown */}
              <Text className="text-sm font-semibold text-foreground mt-2">Daily Breakdown</Text>
              <View className="gap-2">
                {weeklyData.map((day, idx) => (
                  <View
                    key={idx}
                    className="flex-row items-center justify-between bg-surface rounded-lg p-3 border border-border"
                  >
                    <Text className="font-semibold text-foreground w-12">{day.day}</Text>
                    <View className="flex-1 flex-row gap-4 ml-4">
                      <View className="flex-1">
                        <Text className="text-xs text-muted">Calories</Text>
                        <Text className="text-sm font-semibold text-foreground">{day.calories}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-xs text-muted">Protein</Text>
                        <Text className="text-sm font-semibold text-primary">{day.protein}g</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Back Button */}
          <Pressable
            onPress={() => router.push("/")}
            className="w-full bg-surface rounded-full py-4 items-center border border-border active:opacity-70 mt-4"
          >
            <Text className="text-lg font-semibold text-foreground">Back to Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
