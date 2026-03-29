import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';
import { useAppState } from '../hooks/useAppState';

const GOALS = [
  {
    id: 'muscle' as const,
    icon: '💪',
    name: 'Build Muscle',
    desc: 'High protein, calorie surplus',
    tip: 'Add nyama choma, tilapia, or eggs to every meal.',
  },
  {
    id: 'lose' as const,
    icon: '🔥',
    name: 'Lose Weight',
    desc: 'Calorie deficit, moderate protein',
    tip: 'Choose sukuma wiki, githeri, or ugali with less sauce.',
  },
  {
    id: 'maintain' as const,
    icon: '⚖️',
    name: 'Maintain',
    desc: 'Balanced macros, TDEE calories',
    tip: 'Enjoy pilau, ugali & stew — just watch portion sizes.',
  },
];

const PRESETS = {
  muscle:   { cals: '2,400', prot: '150g', carbs: '300g', fats: '70g' },
  lose:     { cals: '1,800', prot: '140g', carbs: '180g', fats: '55g' },
  maintain: { cals: '2,200', prot: '120g', carbs: '260g', fats: '65g' },
};

export default function GoalsScreen() {
  const { userGoals, saveGoals } = useAppState();
  const [selected, setSelected] = useState<'muscle' | 'lose' | 'maintain'>(
    userGoals.goal
  );
  const [saving, setSaving] = useState(false);

  const targets = PRESETS[selected];
  const selectedGoal = GOALS.find(g => g.id === selected)!;

  async function handleSave() {
    setSaving(true);
    await saveGoals(selected);
    setSaving(false);
    Alert.alert('✅ Goals saved', `Switched to ${selectedGoal.name} mode.`);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>GOALS</Text>

        {/* Goal options */}
        <View style={styles.goalList}>
          {GOALS.map(goal => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalCard,
                selected === goal.id && styles.goalCardActive,
              ]}
              onPress={() => setSelected(goal.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.goalIcon}>{goal.icon}</Text>
              <View style={styles.goalInfo}>
                <Text style={styles.goalName}>{goal.name}</Text>
                <Text style={styles.goalDesc}>{goal.desc}</Text>
              </View>
              <View style={[
                styles.check,
                selected === goal.id && styles.checkActive,
              ]}>
                {selected === goal.id && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* African food tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipLabel}>🌍  AFRICAN DIET TIP</Text>
          <Text style={styles.tipText}>{selectedGoal.tip}</Text>
        </View>

        {/* Daily targets */}
        <Text style={styles.sectionTitle}>DAILY TARGETS</Text>
        <View style={styles.targetsCard}>
          {[
            { label: 'Calories', val: targets.cals,  color: Colors.accent },
            { label: 'Protein',  val: targets.prot,  color: Colors.protein },
            { label: 'Carbs',    val: targets.carbs, color: Colors.carbs },
            { label: 'Fats',     val: targets.fats,  color: Colors.fats },
          ].map(t => (
            <View key={t.label} style={styles.targetRow}>
              <Text style={styles.targetLabel}>{t.label}</Text>
              <Text style={[styles.targetVal, { color: t.color }]}>
                {t.val}
              </Text>
            </View>
          ))}
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveBtnText}>
            {saving ? 'SAVING...' : 'SAVE GOALS'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  title: {
    fontSize: 30, fontWeight: '900', letterSpacing: 3,
    color: Colors.text, paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg, paddingBottom: Spacing.md,
  },
  goalList: { marginHorizontal: Spacing.lg, gap: 10 },
  goalCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.lg, padding: Spacing.base, gap: 14,
  },
  goalCardActive: {
    borderColor: Colors.accent,
    backgroundColor: 'rgba(200,245,90,0.05)',
  },
  goalIcon: { fontSize: 28 },
  goalInfo: { flex: 1 },
  goalName: { fontSize: FontSize.base, fontWeight: '600', color: Colors.text },
  goalDesc: { fontSize: FontSize.sm, color: Colors.muted, marginTop: 2 },
  check: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  checkMark: { color: '#000', fontSize: 12, fontWeight: '700' },
  tipCard: {
    margin: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tipLabel: {
    fontSize: FontSize.xs, letterSpacing: 1,
    color: Colors.accent, marginBottom: 6,
  },
  tipText: { fontSize: FontSize.md, color: Colors.text, lineHeight: 22 },
  sectionTitle: {
    fontSize: FontSize.xs, letterSpacing: 2, color: Colors.muted,
    marginHorizontal: Spacing.lg, marginBottom: Spacing.md,
  },
  targetsCard: {
    marginHorizontal: Spacing.lg, marginBottom: Spacing.lg,
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: Spacing.base, borderWidth: 1, borderColor: Colors.border,
  },
  targetRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  targetLabel: { fontSize: FontSize.md, color: Colors.muted },
  targetVal:   { fontSize: 22, fontWeight: '800' },
  saveBtn: {
    marginHorizontal: Spacing.lg, backgroundColor: Colors.accent,
    borderRadius: Radius.lg, padding: 18, alignItems: 'center',
  },
  saveBtnText: {
    color: '#000', fontWeight: '900',
    fontSize: FontSize.lg, letterSpacing: 2,
  },
});