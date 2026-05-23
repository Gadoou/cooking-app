# Design Specification: Cooking App Prototype (iOS Optimized)

**Date:** 2026-05-22
**Status:** Draft (Revised for Windows Dev)
**Framework:** React Native + Expo + TypeScript

## 1. Executive Summary
A visually-driven cooking application prototype developed using React Native and Expo. Focused on high-impact user experience, the app includes recipe browsing, a "scratch-off" ingredient ordering system, stage-based cooking with video and text-to-speech, and a weekly meal planner with dynamic stats. Optimized for development on Windows with testing via Expo Go.

## 2. Data Architecture (TypeScript + SQLite/AsyncStorage)

### Core Interfaces
- **`Recipe`**
    - `id`: string (UUID)
    - `title`: string
    - `overview`: string
    - `cost`: number
    - `likes`: number
    - `origin`: string
    - `cookingTime`: number (minutes)
    - `dietStyle`: 'lowCal' | 'proteinFocused' | 'vegan' | 'etc'
    - `ingredients`: Ingredient[]
    - `stages`: CookingStage[]
    - `reviews`: Review[]
    - `isLiked`: boolean

- **`Ingredient`**
    - `name`: string
    - `quantity`: string
    - `price`: number
    - `imageName`: string (local asset path)
    - `isOwned`: boolean (default: `false`)

- **`CookingStage`**
    - `id`: string
    - `timeNeeded`: number
    - `videoURL`: string (Remote URL or local asset)
    - `textDescription`: string

- **`WeekPlan`**
    - `entries`: Record<string, Record<MealSlot, string[]>> // Date -> Slot -> RecipeIDs
    - `keepPlan`: boolean (prevents Monday auto-reset)

- **`MealSlot` (Enum)**
    - `breakfast`, `lunch`, `dinner`

## 3. Technology Stack (Windows Friendly)
- **Environment**: Expo (managed workflow)
- **Navigation**: `expo-router` (File-based routing for Tab layout)
- **Persistence**: `expo-sqlite` for recipes/planner, `AsyncStorage` for simple user settings.
- **Media**:
    - `expo-av`: For stage-by-stage video playback.
    - `expo-speech`: For the manual "Text-to-Speech" feature.
- **Icons**: `@expo/vector-icons` (Ionicons/MaterialCommunityIcons).

## 4. Navigation & Views

### Home Page
- **Search Bar**: Real-time filtering by title or ingredient.
- **Filter Buttons**:
    - **Quick Meals**: `cookingTime < 30`.
    - **Cost Friendly**: Lowest price quartile.
    - **Meals for Big Groups**: Opens "Guest Calculator" to suggest meal bundles.
    - **All Recipes**: Resets filters.
    - **Custom Filter**: Modal for advanced criteria.
- **Suggested Recipes**: 2x2 grid of top 4 liked meals.

### My Recipes (Liked)
- View filtered list where `isLiked === true`.
- Shortcut to "Add to Week Plan".

### Week Planner
- **Timeline**: Mon-Sun vertical scroll.
- **Stats Bar**: Sticky header calculating:
    - Planned meal count.
    - Avg. cooking time.
    - Total weekly cost (based on planned recipe totals).
- **Reset Logic**: App-level check to clear entries on first Monday open, unless `keepPlan` is true.
- **Grocery List**: "Generate List" button to aggregate all recipe ingredients for the "Scratch & Order" flow.

### Profile Info
- Fields: Email, Password, Mock Payment selection.

## 5. Key Interactions

### Scratch-Out & Order (Mock)
- Checkbox + Strikethrough for `isOwned`.
- Dynamic total updates based on `!isOwned` items.
- **Order Button**: Triggers `Alert.alert("Order Placed", "Successfully ordered missing ingredients.")`.

### Stage-Based Cooking
- Horizontal `FlatList` with paging enabled.
- **TTS Feature**: Manual "Play" button calling `Speech.speak(description)`.

## 6. Deployment & Testing
- **Development**: VS Code on Windows.
- **Testing**: Expo Go app on iOS/Android devices via QR code.
- **Sharing**: Host project on Expo/GitHub for remote testing.
