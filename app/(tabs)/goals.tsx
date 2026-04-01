import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

/**
 * Goals Setup Screen
 * Allows users to set fitness goals and daily targets
 */
export default function GoalsScreen() {
  const router = useRouter();
  const colors = useColors();

  const [selectedGoal, setSelectedGoal] = useState<"lose" | "build" | "maintain">("build");
  const [calorieTarget, setCalorieTarget] = useState("2500");
  const [proteinTarget, setProteinTarget] = useState("120");

  const goals = [
    { id: "lose", label: "Lose Weight", icon: "📉" },
    { id: "build", label: "Build Muscle", icon: "💪" },
    { id: "maintain", label: "Maintain", icon: "⚖️" },
  ];

  const handleSaveGoals = () => {
    // In a real app, this would save to AsyncStorage or backend
    console.log("Goals saved:", {
      goal: selectedGoal,
      calories: calorieTarget,
      protein: proteinTarget,
    });
    router.push("/");
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Set Your Goals</Text>
            <Text className="text-sm text-muted">Choose your fitness goal</Text>
          </View>

          {/* Goal Selection */}
          <View className="gap-3">
            {goals.map((goal) => (
              <Pressable
                key={goal.id}
                onPress={() => setSelectedGoal(goal.id as "lose" | "build" | "maintain")}
                className={`w-full rounded-2xl p-4 border-2 ${
                  selectedGoal === goal.id
                    ? "bg-primary/10 border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-3xl">{goal.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-foreground">{goal.label}</Text>
                  </View>
                  {selectedGoal === goal.id && (
                    <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                      <Text className="text-white text-sm">✓</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </View>

          {/* Daily Targets */}
          <View className="gap-4">
            <Text className="text-lg font-semibold text-foreground">Daily Targets</Text>

            {/* Calorie Target */}
            <View className="gap-2">
              <Text className="text-sm text-muted">Daily Calories</Text>
              <View className="flex-row items-center bg-surface rounded-2xl border border-border px-4 py-3">
                <TextInput
                  value={calorieTarget}
                  onChangeText={setCalorieTarget}
                  keyboardType="number-pad"
                  placeholder="2500"
                  placeholderTextColor={colors.muted}
                  className="flex-1 text-lg font-semibold text-foreground"
                />
                <Text className="text-sm text-muted">kcal</Text>
              </View>
            </View>

            {/* Protein Target */}
            <View className="gap-2">
              <Text className="text-sm text-muted">Daily Protein</Text>
              <View className="flex-row items-center bg-surface rounded-2xl border border-border px-4 py-3">
                <TextInput
                  value={proteinTarget}
                  onChangeText={setProteinTarget}
                  keyboardType="number-pad"
                  placeholder="120"
                  placeholderTextColor={colors.muted}
                  className="flex-1 text-lg font-semibold text-foreground"
                />
                <Text className="text-sm text-muted">g</Text>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <Pressable
            onPress={handleSaveGoals}
            style={({ pressed }) => [
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
            className="w-full rounded-full py-4 items-center mt-4"
          >
            <Text className="text-lg font-semibold text-background">Save Goals</Text>
          </Pressable>

          {/* Cancel Button */}
          <Pressable
            onPress={() => router.push("/")}
            className="w-full bg-surface rounded-full py-4 items-center border border-border active:opacity-70"
          >
            <Text className="text-lg font-semibold text-foreground">Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
