# Planner Meal Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a small thumbnail image (40x40) to the left of the meal text in the planner slots.

**Architecture:** 
- Update `Recipe` type and mock data to include an `image` field.
- Modify `MealSlotItem` to render an `Image` component.
- Use existing `assets/images/icon.png` as a temporary placeholder.

**Tech Stack:** React Native.

---

### Task 1: Update Data Model

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/data/mockRecipes.ts`

- [ ] **Step 1: Update Recipe interface**

```typescript
// src/types/index.ts
export interface Recipe {
  // ... existing fields
  image?: any; // To support require()
}
```

- [ ] **Step 2: Update MOCK_RECIPES**

```typescript
// src/data/mockRecipes.ts
export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    // ...
    image: require('@/assets/images/icon.png'),
  },
  // Repeat for all 6 recipes
];
```

- [ ] **Step 3: Commit**
```bash
git add src/types/index.ts src/data/mockRecipes.ts
git commit -m "feat(data): add image field to recipes"
```

### Task 2: Update MealSlotItem UI

**Files:**
- Modify: `src/components/MealSlotItem.tsx`

- [ ] **Step 1: Add Image component to MealSlotItem**

```tsx
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Inside render loop for recipeIds:
<View key={`${id}-${index}`} style={styles.recipeCard}>
  <Image source={recipe?.image} style={styles.mealImage} />
  <View style={styles.recipeInfo}>
    <Ionicons name="restaurant-outline" size={16} color="#FF6347" style={{marginRight: 8}} />
    <Text style={styles.recipeTitle} numberOfLines={1}>{recipe?.title || 'Unknown'}</Text>
  </View>
  {/* ... trash button ... */}
</View>
```

- [ ] **Step 2: Add styles for mealImage**

```tsx
const styles = StyleSheet.create({
  // ...
  mealImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
});
```

- [ ] **Step 3: Commit**
```bash
git add src/components/MealSlotItem.tsx
git commit -m "feat(ui): display meal image in planner slots"
```
