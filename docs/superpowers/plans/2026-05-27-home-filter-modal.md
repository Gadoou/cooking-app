# Home Screen Filter Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a full-screen multi-criteria filter modal for the Home Screen.

**Architecture:** 
- Create `FilterModal.tsx` in `src/components/`.
- Use a central `filterState` object to track all selections.
- Refactor `HomeScreen` to apply these filters to the `MOCK_RECIPES` list.

**Tech Stack:** React Native, Expo Router.

---

### Task 1: Create FilterModal UI Structure

**Files:**
- Create: `src/components/FilterModal.tsx`

- [ ] **Step 1: Implement basic modal and segmented control components**

```tsx
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  currentFilters: any;
}

const SegmentedControl = ({ options, activeValue, onChange }: { options: any[], activeValue: any, onChange: (val: any) => void }) => (
  <View style={styles.segmentedControl}>
    {options.map((opt) => (
      <TouchableOpacity 
        key={opt.value} 
        style={[styles.segmentButton, activeValue === opt.value && styles.activeSegment]}
        onPress={() => onChange(opt.value)}
      >
        <Text style={[styles.segmentText, activeValue === opt.value && styles.activeSegmentText]}>{opt.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export const FilterModal = ({ visible, onClose, onApply, currentFilters }: FilterModalProps) => {
  const [filters, setFilters] = useState(currentFilters);

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}><Text style={styles.headerAction}>Cancel</Text></TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={() => setFilters(DEFAULT_FILTERS)}><Text style={styles.headerAction}>Reset</Text></TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionLabel}>BUDGET</Text>
          <SegmentedControl 
            options={[
              { label: 'Any', value: 'any' },
              { label: '<$100', value: 'under100' },
              { label: '$100-200', value: '100-200' },
              { label: '>$200', value: 'over200' }
            ]}
            activeValue={filters.budget}
            onChange={(val) => setFilters({...filters, budget: val})}
          />

          {/* Repeat for Time, Guests, Diet, Origin */}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={() => onApply(filters)}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F0' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerAction: { color: '#FF6347', fontWeight: '600' },
  scrollContent: { padding: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: '#888', marginBottom: 12, marginTop: 24 },
  segmentedControl: { flexDirection: 'row', backgroundColor: '#E5E5E0', borderRadius: 12, padding: 4, height: 45 },
  segmentButton: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  activeSegment: { backgroundColor: '#FFF', elevation: 2 },
  segmentText: { fontSize: 13, color: '#666', fontWeight: '600' },
  activeSegmentText: { color: '#FF6347', fontWeight: '700' },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF' },
  applyButton: { backgroundColor: '#FF6347', height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  applyButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
```

- [ ] **Step 2: Commit UI Shell**
```bash
git add src/components/FilterModal.tsx
git commit -m "feat(home): create basic UI structure for FilterModal"
```

---

### Task 2: Implement "Cook with what you have" Section

**Files:**
- Modify: `src/components/FilterModal.tsx`

- [ ] **Step 1: Add dynamic ingredient checklist**

```tsx
// Inside FilterModal:
const ALL_INGREDIENTS = ['Pasta', 'Chicken', 'Beef', 'Rice', 'Garlic', 'Lemon', 'Tomato', 'Salmon', 'Quinoa'];

// In JSX:
<Text style={styles.sectionLabel}>COOK WITH WHAT YOU HAVE</Text>
<View style={styles.ingredientsGrid}>
  {ALL_INGREDIENTS.map(ing => (
    <TouchableOpacity 
      key={ing} 
      style={[styles.ingredientChip, filters.ingredients.includes(ing) && styles.activeChip]}
      onPress={() => {
        const newIngs = filters.ingredients.includes(ing) 
          ? filters.ingredients.filter(i => i !== ing)
          : [...filters.ingredients, ing];
        setFilters({...filters, ingredients: newIngs});
      }}
    >
      <Text style={[styles.chipText, filters.ingredients.includes(ing) && styles.activeChipText]}>{ing}</Text>
    </TouchableOpacity>
  ))}
</View>

// Styles:
  ingredientsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  ingredientChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#E5E5E0', borderWidth: 1, borderColor: '#DDD' },
  activeChip: { backgroundColor: '#FF6347', borderColor: '#FF6347' },
  chipText: { fontSize: 13, color: '#555', fontWeight: '500' },
  activeChipText: { color: '#FFF' }
```

- [ ] **Step 2: Commit Ingredient Checklist**
```bash
git add src/components/FilterModal.tsx
git commit -m "feat(home): add ingredient checklist to FilterModal"
```

---

### Task 3: Integrate Logic into Home Screen

**Files:**
- Modify: `app/(tabs)/index.tsx`

- [ ] **Step 1: Add state for Filter Modal and refactor filtering logic**

```tsx
import { FilterModal } from '@/src/components/FilterModal';

// Inside HomeScreen:
const [isFilterVisible, setIsFilterVisible] = useState(false);
const [activeFilters, setActiveFilters] = useState({
  budget: 'any',
  time: 'any',
  guests: 1,
  diet: 'all',
  origin: 'all',
  ingredients: []
});

const filteredRecipes = MOCK_RECIPES.filter(recipe => {
  // 1. Text Search
  const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
  
  // 2. Budget Filter
  let matchesBudget = true;
  if (activeFilters.budget === 'under100') matchesBudget = recipe.cost < 100;
  // ... etc
  
  // 3. Ingredient Filter (Cook with what you have)
  const matchesIngredients = activeFilters.ingredients.length === 0 || 
    activeFilters.ingredients.every(ing => recipe.ingredients.some(i => i.name === ing));

  return matchesSearch && matchesBudget && matchesIngredients; // && ... other filters
});

// Update CategoryButton 'custom' handler:
<CategoryButton 
  onPress={() => setIsFilterVisible(true)} 
  // ...
/>
```

- [ ] **Step 2: Commit Integration**
```bash
git add app/(tabs)/index.tsx
git commit -m "feat(home): integrate FilterModal and implement multi-criteria logic"
```
