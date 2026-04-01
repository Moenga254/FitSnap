import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

/**
 * Results Screen
 * Displays nutrition analysis and AI feedback for a meal
 */
export default function ResultsScreen() {
  const router = useRouter();
  const colors = useColors();
  const params = useLocalSearchParams();

  // Parse mock data from route params
  const nutritionData = {
    calories: params.calories ? parseInt(params.calories as string) : 450,
    protein: params.protein ? parseInt(params.protein as string) : 35,
    carbs: params.carbs ? parseInt(params.carbs as string) : 55,
    fats: params.fats ? parseInt(params.fats as string) : 12,
  };

  const feedback = (params.feedback as string) || "High carbs, low protein. Add more chicken!";

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Nutrition Analysis</Text>
            <Text className="text-sm text-muted">Meal breakdown</Text>
          </View>

          {/* Meal Photo Placeholder */}
          <View className="w-full h-40 bg-surface rounded-2xl border border-border items-center justify-center">
            <Text className="text-5xl">🍽️</Text>
          </View>

          {/* Calories Card */}
          <View className="w-full bg-surface rounded-2xl p-6 border border-border">
            <Text className="text-sm text-muted mb-2">Calories</Text>
            <View className="flex-row items-baseline gap-2">
              <Text className="text-4xl font-bold text-foreground">{nutritionData.calories}</Text>
              <Text className="text-sm text-muted">kcal</Text>
            </View>
          </View>

          {/* Protein Highlight */}
          <View className="w-full bg-primary/10 rounded-2xl p-6 border border-primary">
            <Text className="text-sm text-muted mb-2">PROTEIN</Text>
            <View className="flex-row items-baseline gap-2">
              <Text className="text-5xl font-bold text-primary">{nutritionData.protein}</Text>
              <Text className="text-lg text-muted">g</Text>
            </View>
          </View>

          {/* Carbs & Fats Row */}
          <View className="flex-row gap-4">
            {/* Carbs */}
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-xs text-muted mb-2">Carbs</Text>
              <View className="flex-row items-baseline gap-1">
                <Text className="text-2xl font-bold text-foreground">{nutritionData.carbs}</Text>
                <Text className="text-xs text-muted">g</Text>
              </View>
            </View>

            {/* Fats */}
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-xs text-muted mb-2">Fats</Text>
              <View className="flex-row items-baseline gap-1">
                <Text className="text-2xl font-bold text-foreground">{nutritionData.fats}</Text>
                <Text className="text-xs text-muted">g</Text>
              </View>
            </View>
          </View>

          {/* AI Feedback */}
          <View className="w-full bg-warning/10 rounded-2xl p-4 border border-warning">
            <Text className="text-sm text-center text-foreground">{feedback}</Text>
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={() => router.push("/")}
              style={({ pressed }) => [
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
              className="w-full rounded-full py-4 items-center"
            >
              <Text className="text-lg font-semibold text-background">Add to Daily Log</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/scan")}
              className="w-full bg-surface rounded-full py-4 items-center border border-border active:opacity-70"
            >
              <Text className="text-lg font-semibold text-foreground">Retake Photo</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
