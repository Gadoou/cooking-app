import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { AppHeader } from '@/src/components/AppHeader';
import { PlannerStats } from '@/src/components/PlannerStats';
import { MealSlotItem } from '@/src/components/MealSlotItem';
import { RecipePicker } from '@/src/components/RecipePicker';
import { GroceryListModal } from '@/src/components/GroceryListModal';
import { usePlanner } from '@/src/context/PlannerContext';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';
import { MealSlot } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function PlannerScreen() {
  const { weekEntries, addMeal, removeMeal } = usePlanner();
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const pillsListRef = useRef<FlatList>(null);

  const [pickerConfig, setPickerConfig] = useState<{ visible: boolean; date: string; slot: MealSlot | null }>({
    visible: false,
    date: '',
    slot: null,
  });

  const getRecipesForDay = (day: string) => {
    const dayPlan = weekEntries[day] || { breakfast: [], lunch: [], dinner: [] };
    const allIds = [...dayPlan.breakfast, ...dayPlan.lunch, ...dayPlan.dinner];
    return MOCK_RECIPES.filter(r => allIds.includes(r.id));
  };

  const getAllWeekRecipes = () => {
    const allIds = Object.values(weekEntries).flatMap(day => [
      ...day.breakfast,
      ...day.lunch,
      ...day.dinner
    ]);
    return MOCK_RECIPES.filter(r => allIds.includes(r.id));
  };

  const openPicker = (date: string, slot: MealSlot) => {
    setPickerConfig({ visible: true, date, slot });
  };

  const syncActiveDay = (index: number, shouldScrollPager: boolean = true) => {
    setActiveDayIndex(index);
    
    // Scroll the pills bar to center the active day
    pillsListRef.current?.scrollToIndex({
      index,
      viewPosition: 0.5,
      animated: true,
    });

    // Scroll the main pager (only if triggered by a pill tap)
    if (shouldScrollPager) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        welcomeText="Your Week" 
        rightElement={
          <TouchableOpacity onPress={() => setIsCartVisible(true)}>
            <Ionicons name="cart-outline" size={28} color="#FF6347" />
          </TouchableOpacity>
        }
      />
      
      {/* Day Selector Pills */}
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
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              pillsListRef.current?.scrollToIndex({ index: info.index, animated: true, viewPosition: 0.5 });
            }, 100);
          }}
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={DAYS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          syncActiveDay(index, false);
        }}
        keyExtractor={(item) => item}
        renderItem={({ item: day }) => (
          <View style={{ width: SCREEN_WIDTH }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <View style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayTitle}>{day}</Text>
                  <View style={styles.dayDot} />
                </View>

                <MealSlotItem 
                  label="Breakfast" 
                  recipeIds={weekEntries[day]?.breakfast || []}
                  onAdd={() => openPicker(day, 'breakfast')}
                  onRemove={(id) => removeMeal(day, 'breakfast', id)}
                />
                <MealSlotItem 
                  label="Lunch" 
                  recipeIds={weekEntries[day]?.lunch || []}
                  onAdd={() => openPicker(day, 'lunch')}
                  onRemove={(id) => removeMeal(day, 'lunch', id)}
                />
                <MealSlotItem 
                  label="Dinner" 
                  recipeIds={weekEntries[day]?.dinner || []}
                  onAdd={() => openPicker(day, 'dinner')}
                  onRemove={(id) => removeMeal(day, 'dinner', id)}
                />
              </View>
            </ScrollView>
          </View>
        )}
      />

      <RecipePicker 
        visible={pickerConfig.visible}
        onClose={() => setPickerConfig({ ...pickerConfig, visible: false })}
        onSelect={(id) => {
          if (pickerConfig.slot) {
            addMeal(pickerConfig.date, pickerConfig.slot, id);
          }
        }}
      />

      <View style={styles.statsFooter}>
        <PlannerStats />
      </View>

      <GroceryListModal 
        visible={isCartVisible}
        onClose={() => setIsCartVisible(false)}
        dayRecipes={getRecipesForDay(DAYS[activeDayIndex])}
        weekRecipes={getAllWeekRecipes()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  pillsContainer: { 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0', 
    paddingVertical: 12 
  },
  pillsScroll: { 
    paddingHorizontal: 16 
  },
  pill: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#F5F5F5', 
    marginRight: 8, 
    borderWidth: 1, 
    borderColor: '#EEE' 
  },
  activePill: { 
    backgroundColor: '#FF6347', 
    borderColor: '#FF6347' 
  },
  pillText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#666' 
  },
  activePillText: { 
    color: '#fff' 
  },
  scrollContent: {
    padding: 16,
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
    marginRight: 8
  },
  dayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6347'
  },
  statsFooter: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 10,
  },
});
