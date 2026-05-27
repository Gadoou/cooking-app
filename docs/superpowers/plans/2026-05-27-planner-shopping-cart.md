# Planner Shopping Cart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a shopping cart button to the Planner header that opens a "Grocery List" modal. The modal aggregates ingredients for the current day or the whole week and supports a "scratch-off" strike-through interaction.

**Architecture:** 
- Update `AppHeader` to accept an optional `rightElement`.
- Create `GroceryListModal` in `src/components/`.
- Implement aggregation logic within the modal using `MOCK_RECIPES`.

---

### Task 1: Update AppHeader for Action Button

**Files:**
- Modify: `src/components/AppHeader.tsx`

- [ ] **Step 1: Add `rightElement` prop to AppHeader**

```tsx
export const AppHeader = ({ 
  welcomeText, 
  rightElement 
}: { 
  welcomeText: string; 
  rightElement?: React.ReactNode 
}) => (
  <View style={styles.header}>
    <View style={styles.topRow}>
      <View style={styles.logoContainer}>
        {/* ... existing logo ... */}
      </View>
      {rightElement}
    </View>
    <Text style={styles.welcome}>{welcomeText}</Text>
  </View>
);
```

- [ ] **Step 2: Update styles for header layout**

```tsx
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
```

- [ ] **Step 3: Commit**
```bash
git add src/components/AppHeader.tsx
git commit -m "feat(ui): add rightElement support to AppHeader"
```

### Task 2: Create GroceryListModal Component

**Files:**
- Create: `src/components/GroceryListModal.tsx`

- [ ] **Step 1: Implement Modal with aggregation logic**

```tsx
import React, { useState, useMemo } from 'react';
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe, Ingredient } from '../types';
import { MOCK_RECIPES } from '../data/mockRecipes';

interface GroceryListModalProps {
  visible: boolean;
  onClose: () => void;
  recipes: Recipe[]; // Current day's recipes
  allWeekRecipes: Recipe[]; // All recipes in planner
}

export const GroceryListModal = ({ visible, onClose, recipes, allWeekRecipes }: GroceryListModalProps) => {
  const [isWholeWeek, setIsWholeWeek] = useState(false);
  const [ownedIngredients, setOwnedIngredients] = useState<string[]>([]);

  const consolidatedList = useMemo(() => {
    const targetRecipes = isWholeWeek ? allWeekRecipes : recipes;
    const map = new Map<string, { quantity: string, price: number }>();

    targetRecipes.forEach(r => {
      r.ingredients.forEach(i => {
        const existing = map.get(i.name) || { quantity: '', price: 0 };
        map.set(i.name, {
          quantity: existing.quantity ? `${existing.quantity} + ${i.quantity}` : i.quantity,
          price: existing.price + i.price
        });
      });
    });

    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      ...data,
      isOwned: ownedIngredients.includes(name)
    }));
  }, [isWholeWeek, recipes, allWeekRecipes, ownedIngredients]);

  const totalPrice = consolidatedList
    .filter(i => !i.isOwned)
    .reduce((sum, i) => sum + i.price, 0);

  const toggleIngredient = (name: string) => {
    setOwnedIngredients(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}><Ionicons name="close" size={28} /></TouchableOpacity>
          <Text style={styles.title}>Grocery List</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Whole Week</Text>
          <Switch value={isWholeWeek} onValueChange={setIsWholeWeek} trackColor={{ true: '#FF6347' }} />
        </View>

        <FlatList
          data={consolidatedList}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.item} 
              onPress={() => toggleIngredient(item.name)}
            >
              <View style={styles.itemLeft}>
                <Ionicons 
                  name={item.isOwned ? "checkbox" : "square-outline"} 
                  size={24} 
                  color={item.isOwned ? "#4CAF50" : "#CCC"} 
                />
                <View style={{ marginLeft: 12 }}>
                  <Text style={[styles.itemName, item.isOwned && styles.strikethrough]}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.footer}>
          <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity 
            style={styles.orderButton} 
            onPress={() => Alert.alert("Order Placed", "Your ingredients are on the way!")}
          >
            <Text style={styles.orderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  title: { fontSize: 20, fontWeight: 'bold' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#F9F9F9' },
  toggleLabel: { fontSize: 16, fontWeight: '600' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: '500' },
  itemQuantity: { fontSize: 13, color: '#888' },
  itemPrice: { fontSize: 15, fontWeight: '600' },
  strikethrough: { textDecorationLine: 'line-through', color: '#AAA' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#EEE' },
  total: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  orderButton: { backgroundColor: '#FF6347', padding: 16, borderRadius: 12, alignItems: 'center' },
  orderText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
```

- [ ] **Step 2: Commit**
```bash
git add src/components/GroceryListModal.tsx
git commit -m "feat(planner): create GroceryListModal with aggregation logic"
```

### Task 3: Integrate Cart into Planner

**Files:**
- Modify: `app/(tabs)/planner.tsx`

- [ ] **Step 1: Add state for modal and helper to get recipes**

```tsx
import { GroceryListModal } from '@/src/components/GroceryListModal';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';

// Inside PlannerScreen:
const [isCartVisible, setIsCartVisible] = useState(false);

const getRecipesForDay = (dayName: string) => {
  const plan = weekEntries[dayName] || { breakfast: [], lunch: [], dinner: [] };
  const ids = [...plan.breakfast, ...plan.lunch, ...plan.dinner];
  return ids.map(id => MOCK_RECIPES.find(r => r.id === id)).filter(Boolean) as Recipe[];
};

const getAllWeekRecipes = () => {
  const allIds = Object.values(weekEntries).flatMap(d => [...d.breakfast, ...d.lunch, ...d.dinner]);
  return allIds.map(id => MOCK_RECIPES.find(r => r.id === id)).filter(Boolean) as Recipe[];
};
```

- [ ] **Step 2: Pass Cart button to AppHeader**

```tsx
<AppHeader 
  welcomeText="Your Week" 
  rightElement={
    <TouchableOpacity onPress={() => setIsCartVisible(true)} style={{ padding: 8 }}>
      <Ionicons name="cart-outline" size={26} color="#FF6347" />
    </TouchableOpacity>
  }
/>
```

- [ ] **Step 3: Render the Modal**

```tsx
<GroceryListModal 
  visible={isCartVisible}
  onClose={() => setIsCartVisible(false)}
  recipes={getRecipesForDay(DAYS[activeDayIndex])}
  allWeekRecipes={getAllWeekRecipes()}
/>
```

- [ ] **Step 4: Commit**
```bash
git add app/(tabs)/planner.tsx
git commit -m "feat(planner): integrate shopping cart into planner header"
```
