import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, FontSize } from '../../constants/theme';

interface MacroCardProps {
  label: string;
  value: number;
  unit?: string;
  color: string;
  progress: number;
}

export function MacroCard({ label, value, unit = 'g', color, progress }: MacroCardProps) {
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <Text style={[styles.value, { color }]}>
        {Math.round(value)}
        <Text style={styles.unit}>{unit}</Text>
      </Text>
      <View style={styles.barBg}>
        <View
          style={[
            styles.barFill,
            {
              width: `${Math.round(clamped * 100)}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: FontSize.xs,
    letterSpacing: 1,
    color: Colors.muted,
    marginBottom: 6,
  },
  value: {
    fontSize: 26,
    fontWeight: '700',
  },
  unit: {
    fontSize: FontSize.xs,
    color: Colors.muted,
    fontWeight: '400',
  },
  barBg: {
    height: 3,
    backgroundColor: Colors.surface2,
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: 3,
    borderRadius: 4,
  },
});