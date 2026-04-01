# FitSnap — Project TODO

## Phase 1: UI Prototype (Build all screens with navigation)

### Screens
- [x] Home Screen (Dashboard) — daily calories, protein, carbs, fats progress
- [x] Camera / Upload Screen — take photo or upload image
- [x] Results Screen — display nutrition data and AI feedback
- [x] Goals Setup Screen — set fitness goals and daily targets
- [x] Progress Screen — view daily/weekly stats

### Navigation
- [x] Tab bar setup (Home, Scan, Progress, Goals)
- [x] Screen routing and transitions
- [x] Back button handling

### Mock Data
- [x] Create mock nutrition data for Results Screen
- [x] Create mock daily stats for Progress Screen
- [x] Create mock goals for Goals Setup Screen

---

## Phase 2: Functionality

### Image Upload
- [ ] Camera integration (expo-image-picker)
- [ ] Photo library access
- [ ] Image preview before upload

### Backend Integration
- [ ] Create mock API endpoint for nutrition analysis
- [ ] Connect Results Screen to API
- [ ] Handle loading/error states

### Local Storage
- [ ] Save goals to AsyncStorage
- [ ] Save daily meals to AsyncStorage
- [ ] Persist user data across app sessions

### Dashboard Updates
- [ ] Update Home Screen with logged meals
- [ ] Calculate daily totals (calories, protein, carbs, fats)
- [ ] Display progress bars and stats

---

## Phase 3: AI Integration

### Food Recognition API
- [ ] Integrate food recognition API (e.g., Clarifai, Google Vision, or backend LLM)
- [ ] Send image to API for analysis
- [ ] Parse nutrition data from API response

### Real Nutrition Data
- [ ] Replace mock data with API results
- [ ] Handle API errors gracefully
- [ ] Add retry logic for failed requests

---

## Phase 4: Smart Insights

### Feedback Logic
- [ ] IF protein < target: show "Increase protein intake"
- [ ] IF carbs > limit: show "High carbs for your goal"
- [ ] IF balanced: show "Great meal 👍"
- [ ] Goal-specific feedback (muscle gain vs. weight loss)

### Alerts & Warnings
- [ ] Protein deficit warning
- [ ] Calorie overflow alert
- [ ] Daily goal achievement notification

---

## Branding & Polish

- [x] Generate custom app logo
- [x] Update app.config.ts with branding
- [x] Set theme colors (dark theme with green/orange accent)
- [x] Finalize typography and spacing

---

## Testing & Delivery

- [ ] Test all user flows end-to-end
- [ ] Verify navigation works on iOS and Android
- [ ] Test image upload on real devices
- [ ] Create checkpoint before delivery
- [ ] Push code to GitHub

---

## Notes

- MVP focus: Photo → Result → Dashboard update
- Start with mock data, replace with real API later
- Use AsyncStorage for local persistence (no backend required for MVP)
- Dark theme with green accent color
- Protein is the primary focus for gym users


## Phase 2: Functionality (In Progress)

### Image Upload & Camera
- [x] Fix camera permission handling in Scan Screen
- [x] Implement proper expo-image-picker integration
- [x] Add photo library access
- [x] Handle permission denial gracefully
- [x] Add image preview before analysis

### Scan Screen UI/UX Redesign
- [x] Create clean, modern UI matching app brand
- [x] Add visual states (idle, loading, preview)
- [x] Improve button layout and spacing
- [x] Add helpful guidance text
- [x] Smooth transitions between states
