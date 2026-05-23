import React, { useState } from 'react';
import { StyleSheet, TextInput, FlatList, View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';
import { CategoryButton } from '@/src/components/CategoryButton';
import { RecipeCard } from '@/src/components/RecipeCard';
import { AppHeader } from '@/src/components/AppHeader';

const CATEGORIES = [
  { id: 'quick', label: 'Quick', icon: 'timer-outline' },
  { id: 'cost', label: 'Budget', icon: 'cash-outline' },
  { id: 'group', label: 'Groups', icon: 'people-outline' },
  { id: 'all', label: 'All', icon: 'grid-outline' },
  { id: 'custom', label: 'Filter', icon: 'options-outline' }
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRecipes = MOCK_RECIPES.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          recipe.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'quick') return matchesSearch && recipe.cookingTime < 30;
    if (activeFilter === 'cost') return matchesSearch && recipe.cost < 15;
    if (activeFilter === 'group') return matchesSearch && recipe.dietStyle === 'group';
    
    return matchesSearch;
  }).sort((a, b) => b.likes - a.likes).slice(0, 4);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader welcomeText="Welcome, Foodie!" />
      
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>What do you wanna cook today?</Text>
        <Text style={styles.subTitle}>the choice that matches your time and budget</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="search by recipe or ingredient"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filters - No Scrolling */}
      <View style={styles.filtersWrapper}>
        <View style={styles.filtersRow}>
          {CATEGORIES.map(cat => (
            <CategoryButton
              key={cat.id}
              label={cat.label}
              iconName={cat.icon}
              active={activeFilter === cat.id}
              onPress={() => setActiveFilter(cat.id)}
            />
          ))}
        </View>
      </View>

      {/* Suggested Recipes */}
      <Text style={styles.sectionTitle}>Suggested Recipes</Text>
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 15,
    marginBottom: 5
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 30
  },
  subTitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 45
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000'
  },
  filtersWrapper: {
    paddingHorizontal: 12,
    marginBottom: 20
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20
  }
});
