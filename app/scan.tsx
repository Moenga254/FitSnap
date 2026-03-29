import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Image, ActivityIndicator,
  Alert, ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import { Colors, FontSize, Spacing, Radius } from '../constants/theme';
import { analyzeImageWithClaude, getMockAnalysis, MealAnalysisResult } from '../services/claudeService';
import { useAppState } from '../hooks/useAppState';

const STEPS = [
  'Identifying foods...',
  'Estimating portions...',
  'Calculating macros...',
  'Generating insights...',
];

export default function ScanScreen() {
  const router = useRouter();
  const { userGoals, addMealEntry } = useAppState();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<MealAnalysisResult | null>(null);
  const [adding, setAdding] = useState(false);

  async function pickFromLibrary() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'FitSnap needs photo library access.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled && res.assets[0]) {
      setImageUri(res.assets[0].uri);
      setResult(null);
    }
  }

  async function pickFromCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'FitSnap needs camera access.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!res.canceled && res.assets[0]) {
      setImageUri(res.assets[0].uri);
      setResult(null);
    }
  }

  async function analyze() {
    setAnalyzing(true);
    setStep(0);
    setResult(null);

    const stepInterval = setInterval(() => {
      setStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }, 800);

    try {
      let analysis: MealAnalysisResult;

      if (imageUri) {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
          encoding: 'base64',
        });
        analysis = await analyzeImageWithClaude(
          base64,
          'image/jpeg',
          userGoals.goal
        );
      } else {
        await new Promise(r => setTimeout(r, 3000));
        analysis = getMockAnalysis(userGoals.goal);
      }

      clearInterval(stepInterval);
      setResult(analysis);
    } catch (err) {
      clearInterval(stepInterval);
      setResult(getMockAnalysis(userGoals.goal));
    } finally {
      setAnalyzing(false);
    }
  }

  async function addToLog() {
    if (!result) return;
    setAdding(true);
    await addMealEntry({
      mealName: result.mealName,
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fats: result.fats,
      imageUri: imageUri ?? undefined,
    });
    setAdding(false);
    setImageUri(null);
    setResult(null);
    router.push('/');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>SCAN MEAL</Text>

        {/* Upload zone */}
        <TouchableOpacity
          style={styles.uploadZone}
          onPress={pickFromLibrary}
          activeOpacity={0.8}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.preview}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>Tap to upload a meal photo</Text>
              <Text style={styles.uploadSub}>
                Supports ugali, jollof, nyama choma & more
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={pickFromCamera}>
            <Text style={styles.actionBtnText}>📸  Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={pickFromLibrary}>
            <Text style={styles.actionBtnText}>📁  Library</Text>
          </TouchableOpacity>
        </View>

        {/* Analyze button */}
        <TouchableOpacity
          style={[styles.analyzeBtn, analyzing && styles.analyzeBtnDisabled]}
          onPress={analyze}
          disabled={analyzing}
          activeOpacity={0.85}
        >
          <Text style={styles.analyzeBtnText}>
            {imageUri ? 'ANALYZE MEAL' : 'TRY DEMO MEAL'}
          </Text>
        </TouchableOpacity>

        {/* Loading */}
        {analyzing && (
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={Colors.accent} />
            <Text style={styles.loadingText}>AI is analyzing your meal...</Text>
            <Text style={styles.loadingStep}>{STEPS[step]}</Text>
          </View>
        )}

        {/* Result */}
        {result && !analyzing && (
          <View style={styles.resultCard}>
            <Text style={styles.resultName}>{result.mealName}</Text>
            {result.region && (
              <Text style={styles.resultRegion}>📍 {result.region}</Text>
            )}
            <Text style={styles.resultConf}>
              Identified with {result.confidence} confidence
            </Text>

            <View style={styles.calBig}>
              <Text style={styles.calNum}>{Math.round(result.calories)}</Text>
              <Text style={styles.calLabel}>Calories</Text>
            </View>

            <View style={styles.resultMacros}>
              {[
                { label: 'PROTEIN', val: result.protein, color: Colors.protein },
                { label: 'CARBS',   val: result.carbs,   color: Colors.carbs },
                { label: 'FATS',    val: result.fats,    color: Colors.fats },
              ].map(m => (
                <View key={m.label} style={styles.resultMacro}>
                  <Text style={[styles.resultMacroVal, { color: m.color }]}>
                    {Math.round(m.val)}
                  </Text>
                  <Text style={styles.resultMacroLabel}>{m.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.feedback}>
              <Text style={styles.feedbackLabel}>AI FEEDBACK</Text>
              <Text style={styles.feedbackText}>{result.feedback}</Text>
            </View>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={addToLog}
              disabled={adding}
            >
              <Text style={styles.addBtnText}>
                {adding ? 'ADDING...' : '+ ADD TO DAILY LOG'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

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
  uploadZone: {
    margin: Spacing.lg,
    borderWidth: 2,
    borderColor: 'rgba(200,245,90,0.3)',
    borderStyle: 'dashed',
    borderRadius: Radius.xl,
    minHeight: 200,
    overflow: 'hidden',
    backgroundColor: 'rgba(200,245,90,0.03)',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  uploadIcon: { fontSize: 40, marginBottom: 12 },
  uploadText: {
    fontSize: FontSize.md, color: Colors.muted, textAlign: 'center',
  },
  uploadSub: {
    fontSize: FontSize.xs, color: Colors.muted,
    marginTop: 6, opacity: 0.6, textAlign: 'center',
  },
  preview: { width: '100%', height: 240 },
  actionRow: {
    flexDirection: 'row', gap: 10, marginHorizontal: Spacing.lg,
  },
  actionBtn: {
    flex: 1, backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.lg, padding: 14, alignItems: 'center',
  },
  actionBtnText: {
    color: Colors.text, fontSize: FontSize.md, fontWeight: '500',
  },
  analyzeBtn: {
    margin: Spacing.lg, backgroundColor: Colors.accent,
    borderRadius: Radius.lg, padding: 18, alignItems: 'center',
  },
  analyzeBtnDisabled: { backgroundColor: Colors.surface2 },
  analyzeBtnText: {
    color: '#000', fontWeight: '900',
    fontSize: FontSize.lg, letterSpacing: 2,
  },
  loadingCard: {
    marginHorizontal: Spacing.lg, backgroundColor: Colors.surface,
    borderRadius: Radius.lg, padding: Spacing.xl,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  loadingText: { fontSize: FontSize.md, color: Colors.muted, marginTop: 14 },
  loadingStep: { fontSize: FontSize.sm, color: Colors.accent, marginTop: 6 },
  resultCard: {
    marginHorizontal: Spacing.lg, backgroundColor: Colors.surface,
    borderRadius: Radius.xl, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.border,
  },
  resultName:   { fontSize: 22, fontWeight: '800', color: Colors.text },
  resultRegion: { fontSize: FontSize.sm, color: Colors.accent, marginTop: 2 },
  resultConf:   {
    fontSize: FontSize.sm, color: Colors.muted,
    marginTop: 4, marginBottom: Spacing.base,
  },
  calBig: {
    backgroundColor: Colors.surface2, borderRadius: Radius.lg,
    padding: Spacing.base, alignItems: 'center', marginBottom: 12,
  },
  calNum:   { fontSize: 48, fontWeight: '900', color: Colors.accent },
  calLabel: { fontSize: FontSize.sm, color: Colors.muted },
  resultMacros: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  resultMacro: {
    flex: 1, backgroundColor: Colors.surface2,
    borderRadius: Radius.md, padding: 12, alignItems: 'center',
  },
  resultMacroVal:   { fontSize: 26, fontWeight: '800' },
  resultMacroLabel: {
    fontSize: FontSize.xs, color: Colors.muted, letterSpacing: 1,
  },
  feedback: {
    backgroundColor: Colors.surface2, borderRadius: Radius.md,
    padding: 14, borderLeftWidth: 3,
    borderLeftColor: Colors.accent, marginBottom: 12,
  },
  feedbackLabel: {
    fontSize: FontSize.xs, letterSpacing: 1,
    color: Colors.accent, marginBottom: 6,
  },
  feedbackText: { fontSize: FontSize.md, color: Colors.text, lineHeight: 22 },
  addBtn: {
    backgroundColor: Colors.accent, borderRadius: Radius.lg,
    padding: 16, alignItems: 'center',
  },
  addBtnText: {
    color: '#000', fontWeight: '900',
    fontSize: FontSize.lg, letterSpacing: 2,
  },
});