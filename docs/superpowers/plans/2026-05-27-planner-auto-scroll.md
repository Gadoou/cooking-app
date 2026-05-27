# Planner Pills Auto-Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the day selector to automatically scroll to the active day pill when swiping the main pager.

**Architecture:** 
- Refactor the Top Day Pills from `ScrollView` to `FlatList`.
- Use a `syncActiveDay` helper to keep both `FlatList` components in sync.

---

### Task 1: Refactor Day Selector to FlatList & Sync Logic

**Files:**
- Modify: `app/(tabs)/planner.tsx`

- [ ] **Step 1: Add `pillsListRef` and `syncActiveDay` logic**

```tsx
// Inside PlannerScreen component:
const pillsListRef = useRef<FlatList>(null);

const syncActiveDay = (index: number, shouldScrollPager: boolean = true) => {
  setActiveDayIndex(index);
  
  // 1. Scroll the pills bar to center the active day
  pillsListRef.current?.scrollToIndex({
    index,
    viewPosition: 0.5,
    animated: true,
  });

  // 2. Scroll the main pager (only if triggered by a pill tap)
  if (shouldScrollPager) {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  }
};
```

- [ ] **Step 2: Update `renderItem` and handlers**

```tsx
// Update Day Selector Pills section:
<View style={styles.pillsContainer}>
  <FlatList
    ref={pillsListRef}
    data={DAYS}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.pillsScroll}
    keyExtractor={(item) => item}
    renderItem={({ item: day, index }) => (
      <TouchableOpacity 
        style={[styles.pill, activeDayIndex === index && styles.activePill]}
        onPress={() => syncActiveDay(index)}
      >
        <Text style={[styles.pillText, activeDayIndex === index && styles.activePillText]}>
          {day.substring(0, 3)}
        </Text>
      </TouchableOpacity>
    )}
    // Prevents error if scrollToIndex is called before layout is complete
    onScrollToIndexFailed={(info) => {
      setTimeout(() => {
        pillsListRef.current?.scrollToIndex({ index: info.index, animated: true, viewPosition: 0.5 });
      }, 100);
    }}
  />
</View>

// Update main pager FlatList's onMomentumScrollEnd:
onMomentumScrollEnd={(ev) => {
  const index = Math.round(ev.nativeEvent.contentOffset.x / SCREEN_WIDTH);
  syncActiveDay(index, false); // false = don't scroll the pager itself
}}
```

- [ ] **Step 3: Commit**
```bash
git add app/(tabs)/planner.tsx
git commit -m "feat(planner): sync day pills with pager using auto-scroll"
```
