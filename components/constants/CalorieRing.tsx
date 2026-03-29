import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '../../constants/theme';

interface CalorieRingProps {
  consumed: number;
  target: number;
}

export function CalorieRing({ consumed, target }: CalorieRingProps) {
  const pct = Math.min(100, Math.round((consumed / target) * 100));
  const remaining = Math.max(0, target - consumed);
  const over = consumed > target;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Calories consumed</Text>
      <Text style={[styles.big, { color: over ? Colors.accent2 : Colors.accent }]}>
        {consumed.toLocaleString()}
      </Text>
      <Text style={styles.target}>of {target.toLocaleString()} kcal goal</Text>

      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            {
              width: `${pct}%`,
              backgroundColor: over ? Colors.accent2 : Colors.accent,
            },
          ]}
        />
      </View>

      <View style={styles.insightRow}>
        <View style={[styles.dot, { backgroundColor: over ? Colors.accent2 : Colors.accent }]} />
        <Text style={[styles.insightText, { color: over ? Colors.accent2 : Colors.accent }]}>
          {over
            ? `${(consumed - target).toLocaleString()} kcal over goal`
            : `${remaining.toLocaleString()} kcal remaining`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    marginBottom: 0,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.muted,
    marginBottom: 4,
  },
  big: {
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 58,
  },
  target: {
    fontSize: FontSize.sm,
    color: Colors.muted,
    marginTop: 4,
  },
  barBg: {
    marginTop: 16,
    height: 6,
    backgroundColor: Colors.surface2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    borderRadius: 6,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  insightText: {
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
});