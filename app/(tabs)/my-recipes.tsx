import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { AppHeader } from '@/src/components/AppHeader';
import { useAppContext } from '@/src/context/AppContext';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';
import { RecipeCard } from '@/src/components/RecipeCard';

import { useLanguage } from '@/src/context/LanguageContext';

export default function MyRecipesScreen() {
  const { likedRecipeIds } = useAppContext();
  const { isRTL, t } = useLanguage();
  
  const likedRecipes = MOCK_RECIPES.filter(recipe => 
    likedRecipeIds.includes(recipe.id)
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader welcomeText="Your Favorites" />
      <View style={styles.content}>
        {likedRecipes.length > 0 ? (
          <FlatList
            data={likedRecipes}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <RecipeCard recipe={item} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { textAlign: isRTL ? 'right' : 'center' }]}>
              {t("You haven't liked any recipes yet.")}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center'
  }
});
