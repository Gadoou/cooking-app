import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, FlatList, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';
import { CategoryButton } from '@/src/components/CategoryButton';
import { RecipeCard } from '@/src/components/RecipeCard';

const CATEGORIES = [
  { id: 'quick', label: 'Quick Meals' },
  { id: 'cost', label: 'Cost Friendly' },
  { id: 'group', label: 'Big Groups' },
  { id: 'all', label: 'All Recipes' },
  { id: 'custom', label: 'Custom Filter' }
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
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by recipe or ingredient"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
          {CATEGORIES.map(cat => (
            <CategoryButton
              key={cat.id}
              label={cat.label}
              active={activeFilter === cat.id}
              onPress={() => setActiveFilter(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Suggested Recipes */}
      <Text style={styles.sectionTitle}>Suggested Recipes</Text>
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => {}} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 50
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16
  },
  filtersContainer: {
    height: 60,
    marginBottom: 16
  },
  filtersContent: {
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12
  },
  listContent: {
    paddingHorizontal: 8
  }
});
