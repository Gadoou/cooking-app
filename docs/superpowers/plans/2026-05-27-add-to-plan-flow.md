# 'Add to Plan' Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the "Weekly Plan" button functional by adding a two-step modal (Select Day -> Select Slot) that adds the current recipe to the Planner context.

**Architecture:** 
- Create a new `AddToPlanModal` component.
- Use internal state to handle the two-step flow (Day selection first, then Slot selection).
- Integrate the modal into the Recipe Detail screen using the `usePlanner` context.

**Tech Stack:** React Native, Expo Router.

---

### Task 1: Create AddToPlanModal Component

**Files:**
- Create: `src/components/AddToPlanModal.tsx`

- [ ] **Step 1: Implement the two-step selection modal**

```tsx
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MealSlot } from '../types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SLOTS: MealSlot[] = ['breakfast', 'lunch', 'dinner'];

interface AddToPlanModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (day: string, slot: MealSlot) => void;
}

export const AddToPlanModal = ({ visible, onClose, onConfirm }: AddToPlanModalProps) => {
  const [step, setStep] = useState<'day' | 'slot'>('day');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleClose = () => {
    setStep('day');
    setSelectedDay(null);
    onClose();
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setStep('slot');
  };

  const handleSlotSelect = (slot: MealSlot) => {
    if (selectedDay) {
      onConfirm(selectedDay, slot);
      handleClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            {step === 'slot' && (
              <TouchableOpacity onPress={() => setStep('day')} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="#333" />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>{step === 'day' ? 'Select Day' : 'Select Slot'}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          {step === 'day' ? (
            <FlatList
              data={DAYS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleDaySelect(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.slotContainer}>
              {SLOTS.map((slot) => (
                <TouchableOpacity key={slot} style={styles.item} onPress={() => handleSlotSelect(slot)}>
                  <Text style={styles.itemText}>{slot.charAt(0).toUpperCase() + slot.slice(1)}</Text>
                  <Ionicons name="add-circle-outline" size={24} color="#FF6347" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  content: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, height: '60%' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  backButton: { position: 'absolute', left: 20 },
  closeButton: { position: 'absolute', right: 20 },
  title: { fontSize: 18, fontWeight: 'bold' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  itemText: { fontSize: 16, color: '#333', fontWeight: '500' },
  slotContainer: { paddingTop: 10 }
});
```

- [ ] **Step 2: Commit**
```bash
git add src/components/AddToPlanModal.tsx
git commit -m "feat(ui): add AddToPlanModal component"
```

### Task 2: Integrate Modal into Recipe Detail Screen

**Files:**
- Modify: `app/recipe/[id].tsx`

- [ ] **Step 1: Use Planner context and add modal state**

```tsx
import { usePlanner } from '@/src/context/PlannerContext';
import { AddToPlanModal } from '@/src/components/AddToPlanModal';

// Inside RecipeDetailScreen component:
const { addMeal } = usePlanner();
const [isPlanModalVisible, setIsPlanModalVisible] = useState(false);

const handleConfirmAdd = (day: string, slot: MealSlot) => {
  addMeal(day, slot, recipe.id);
  Alert.alert("Success", `${recipe.title} added to ${day} ${slot}!`);
};

// Update handleAddToPlan to open modal:
const handleAddToPlan = () => {
  setIsPlanModalVisible(true);
};

// Render modal at the end of SafeAreaView:
<AddToPlanModal 
  visible={isPlanModalVisible}
  onClose={() => setIsPlanModalVisible(false)}
  onConfirm={handleConfirmAdd}
/>
```

- [ ] **Step 2: Commit**
```bash
git add app/recipe/[id].tsx
git commit -m "feat(recipe): make Weekly Plan button functional"
```
