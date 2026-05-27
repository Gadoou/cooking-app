# Planner Layout Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the Planner screen to show one day at a time with a top day selector (pills) and a bottom-pinned stats bar.

**Architecture:** 
- Use local `activeDayIndex` state (0-6) to track the current day.
- Top: Horizontal `ScrollView` with `TouchableOpacity` pills.
- Middle: Horizontal `FlatList` with `pagingEnabled` to render each day's meals.
- Bottom: `PlannerStats` moved outside the main `ScrollView` and positioned at the bottom.

**Tech Stack:** React Native, Expo Router, Lucide/Ionicons.

---

### Task 1: Update Planner Screen Structure & Day Pills

**Files:**
- Modify: `app/(tabs)/planner.tsx`

- [ ] **Step 1: Add state for activeDayIndex and Day Pills UI**

```tsx
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
// ... other imports

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PlannerScreen() {
  const { weekEntries, addMeal, removeMeal } = usePlanner();
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const scrollToDay = (index: number) => {
    setActiveDayIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader welcomeText="Your Week" />
      
      {/* Day Selector Pills */}
      <View style={styles.pillsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsScroll}>
          {DAYS.map((day, index) => (
            <TouchableOpacity 
              key={day} 
              style={[styles.pill, activeDayIndex === index && styles.activePill]}
              onPress={() => scrollToDay(index)}
            >
              <Text style={[styles.pillText, activeDayIndex === index && styles.activePillText]}>
                {day.substring(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Remaining structure will be added in next tasks */}
    </SafeAreaView>
  );
}
```

- [ ] **Step 2: Add styles for Pills**

```tsx
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  pillsContainer: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingVertical: 12 },
  pillsScroll: { paddingHorizontal: 16 },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F5F5F5', marginRight: 8, borderWidth: 1, borderColor: '#EEE' },
  activePill: { backgroundColor: '#FF6347', borderColor: '#FF6347' },
  pillText: { fontSize: 14, fontWeight: '600', color: '#666' },
  activePillText: { color: '#fff' },
});
```

- [ ] **Step 3: Commit**
```bash
git add app/(tabs)/planner.tsx
git commit -m "feat(planner): add top day selector pills"
```

### Task 2: Implement Swipeable Day Pager

**Files:**
- Modify: `app/(tabs)/planner.tsx`

- [ ] **Step 1: Replace ScrollView with Horizontal FlatList Pager**

```tsx
// Inside PlannerScreen return:
<FlatList
  ref={flatListRef}
  data={DAYS}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  onMomentumScrollEnd={(ev) => {
    const index = Math.round(ev.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveDayIndex(index);
  }}
  keyExtractor={(item) => item}
  renderItem={({ item: day }) => {
    const plan = weekEntries[day] || { breakfast: [], lunch: [], dinner: [] };
    return (
      <View style={{ width: SCREEN_WIDTH, padding: 16 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>{day}</Text>
              <View style={styles.dayDot} />
            </View>
            <MealSlotItem 
              label="Breakfast" 
              recipeIds={plan.breakfast} 
              onAdd={() => openPicker(day, 'breakfast')}
              onRemove={(id) => removeMeal(day, 'breakfast', id)}
            />
            {/* ... other MealSlotItems ... */}
          </View>
        </ScrollView>
      </View>
    );
  }}
/>
```

- [ ] **Step 2: Commit**
```bash
git add app/(tabs)/planner.tsx
git commit -m "feat(planner): implement swipeable day pager"
```

### Task 3: Pinned Bottom Stats Bar

**Files:**
- Modify: `app/(tabs)/planner.tsx`

- [ ] **Step 1: Move PlannerStats to Bottom and add styles**

```tsx
// Inside PlannerScreen return, after FlatList:
<View style={styles.statsFooter}>
  <PlannerStats />
</View>

// Add to styles:
statsFooter: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderTopColor: '#F0F0F0',
  paddingBottom: 20, // Padding for safe area/tabs
}
```

- [ ] **Step 2: Commit**
```bash
git add app/(tabs)/planner.tsx
git commit -m "feat(planner): pin stats bar to bottom"
```
