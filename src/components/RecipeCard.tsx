import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
}

export const RecipeCard = ({ recipe, onPress }: RecipeCardProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.imagePlaceholder}>
      <Ionicons name="fast-food-outline" size={40} color="#ccc" />
    </View>
    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={1}>{recipe.title}</Text>
      <View style={styles.footer}>
        <View style={styles.stat}>
          <Ionicons name="heart" size={14} color="#FF6347" />
          <Text style={styles.statText}>{recipe.likes}</Text>
        </View>
        <Text style={styles.statText}>{recipe.cookingTime}m</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden'
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    padding: 10
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4
  }
});
