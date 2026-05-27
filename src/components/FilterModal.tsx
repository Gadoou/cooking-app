import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * FilterModal Component
 * Implements a multi-criteria filter for the cooking app.
 * Features: Budget, Cooking Time, Guest Count, Diet, and Origin filters.
 */

export interface FilterState {
  budget: string;
  time: string;
  guests: number;
  diet: string;
  origin: string;
  ingredients: string[];
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

const SegmentedControl = ({ options, activeValue, onChange }: { 
  options: { label: string; value: any }[], 
  activeValue: any, 
  onChange: (val: any) => void 
}) => (
  <View style={styles.segmentedControl}>
    {options.map((opt) => (
      <TouchableOpacity
        key={opt.value}
        style={[styles.segmentButton, activeValue === opt.value && styles.activeSegment]}
        onPress={() => onChange(opt.value)}
      >
        <Text style={[styles.segmentText, activeValue === opt.value && styles.activeSegmentText]}>
          {opt.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const ALL_INGREDIENTS = ['Pasta', 'Chicken', 'Beef', 'Rice', 'Garlic', 'Lemon', 'Tomato', 'Salmon', 'Quinoa'];

export const FilterModal = ({ visible, onClose, onApply }: FilterModalProps) => {
  const [budget, setBudget] = useState('any');
  const [time, setTime] = useState('any');
  const [guests, setGuests] = useState(1);
  const [diet, setDiet] = useState('all');
  const [origin, setOrigin] = useState('all');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleReset = () => {
    setBudget('any');
    setTime('any');
    setGuests(1);
    setDiet('all');
    setOrigin('all');
    setIngredients([]);
  };

  const toggleIngredient = (ingredient: string) => {
    setIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleApply = () => {
    onApply({
      budget,
      time,
      guests,
      diet,
      origin,
      ingredients,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} accessibilityLabel="Cancel filters">
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={handleReset} accessibilityLabel="Reset filters">
            <Text style={styles.headerButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Budget Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Budget</Text>
            <SegmentedControl
              activeValue={budget}
              onChange={setBudget}
              options={[
                { label: 'Any', value: 'any' },
                { label: 'Under $100', value: 'under100' },
                { label: '$100-200', value: '100-200' },
                { label: 'Over $200', value: 'over200' },
              ]}
            />
          </View>

          {/* Cooking Time Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cooking Time</Text>
            <SegmentedControl
              activeValue={time}
              onChange={setTime}
              options={[
                { label: 'Any', value: 'any' },
                { label: 'Under 15m', value: 'under15' },
                { label: '15-30m', value: '15-30' },
                { label: 'Over 45m', value: 'over45' },
              ]}
            />
          </View>

          {/* Guests Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How many will be eating</Text>
            <SegmentedControl
              activeValue={guests}
              onChange={setGuests}
              options={[
                { label: '1 Person', value: 1 },
                { label: '2 People', value: 2 },
                { label: '4 People', value: 4 },
              ]}
            />
          </View>

          {/* Diet Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diet</Text>
            <View style={styles.buttonGrid}>
              {['all', 'Balanced', 'Protein', 'Healthy'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.gridButton, diet === item && styles.activeGridButton]}
                  onPress={() => setDiet(item)}
                >
                  <Text style={[styles.gridButtonText, diet === item && styles.activeGridButtonText]}>
                    {item === 'all' ? 'All' : item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Origin Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meal Origin</Text>
            <View style={styles.buttonGrid}>
              {['all', 'Asian', 'Egyptian', 'Italian', 'Indian'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.gridButton, origin === item && styles.activeGridButton]}
                  onPress={() => setOrigin(item)}
                >
                  <Text style={[styles.gridButtonText, origin === item && styles.activeGridButtonText]}>
                    {item === 'all' ? 'All' : item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Cook with what you have Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cook with what you have</Text>
            <View style={styles.ingredientsGrid}>
              {ALL_INGREDIENTS.map((ingredient) => {
                const isActive = ingredients.includes(ingredient);
                return (
                  <TouchableOpacity
                    key={ingredient}
                    style={[styles.ingredientChip, isActive && styles.activeChip]}
                    onPress={() => toggleIngredient(ingredient)}
                  >
                    <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                      {ingredient}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          
          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply} activeOpacity={0.8}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F0' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  headerButtonText: { fontSize: 16, color: '#FF6347' },
  content: { flex: 1, paddingHorizontal: 16 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 12 },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#E2E2E2',
    borderRadius: 12,
    padding: 2,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeSegment: { backgroundColor: '#fff', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1 },
  segmentText: { fontSize: 14, color: '#666' },
  activeSegmentText: { color: '#000', fontWeight: '600' },
  buttonGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },
  activeGridButton: { borderColor: '#FF6347', backgroundColor: '#FFF5F2' },
  gridButtonText: { fontSize: 14, color: '#666' },
  activeGridButtonText: { color: '#FF6347', fontWeight: '600' },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  applyButton: {
    backgroundColor: '#FF6347',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#FF6347',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  applyButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  ingredientsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  ingredientChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },
  activeChip: { backgroundColor: '#FF6347', borderColor: '#FF6347' },
  chipText: { fontSize: 14, color: '#666' },
  activeChipText: { color: '#fff', fontWeight: '600' },
});

export default FilterModal;
