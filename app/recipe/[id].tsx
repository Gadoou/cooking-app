import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';
import { useAppContext } from '@/src/context/AppContext';
import { IngredientItem } from '@/src/components/IngredientItem';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isLiked, toggleLike } = useAppContext();
  const recipe = MOCK_RECIPES.find(r => r.id === id);

  // Local state for "scratch-out" feature
  const [ownedIngredients, setOwnedIngredients] = useState<string[]>([]);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Recipe not found</Text>
      </SafeAreaView>
    );
  }

  const toggleIngredient = (name: string) => {
    setOwnedIngredients(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const missingIngredients = recipe.ingredients.filter(i => !ownedIngredients.includes(i.name));
  const totalCost = missingIngredients.reduce((sum, i) => sum + i.price, 0);

  const handleOrder = () => {
    if (missingIngredients.length === 0) {
      Alert.alert("Nothing to order", "You already have all the ingredients!");
      return;
    }
    Alert.alert(
      "Order Placed", 
      `Successfully ordered ${missingIngredients.length} items. Total: $${totalCost.toFixed(2)}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Recipe Details',
          headerShown: true,
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => toggleLike(recipe.id)} style={{ marginRight: 15 }}>
              <Ionicons 
                name={isLiked(recipe.id) ? "heart" : "heart-outline"} 
                size={26} 
                color={isLiked(recipe.id) ? "#FF6347" : "#000"} 
              />
            </TouchableOpacity>
          )
        }} 
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.title}</Text>
          
          {/* Info Bar */}
          <View style={styles.infoBar}>
            <View style={styles.infoItem}>
              <Ionicons name="cash-outline" size={20} color="#D4AF37" />
              <Text style={styles.infoText}>${recipe.cost}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="timer-outline" size={20} color="#D4AF37" />
              <Text style={styles.infoText}>{recipe.cookingTime}m</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="globe-outline" size={20} color="#D4AF37" />
              <Text style={styles.infoText}>{recipe.origin}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="leaf-outline" size={20} color="#D4AF37" />
              <Text style={styles.infoText}>{recipe.dietStyle}</Text>
            </View>
          </View>

          <View style={styles.placeholderImage}>
            <Ionicons name="restaurant-outline" size={80} color="#D4AF37" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{recipe.overview}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <Text style={styles.missingCount}>
                {missingIngredients.length} items missing
              </Text>
            </View>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem
                key={index}
                name={ingredient.name}
                quantity={ingredient.quantity}
                price={ingredient.price}
                isOwned={ownedIngredients.includes(ingredient.name)}
                onToggle={() => toggleIngredient(ingredient.name)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Cart Footer */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.totalLabel}>Missing Total:</Text>
          <Text style={styles.totalPrice}>${totalCost.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Order Missing Items</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Space for footer
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#fdfdfd',
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#555'
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  missingCount: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: '600'
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footerInfo: {
    flex: 1
  },
  totalLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  orderButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1.2,
    marginLeft: 15,
    alignItems: 'center'
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  }
});
