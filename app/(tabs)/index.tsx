import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

/**
 * Home Screen (Dashboard)
 * Displays daily nutrition progress and quick actions
 */
export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();

  // Mock data for today's nutrition
  const dailyData = {
    calories: { consumed: 2100, target: 2500 },
    protein: { consumed: 85, target: 120 },
    carbs: { consumed: 250, target: 300 },
    fats: { consumed: 65, target: 80 },
  };

  // Calculate progress percentages
  const calorieProgress = (dailyData.calories.consumed / dailyData.calories.target) * 100;
  const proteinProgress = (dailyData.protein.consumed / dailyData.protein.target) * 100;

  // Determine feedback message
  const proteinDeficit = dailyData.protein.target - dailyData.protein.consumed;
  const feedbackMessage =
    proteinDeficit > 0
      ? `You need ${proteinDeficit}g more protein today`
      : "Great! You've met your protein goal 🎉";

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">FitSnap</Text>
            <Text className="text-sm text-muted">Today's Progress</Text>
          </View>

          {/* Calories Progress Card */}
          <View className="w-full bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-sm text-muted mb-3">Daily Calories</Text>
            <View className="gap-2">
              {/* Progress bar */}
              <View className="w-full h-2 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                />
              </View>
              {/* Stats */}
              <View className="flex-row justify-between items-baseline">
                <Text className="text-2xl font-bold text-foreground">
                  {dailyData.calories.consumed}
                </Text>
                <Text className="text-sm text-muted">/ {dailyData.calories.target} cal</Text>
              </View>
            </View>
          </View>

          {/* Protein Highlight Card */}
          <View className="w-full bg-primary/10 rounded-2xl p-6 border border-primary">
            <Text className="text-sm text-muted mb-2">PROTEIN</Text>
            <View className="flex-row items-baseline gap-2">
              <Text className="text-5xl font-bold text-primary">{dailyData.protein.consumed}</Text>
              <Text className="text-lg text-muted">g</Text>
            </View>
            <Text className="text-xs text-muted mt-2">Target: {dailyData.protein.target}g</Text>
          </View>

          {/* Carbs & Fats Row */}
          <View className="flex-row gap-4">
            {/* Carbs */}
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-xs text-muted mb-2">Carbs</Text>
              <View className="flex-row items-baseline gap-1">
                <Text className="text-2xl font-bold text-foreground">{dailyData.carbs.consumed}</Text>
                <Text className="text-xs text-muted">g</Text>
              </View>
              <Text className="text-xs text-muted mt-1">Target: {dailyData.carbs.target}g</Text>
            </View>

            {/* Fats */}
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-xs text-muted mb-2">Fats</Text>
              <View className="flex-row items-baseline gap-1">
                <Text className="text-2xl font-bold text-foreground">{dailyData.fats.consumed}</Text>
                <Text className="text-xs text-muted">g</Text>
              </View>
              <Text className="text-xs text-muted mt-1">Target: {dailyData.fats.target}g</Text>
            </View>
          </View>

          {/* Feedback Message */}
          <View className="w-full bg-surface rounded-2xl p-4 border border-border">
            <Text className="text-sm text-center text-foreground">{feedbackMessage}</Text>
          </View>

          {/* Primary Action Button */}
          <Pressable
            onPress={() => router.push("/scan")}
            style={({ pressed }) => [
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
            className="w-full rounded-full py-4 items-center"
          >
            <Text className="text-lg font-semibold text-background">Scan Meal</Text>
          </Pressable>

          {/* Secondary Actions */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => router.push("/goals")}
              className="flex-1 bg-surface rounded-full py-3 items-center border border-border active:opacity-70"
            >
              <Text className="text-sm font-semibold text-foreground">Goals</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/progress")}
              className="flex-1 bg-surface rounded-full py-3 items-center border border-border active:opacity-70"
            >
              <Text className="text-sm font-semibold text-foreground">Progress</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
