import React, { useState } from 'react';
import { StyleSheet, TextInput, FlatList, View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';
import { CategoryButton } from '@/src/components/CategoryButton';
import { RecipeCard } from '@/src/components/RecipeCard';
import { AppHeader } from '@/src/components/AppHeader';
import { FilterModal, FilterState } from '@/src/components/FilterModal';
import { useLanguage } from '@/src/context/LanguageContext';

const CATEGORIES = [
  { id: 'quick', label: 'Quick', icon: 'timer-outline' },
  { id: 'cost', label: 'Budget', icon: 'cash-outline' },
  { id: 'group', label: 'Groups', icon: 'people-outline' },
  { id: 'all', label: 'All', icon: 'grid-outline' },
  { id: 'custom', label: 'Filter', icon: 'options-outline' }
];

const INITIAL_FILTERS: FilterState = {
  budget: 'any',
  time: 'any',
  guests: 1,
  diet: 'all',
  origin: 'all',
  ingredients: []
};

export default function HomeScreen() {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filteredRecipes = MOCK_RECIPES.filter(recipe => {
    // Search Query Logic
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          recipe.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    // Budget Filter
    if (activeFilters.budget !== 'any') {
      if (activeFilters.budget === 'under100' && recipe.cost >= 100) return false;
      if (activeFilters.budget === '100-200' && (recipe.cost < 100 || recipe.cost > 200)) return false;
      if (activeFilters.budget === 'over200' && recipe.cost <= 200) return false;
    }

    // Time Filter
    if (activeFilters.time !== 'any') {
      if (activeFilters.time === 'under15' && recipe.cookingTime >= 15) return false;
      if (activeFilters.time === '15-30' && (recipe.cookingTime < 15 || recipe.cookingTime > 30)) return false;
      if (activeFilters.time === 'over45' && recipe.cookingTime <= 45) return false;
    }

    // Diet Filter
    if (activeFilters.diet !== 'all') {
      if (recipe.dietStyle.toLowerCase() !== activeFilters.diet.toLowerCase()) return false;
    }

    // Origin Filter
    if (activeFilters.origin !== 'all') {
      if (recipe.origin.toLowerCase() !== activeFilters.origin.toLowerCase()) return false;
    }

    // Ingredients Filter
    if (activeFilters.ingredients.length > 0) {
      const recipeIngredientNames = recipe.ingredients.map(i => i.name.toLowerCase());
      const hasAllIngredients = activeFilters.ingredients.every(ing => 
        recipeIngredientNames.includes(ing.toLowerCase())
      );
      if (!hasAllIngredients) return false;
    }

    return true;
  }).sort((a, b) => b.likes - a.likes).slice(0, 4);

  const handleCategoryPress = (id: string) => {
    if (id === 'custom') {
      setIsFilterVisible(true);
    } else if (id === 'all') {
      setActiveFilters(INITIAL_FILTERS);
    } else if (id === 'quick') {
      setActiveFilters({ ...INITIAL_FILTERS, time: '15-30' });
    } else if (id === 'cost') {
      setActiveFilters({ ...INITIAL_FILTERS, budget: 'under100' });
    } else if (id === 'group') {
      setActiveFilters({ ...INITIAL_FILTERS, diet: 'group' });
    }
  };

  const isCategoryActive = (id: string) => {
    if (id === 'all') return JSON.stringify(activeFilters) === JSON.stringify(INITIAL_FILTERS);
    if (id === 'quick') return activeFilters.time === '15-30';
    if (id === 'cost') return activeFilters.budget === 'under100';
    if (id === 'group') return activeFilters.diet === 'group';
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader welcomeText={t('welcomeFoodie')} />
      
      <View style={[styles.titleContainer, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
        <Text style={[styles.mainTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
          {t('mainTitle')}
        </Text>
        <Text style={[styles.subTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
          {t('subTitle')}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <Ionicons 
          name="search" 
          size={20} 
          color="#666" 
          style={isRTL ? { marginLeft: 8 } : { marginRight: 8 }} 
        />
        <TextInput
          style={[styles.searchInput, { textAlign: isRTL ? 'right' : 'left' }]}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filters - No Scrolling */}
      <View style={styles.filtersWrapper}>
        <View style={[styles.filtersRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          {CATEGORIES.map(cat => (
            <CategoryButton
              key={cat.id}
              label={t(cat.id)}
              iconName={cat.icon}
              active={isCategoryActive(cat.id)}
              onPress={() => handleCategoryPress(cat.id)}
            />
          ))}
        </View>
      </View>

      {/* Suggested Recipes */}
      <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
        {t('suggestedRecipes')}
      </Text>
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

      <FilterModal 
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onApply={(filters) => setActiveFilters(filters)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
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
