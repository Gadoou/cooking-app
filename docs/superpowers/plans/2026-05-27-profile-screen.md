# Profile Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Profile screen with four sections (Account Info, Privacy & Security, App Visuals, Help) using a grouped settings UI pattern.

**Architecture:** 
- `ProfileScreen` in `app/(tabs)/profile.tsx` as a scrollable container.
- Use a reusable `SettingItem` component pattern for the buttons.
- App Visuals using a segmented toggle control.
- Other items triggering `Alert` for the prototype.

**Tech Stack:** React Native, Ionicons.

---

### Task 1: Setup Profile Screen Shell & Base Components

**Files:**
- Modify: `app/(tabs)/profile.tsx`

- [ ] **Step 1: Implement the base layout with ScrollView and sections**

```tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { AppHeader } from '@/src/components/AppHeader';
import { Ionicons } from '@expo/vector-icons';

interface SettingItemProps {
  label: string;
  onPress: () => void;
  icon?: string;
  isLast?: boolean;
}

const SettingItem = ({ label, onPress, icon, isLast }: SettingItemProps) => (
  <TouchableOpacity 
    style={[styles.settingItem, !isLast && styles.settingBorder]} 
    onPress={onPress}
  >
    <View style={styles.settingLabelContainer}>
      {icon && <Ionicons name={icon as any} size={20} color="#555" style={{marginRight: 12}} />}
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#CCC" />
  </TouchableOpacity>
);

const SectionLabel = ({ text }: { text: string }) => (
  <Text style={styles.sectionLabel}>{text.toUpperCase()}</Text>
);

export default function ProfileScreen() {
  const [visualMode, setVisualMode] = useState<'light' | 'dark'>('light');

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader welcomeText="Your Profile" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Section 1: Account Info */}
        <SectionLabel text="Account info" />
        <View style={styles.groupContainer}>
          <SettingItem 
            label="Modify account info" 
            onPress={() => Alert.alert("Action", "Opening account modification...")} 
          />
          <SettingItem 
            label="Notifications" 
            onPress={() => Alert.alert("Action", "Opening notification settings...")} 
            isLast 
          />
        </View>

        {/* Remaining sections in next steps */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
```

- [ ] **Step 2: Add styles for the settings layout**

```tsx
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { padding: 16 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: '#888', marginBottom: 8, marginLeft: 4, letterSpacing: 0.5 },
  groupContainer: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 24, overflow: 'hidden', borderWidth: 1, borderColor: '#F0F0F0' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  settingBorder: { borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  settingLabelContainer: { flexDirection: 'row', alignItems: 'center' },
  settingLabel: { fontSize: 16, color: '#333', fontWeight: '500' },
});
```

- [ ] **Step 3: Commit**
```bash
git add app/(tabs)/profile.tsx
git commit -m "feat(profile): setup base settings layout and account section"
```

### Task 2: Implement Privacy, Visuals, and Help Sections

**Files:**
- Modify: `app/(tabs)/profile.tsx`

- [ ] **Step 1: Add Privacy & Security section**

```tsx
{/* Section 2: Privacy & Security */}
<SectionLabel text="Privacy & security" />
<View style={styles.groupContainer}>
  <SettingItem label="App services" onPress={() => Alert.alert("Privacy", "Managing services...")} />
  <SettingItem label="Data usage" onPress={() => Alert.alert("Privacy", "Viewing data usage...")} />
  <SettingItem label="Info about the app" onPress={() => Alert.alert("About", "ChefPal v1.0.0")} isLast />
</View>
```

- [ ] **Step 2: Add App Visuals section (Segmented Toggle)**

```tsx
{/* Section 3: App Visuals */}
<SectionLabel text="App visuals" />
<View style={styles.groupContainer}>
  <View style={styles.toggleContainer}>
    <View style={styles.segmentedControl}>
      <TouchableOpacity 
        style={[styles.segmentButton, visualMode === 'light' && styles.activeSegment]} 
        onPress={() => setVisualMode('light')}
      >
        <Text style={[styles.segmentText, visualMode === 'light' && styles.activeSegmentText]}>Light Mode</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.segmentButton, visualMode === 'dark' && styles.activeSegment]} 
        onPress={() => setVisualMode('dark')}
      >
        <Text style={[styles.segmentText, visualMode === 'dark' && styles.activeSegmentText]}>Dark Mode</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>
```

- [ ] **Step 3: Add Help section**

```tsx
{/* Section 4: Help */}
<SectionLabel text="Help" />
<View style={styles.groupContainer}>
  <SettingItem label="Call customer service" onPress={() => Alert.alert("Calling...", "Connecting to support...")} />
  <SettingItem label="Q&As" onPress={() => Alert.alert("Help", "Opening FAQs...")} />
  <SettingItem label="Other help choices" onPress={() => Alert.alert("Help", "Opening help menu...") } isLast />
</View>
```

- [ ] **Step 4: Update styles for segmented control**

```tsx
  toggleContainer: { padding: 12 },
  segmentedControl: { flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 10, padding: 4, height: 44 },
  segmentButton: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 7 },
  activeSegment: { backgroundColor: '#FFF', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  segmentText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeSegmentText: { color: '#FF6347', fontWeight: '700' },
```

- [ ] **Step 5: Commit**
```bash
git add app/(tabs)/profile.tsx
git commit -m "feat(profile): complete all settings sections and visuals toggle"
```
