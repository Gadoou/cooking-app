import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
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

        {/* Section 2: Privacy & Security */}
        <SectionLabel text="Privacy & security" />
        <View style={styles.groupContainer}>
          <SettingItem 
            label="App services" 
            onPress={() => Alert.alert("Action", "Managing services...")} 
          />
          <SettingItem 
            label="Data usage" 
            onPress={() => Alert.alert("Action", "Viewing data usage...")} 
          />
          <SettingItem 
            label="Info about the app" 
            onPress={() => Alert.alert("ChefPal", "ChefPal v1.0.0")} 
            isLast 
          />
        </View>

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

        {/* Section 4: Help */}
        <SectionLabel text="Help" />
        <View style={styles.groupContainer}>
          <SettingItem 
            label="Call customer service" 
            onPress={() => Alert.alert("Action", "Connecting to support...")} 
          />
          <SettingItem 
            label="Q&As" 
            onPress={() => Alert.alert("Action", "Opening FAQs...")} 
          />
          <SettingItem 
            label="Other help choices" 
            onPress={() => Alert.alert("Action", "Opening help menu...")} 
            isLast 
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F0' },
  scrollContent: { 
    padding: 16 
  },
  sectionLabel: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#888', 
    marginBottom: 8, 
    marginLeft: 4, 
    letterSpacing: 0.5 
  },
  groupContainer: { 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    marginBottom: 24, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: '#F0F0F0' 
  },
  settingItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16 
  },
  settingBorder: { 
    borderBottomWidth: 1, 
    borderBottomColor: '#F5F5F5' 
  },
  settingLabelContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  settingLabel: { 
    fontSize: 16, 
    color: '#333', 
    fontWeight: '500' 
  },
  toggleContainer: {
    padding: 12,
    alignItems: 'center',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 2,
    width: '100%',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeSegment: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeSegmentText: {
    color: '#000',
    fontWeight: '600',
  },
});
