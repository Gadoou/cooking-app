# Guided Cooking Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a full-screen horizontal paging cooking mode with step-by-step images and bilingual Text-to-Speech.

**Architecture:** 
- New `GuidedCookingModal` component using a horizontal `FlatList`.
- Integrate `expo-speech` for manual TTS triggers.
- Support RTL mirroring and localized audio based on `LanguageContext`.

**Tech Stack:** React Native, Expo Router, Expo Speech.

---

### Task 1: Install Dependencies & Setup Component

**Files:**
- Modify: `package.json`
- Create: `src/components/GuidedCookingModal.tsx`

- [ ] **Step 1: Install `expo-speech`**

Run: `npx expo install expo-speech`

- [ ] **Step 2: Implement GuidedCookingModal UI and Paging**

```tsx
import React, { useState, useRef } from 'react';
import { Modal, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { CookingStage } from '../types';
import { useLanguage } from '../context/LanguageContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GuidedCookingModalProps {
  visible: boolean;
  onClose: () => void;
  stages: CookingStage[];
  recipeTitle: string;
}

export const GuidedCookingModal = ({ visible, onClose, stages, recipeTitle }: GuidedCookingModalProps) => {
  const { isRTL, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleSpeak = (text: string) => {
    Speech.speak(t(text), {
      language: isRTL ? 'ar' : 'en',
    });
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${((activeIndex + 1) / stages.length) * 100}%` }]} />
          </View>
          <Text style={styles.stepIndicator}>{t('Step')} {activeIndex + 1} {t('of')} {stages.length}</Text>
        </SafeAreaView>

        <FlatList
          ref={flatListRef}
          data={stages}
          horizontal
          pagingEnabled
          inverted={isRTL}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            const index = Math.round(ev.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            setActiveIndex(index);
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.page}>
              <Image source={item.videoURL as any} style={styles.stepImage} resizeMode="cover" />
              <View style={styles.descriptionCard}>
                <ScrollView style={styles.descScroll}>
                  <Text style={[styles.descriptionText, { textAlign: isRTL ? 'right' : 'left' }]}>
                    {t(item.textDescription)}
                  </Text>
                </ScrollView>
                <TouchableOpacity 
                  style={styles.speakButton} 
                  onPress={() => handleSpeak(item.textDescription)}
                >
                  <Ionicons name="volume-medium" size={32} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  header: { padding: 20, alignItems: 'center' },
  closeButton: { alignSelf: 'flex-start' },
  progressContainer: { width: '100%', height: 4, backgroundColor: '#333', borderRadius: 2, marginVertical: 15, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#FF6347' },
  stepIndicator: { color: '#888', fontSize: 14, fontWeight: '700', textTransform: 'uppercase' },
  page: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.8 },
  stepImage: { width: SCREEN_WIDTH, height: '65%' },
  descriptionCard: { flex: 1, backgroundColor: '#222', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, marginTop: -30 },
  descScroll: { flex: 1 },
  descriptionText: { color: '#FFF', fontSize: 18, lineHeight: 26, fontWeight: '500' },
  speakButton: { position: 'absolute', right: 25, top: -25, backgroundColor: '#FF6347', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 }
});
```

- [ ] **Step 3: Commit Component**
```bash
git add src/components/GuidedCookingModal.tsx
git commit -m "feat(cooking): implement GuidedCookingModal with paging and TTS"
```

### Task 2: Integrate into Recipe Detail Screen

**Files:**
- Modify: `app/recipe/[id].tsx`

- [ ] **Step 1: Add state and button handler for Guided Cooking**

```tsx
import { GuidedCookingModal } from '@/src/components/GuidedCookingModal';

// Inside RecipeDetailScreen:
const [isGuidedModalVisible, setIsGuidedModalVisible] = useState(false);

// Update Start Cooking button handler:
<TouchableOpacity 
  style={[styles.startCookingButton, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
  onPress={() => setIsGuidedModalVisible(true)}
>
  {/* ... existing content ... */}
</TouchableOpacity>

// Render modal at end:
<GuidedCookingModal 
  visible={isGuidedModalVisible}
  onClose={() => setIsGuidedModalVisible(false)}
  stages={recipe.stages}
  recipeTitle={recipe.title}
/>
```

- [ ] **Step 2: Commit Integration**
```bash
git add app/recipe/[id].tsx
git commit -m "feat(recipe): integrate Guided Cooking Mode modal"
```
