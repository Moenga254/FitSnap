import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';
import { MacroCard } from '../components/constants/MacroCard.tsx';
import { CalorieRing } from '../components/constants/CalorieRing.tsx';
import { useAppState } from '../hooks/useAppState';

const SEED_MEALS = [
  { emoji: '🥩', name: 'Nyama Choma', time: '8:30 AM', cals: 520 },
  { emoji: '🍚', name: 'Pilau Rice', time: '1:15 PM', cals: 580 },
  { emoji: '🫘', name: 'Githeri', time: '4:00 PM', cals: 420 },
];

export default function HomeScreen() {
  const router = useRouter();
  const { todayLog, userGoals, getInsightMessage } = useAppState();

  const consumed = todayLog.totalCalories || 1520;
  const protein  = todayLog.totalProtein  || 124;
  const carbs    = todayLog.totalCarbs    || 188;
  const fats     = todayLog.totalFats     || 48;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.topbar}>
          <View>
            <Text style={styles.logo}>FITSNAP</Text>
            <Text style={styles.greeting}>Habari, Alex 👋</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AJ</Text>
          </View>
        </View>

        {/* Calorie card */}
        <CalorieRing consumed={consumed} target={userGoals.calorieTarget} />

        {/* Insight */}
        <View style={styles.insightCard}>
          <Text style={styles.insightText}>{getInsightMessage()}</Text>
        </View>

        {/* Macros */}
        <Text style={styles.sectionTitle}>TODAY'S MACROS</Text>
        <View style={styles.macroRow}>
          <MacroCard
            label="Protein"
            value={protein}
            color={Colors.protein}
            progress={protein / userGoals.proteinTarget}
          />
          <MacroCard
            label="Carbs"
            value={carbs}
            color={Colors.carbs}
            progress={carbs / userGoals.carbsTarget}
          />
          <MacroCard
            label="Fats"
            value={fats}
            color={Colors.fats}
            progress={fats / userGoals.fatsTarget}
          />
        </View>

        {/* Scan button */}
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => router.push('/scan')}
          activeOpacity={0.85}
        >
          <Text style={styles.scanBtnText}>📸  SCAN YOUR MEAL</Text>
        </TouchableOpacity>

        {/* Today's meals */}
        <Text style={styles.sectionTitle}>TODAY'S MEALS</Text>
        {SEED_MEALS.map((meal, i) => (
          <View key={i} style={styles.mealItem}>
            <Text style={styles.mealEmoji}>{meal.emoji}</Text>
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealTime}>{meal.time}</Text>
            </View>
            <Text style={styles.mealCals}>{meal.cals}</Text>
          </View>
        ))}

        {todayLog.entries.map((entry) => (
          <View key={entry.id} style={styles.mealItem}>
            <Text style={styles.mealEmoji}>🍽️</Text>
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{entry.mealName}</Text>
              <Text style={styles.mealTime}>
                {new Date(entry.timestamp).toLocaleTimeString([], {
                  hour: '2-digit', minute: '2-digit',
                })}
              </Text>
            </View>
            <Text style={styles.mealCals}>{Math.round(entry.calories)}</Text>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: Colors.bg },
  scroll:  { flex: 1 },
  topbar:  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  logo: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 4,
    color: Colors.accent,
  },
  greeting: { fontSize: FontSize.sm, color: Colors.muted, marginTop: 2 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#000', fontWeight: '700', fontSize: FontSize.sm },
  insightCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    backgroundColor: 'rgba(200,245,90,0.08)',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(200,245,90,0.2)',
  },
  insightText: { fontSize: FontSize.sm, color: Colors.accent, fontWeight: '500' },
  sectionTitle: {
    fontSize: FontSize.xs,
    letterSpacing: 2,
    color: Colors.muted,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: Spacing.lg,
  },
  scanBtn: {
    margin: Spacing.lg,
    marginTop: Spacing.xl,
    backgroundColor: Colors.accent,
    borderRadius: Radius.lg,
    padding: 18,
    alignItems: 'center',
  },
  scanBtnText: {
    color: '#000',
    fontWeight: '900',
    fontSize: FontSize.lg,
    letterSpacing: 2,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: 10,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mealEmoji: { fontSize: 26, marginRight: 12 },
  mealInfo:  { flex: 1 },
  mealName:  { fontSize: FontSize.md, fontWeight: '500', color: Colors.text },
  mealTime:  { fontSize: FontSize.xs, color: Colors.muted, marginTop: 2 },
  mealCals:  { fontSize: 20, fontWeight: '700', color: Colors.accent2 },
});