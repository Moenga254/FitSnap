# FitSnap — Mobile App Interface Design

## Overview

FitSnap is an AI-powered diet tracker for gym users. Users can take photos of meals, and the app analyzes them to estimate calories and macronutrients (protein, carbs, fats), then provides simple fitness-focused feedback.

**Design Principles:**
- Dark theme (black/grey) with green or orange accent color
- Minimal, clean layout optimized for one-handed usage
- Big, prominent numbers for protein (primary focus for gym users)
- Portrait orientation (9:16) — mobile-first design

---

## Screen List

### 1. Home Screen (Dashboard)
**Purpose:** Display daily nutrition progress and quick actions.

**Primary Content:**
- Daily calorie progress (visual bar or ring)
- Protein progress (highlighted, large number)
- Carbs and fats (secondary stats)
- Motivational message (e.g., "You need 30g more protein today")
- "Scan Meal" button (primary CTA)

**Key Interactions:**
- Tap "Scan Meal" → Navigate to Camera/Upload Screen
- Tap "Goals" → Navigate to Goals Setup Screen
- Tap "Progress" → Navigate to Progress Screen

---

### 2. Camera / Upload Screen
**Purpose:** Allow users to capture or upload a meal photo for analysis.

**Primary Content:**
- Large "Take Photo" button (camera icon)
- "Upload Image" button (gallery icon)
- Recent meals preview (optional, for quick re-analysis)
- "Analyze Meal" button (appears after photo is selected)

**Key Interactions:**
- Tap "Take Photo" → Open device camera
- Tap "Upload Image" → Open device photo library
- Tap "Analyze Meal" → Send to backend, navigate to Results Screen

---

### 3. Results Screen
**Purpose:** Display nutrition analysis and AI feedback for the meal.

**Primary Content:**
- Meal photo (thumbnail)
- Nutrition breakdown:
  - Calories (large)
  - Protein (very large, highlighted)
  - Carbs (medium)
  - Fats (medium)
- AI Feedback message:
  - "High carbs, low protein"
  - "Good for muscle gain"
  - "Balanced meal 👍"
- "Add to Daily Log" button
- "Retake Photo" button

**Key Interactions:**
- Tap "Add to Daily Log" → Update dashboard, navigate back to Home
- Tap "Retake Photo" → Navigate back to Camera/Upload Screen

---

### 4. Goals Setup Screen
**Purpose:** Allow users to set fitness goals and daily targets.

**Primary Content:**
- Goal selector (radio buttons or cards):
  - Lose weight
  - Build muscle
  - Maintain
- Daily calorie target (input field)
- Protein target (input field)
- "Save Goals" button

**Key Interactions:**
- Select goal type → Update form fields with defaults
- Enter custom targets → Tap "Save Goals" → Update local storage, navigate back to Home

---

### 5. Progress Screen
**Purpose:** Display daily/weekly nutrition statistics and trends.

**Primary Content:**
- Daily stats summary:
  - Total calories consumed
  - Total protein consumed
  - Total carbs consumed
  - Total fats consumed
- Weekly chart (simple bar chart or line graph, optional for MVP)
- "View Details" button (for detailed meal history)

**Key Interactions:**
- Swipe left/right → View previous/next day
- Tap "View Details" → Show meal history for the day

---

## Primary User Flows

### Flow 1: Log a Meal
1. User opens app → sees Home Screen (Dashboard)
2. Taps "Scan Meal" → navigates to Camera/Upload Screen
3. Taps "Take Photo" or "Upload Image" → selects meal photo
4. Taps "Analyze Meal" → backend processes image, shows loading state
5. Results Screen displays nutrition data and AI feedback
6. Taps "Add to Daily Log" → dashboard updates with new data
7. Returns to Home Screen

### Flow 2: Set Goals
1. User taps "Goals" on Home Screen
2. Navigates to Goals Setup Screen
3. Selects goal type (e.g., "Build muscle")
4. Enters daily calorie and protein targets
5. Taps "Save Goals" → data saved to local storage
6. Returns to Home Screen

### Flow 3: View Progress
1. User taps "Progress" on Home Screen
2. Navigates to Progress Screen
3. Views daily/weekly stats
4. (Optional) Swipes to view previous days
5. Returns to Home Screen

---

## Color Scheme

**Dark Theme (Primary):**
- Background: `#0f0f0f` (near-black)
- Surface: `#1a1a1a` (dark grey)
- Foreground (text): `#ffffff` (white)
- Muted text: `#a0a0a0` (light grey)
- Accent (Primary): `#22c55e` (green) or `#f97316` (orange)
- Success: `#22c55e` (green)
- Warning: `#f97316` (orange)
- Error: `#ef4444` (red)

**Tailwind Token Mapping:**
- `background` → `#0f0f0f`
- `surface` → `#1a1a1a`
- `foreground` → `#ffffff`
- `muted` → `#a0a0a0`
- `primary` → `#22c55e` (green accent)
- `border` → `#333333` (subtle divider)

---

## Layout Specifics

### Home Screen Layout
```
┌─────────────────────┐
│   FitSnap Header    │
├─────────────────────┤
│  Daily Calories     │ ← Progress ring or bar
│  ████████░░  2100/  │
│           2500 cal  │
├─────────────────────┤
│  PROTEIN: 85g       │ ← Large, prominent
│  Carbs: 250g        │
│  Fats: 65g          │
├─────────────────────┤
│ "You need 30g more  │
│  protein today"     │
├─────────────────────┤
│  [Scan Meal]        │ ← Primary button
│  [Goals] [Progress] │ ← Secondary buttons
└─────────────────────┘
```

### Results Screen Layout
```
┌─────────────────────┐
│  [Meal Photo]       │
├─────────────────────┤
│  Calories: 450      │
│  PROTEIN: 35g ✓     │
│  Carbs: 55g         │
│  Fats: 12g          │
├─────────────────────┤
│ "High carbs, low    │
│  protein. Add more  │
│  chicken!"          │
├─────────────────────┤
│ [Add to Daily Log]  │
│ [Retake Photo]      │
└─────────────────────┘
```

---

## Typography & Spacing

- **Header text:** 24-28px, bold, `#ffffff`
- **Body text:** 14-16px, regular, `#ffffff`
- **Muted text:** 12-14px, regular, `#a0a0a0`
- **Large numbers:** 32-48px, bold, `#22c55e` (accent)
- **Padding:** 16px (standard), 8px (compact)
- **Border radius:** 12px (cards), 24px (buttons)

---

## Interaction Feedback

- **Button press:** Scale 0.97 + light haptic feedback
- **Loading state:** Spinner or skeleton loader
- **Success:** Green checkmark + success haptic
- **Error:** Red error message + error haptic

---

## MVP Scope

**Phase 1 (UI Prototype):**
- [ ] Home Screen (static data)
- [ ] Camera/Upload Screen (no functionality yet)
- [ ] Results Screen (mock data)
- [ ] Goals Setup Screen (no persistence)
- [ ] Progress Screen (mock data)
- [ ] Tab bar navigation

**Phase 2 (Functionality):**
- [ ] Image upload/capture working
- [ ] Backend mock API integration
- [ ] Nutrition results display
- [ ] Local storage for goals

**Phase 3 (AI Integration):**
- [ ] Food recognition API
- [ ] Real nutrition data

**Phase 4 (Smart Insights):**
- [ ] Dynamic AI feedback logic
- [ ] Protein deficit warnings
- [ ] Calorie overflow alerts
