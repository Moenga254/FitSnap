import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  SafeAreaView, TouchableOpacity,
} from 'react-native';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';
import { MacroCard } from '../components/constants/MacroCard.tsx';

const WEEKLY_DATA = [
  { day: 'M', cals: 2100 },
  { day: 'T', cals: 2380 },
  { day: 'W', cals: 2680 },
  { day: 'T', cals: 2200 },
  { day: 'F', cals: 2450 },
  { day: 'S', cals: 1900 },
  { day: 'S', cals: 1640, isToday: true },
];

const GOAL = 2400;
const MAX_VAL = Math.max(...WEEKLY_DATA.map(d => d.cals), GOAL);

const HIGHLIGHTS = [
  { text: 'Protein goal hit 5/7 days', type: 'good' },
  { text: 'Avg 2,193 kcal / day',      type: 'good' },
  { text: 'High carbs: Wednesday',      type: 'warn' },
  { text: '12 African meals logged',    type: 'good' },
  { text: 'Top food: Nyama Choma',      type: 'info' },
];

export default function ProgressScreen() {
  const [period, setPeriod] = useState<'weekly' | 'daily'>('weekly');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>PROGRESS</Text>

        {/* Period toggle */}
        <View style={styles.toggleRow}>
          {(['weekly', 'daily'] as const).map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.toggleBtn, period === p && styles.toggleBtnActive]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[
                styles.toggleLabel,
                period === p && styles.toggleLabelActive,
              ]}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Streak */}
        <View style={styles.streakCard}>
          <View>
            <Text style={styles.streakNum}>7</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
            <Text style={styles.streakSub}>Personal best: 14 days</Text>
          </View>
          <Text style={styles.streakFire}>🔥</Text>
        </View>

        {/* Bar chart */}
        <Text style={styles.sectionTitle}>CALORIES THIS WEEK</Text>
        <View style={styles.chartCard}>
          <View style={styles.barsRow}>
            {WEEKLY_DATA.map((d, i) => {
              const heightPct = (d.cals / MAX_VAL) * 100;
              const over = d.cals > GOAL;
              const barColor = d.isToday
                ? (over ? Colors.accent2 : Colors.accent)
                : 'rgba(200,245,90,0.35)';
              return (
                <View key={i} style={styles.barCol}>
                  <Text style={styles.barValue}>
                    {Math.round(d.cals / 100) / 10}k
                  </Text>
                  <View style={styles.barBg}>
                    <View style={[
                      styles.barFill,
                      {
                        height: `${Math.round(heightPct)}%`,
                        backgroundColor: barColor,
                      },
                    ]} />
                  </View>
                  <Text style={[
                    styles.barDay,
                    d.isToday && { color: Colors.accent },
                  ]}>
                    {d.day}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            {[
              { color: Colors.accent,              label: 'Today' },
              { color: 'rgba(200,245,90,0.35)',    label: 'Other days' },
              { color: Colors.accent2,             label: 'Over goal' },
            ].map(l => (
              <View key={l.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                <Text style={styles.legendText}>{l.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Highlights */}
        <Text style={styles.sectionTitle}>WEEKLY HIGHLIGHTS</Text>
        <View style={styles.tagsRow}>
          {HIGHLIGHTS.map((h, i) => (
            <View key={i} style={[
              styles.tag,
              h.type === 'good' && styles.tagGood,
              h.type === 'warn' && styles.tagWarn,
            ]}>
              <Text style={[
                styles.tagText,
                h.type === 'good' && styles.tagTextGood,
                h.type === 'warn' && styles.tagTextWarn,
              ]}>
                {h.text}
              </Text>
            </View>
          ))}
        </View>

        {/* Weekly macro averages */}
        <Text style={styles.sectionTitle}>WEEKLY MACRO AVERAGES</Text>
        <View style={styles.macroRow}>
          <MacroCard label="Protein" value={134} color={Colors.protein} progress={134 / 150} />
          <MacroCard label="Carbs"   value={270} color={Colors.carbs}   progress={270 / 300} />
          <MacroCard label="Fats"    value={61}  color={Colors.fats}    progress={61 / 70} />
        </View>

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
    paddingTop: Spacing.lg, paddingBottom: Spacing.sm,
  },
  toggleRow: {
    flexDirection: 'row', gap: 10,
    marginHorizontal: Spacing.lg, marginBottom: Spacing.md,
  },
  toggleBtn: {
    backgroundColor: Colors.surface, borderWidth: 1,
    borderColor: Colors.border, borderRadius: Radius.full,
    paddingHorizontal: 18, paddingVertical: 8,
  },
  toggleBtnActive: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  toggleLabel:     { fontSize: FontSize.sm, color: Colors.muted },
  toggleLabelActive: { color: '#000', fontWeight: '700' },
  streakCard: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg, marginBottom: Spacing.lg,
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: Spacing.lg, borderWidth: 1, borderColor: Colors.border,
  },
  streakNum:  { fontSize: 52, fontWeight: '900', color: Colors.accent2, lineHeight: 56 },
  streakLabel: { fontSize: FontSize.base, fontWeight: '600', color: Colors.text },
  streakSub:  { fontSize: FontSize.sm, color: Colors.muted, marginTop: 2 },
  streakFire: { fontSize: 36 },
  sectionTitle: {
    fontSize: FontSize.xs, letterSpacing: 2, color: Colors.muted,
    marginHorizontal: Spacing.lg, marginBottom: Spacing.md,
  },
  chartCard: {
    marginHorizontal: Spacing.lg, marginBottom: Spacing.lg,
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: Spacing.base, borderWidth: 1, borderColor: Colors.border,
  },
  barsRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    height: 110, gap: 6, marginBottom: 10,
  },
  barCol:  { flex: 1, alignItems: 'center', gap: 4, height: '100%' },
  barValue: { fontSize: 8, color: Colors.muted },
  barBg: {
    flex: 1, width: '100%', backgroundColor: Colors.surface2,
    borderRadius: 6, overflow: 'hidden', justifyContent: 'flex-end',
  },
  barFill:  { width: '100%', borderRadius: 6 },
  barDay:   { fontSize: 10, color: Colors.muted },
  legend: {
    flexDirection: 'row', gap: 12,
    justifyContent: 'center', marginTop: 6,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot:  { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: FontSize.xs, color: Colors.muted },
  tagsRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8,
    marginHorizontal: Spacing.lg, marginBottom: Spacing.lg,
  },
  tag: {
    backgroundColor: Colors.surface, borderWidth: 1,
    borderColor: Colors.border, borderRadius: Radius.full,
    paddingHorizontal: 14, paddingVertical: 6,
  },
  tagGood: {
    backgroundColor: 'rgba(200,245,90,0.1)',
    borderColor: 'rgba(200,245,90,0.2)',
  },
  tagWarn: {
    backgroundColor: 'rgba(255,122,60,0.1)',
    borderColor: 'rgba(255,122,60,0.2)',
  },
  tagText:     { fontSize: FontSize.sm, color: Colors.muted },
  tagTextGood: { color: Colors.accent },
  tagTextWarn: { color: Colors.accent2 },
  macroRow: {
    flexDirection: 'row', gap: 10, marginHorizontal: Spacing.lg,
  },
});