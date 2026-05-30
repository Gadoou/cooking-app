import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Recipe } from '../types';
import { useLanguage } from '@/src/context/LanguageContext';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const router = useRouter();
  const { isRTL, t } = useLanguage();

  const handlePress = () => {
    router.push({
      pathname: '/recipe/[id]',
      params: { id: recipe.id }
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.imagePlaceholder}>
        {recipe.image ? (
          <Image source={recipe.image} style={styles.recipeImage} />
        ) : (
          <Ionicons name="fast-food-outline" size={40} color="#D4AF37" />
        )}
      </View>
      <View style={[styles.info, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
        <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={1}>
          {t(recipe.title)}
        </Text>
        <View style={[styles.footer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={[styles.stat, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Ionicons name="heart" size={14} color="#FF6347" />
            <Text style={[styles.statText, isRTL ? { marginRight: 4 } : { marginLeft: 4 }]}>
              {recipe.likes}
            </Text>
          </View>
          <Text style={styles.statText}>{recipe.cookingTime}{t("mins")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
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
    backgroundColor: '#fdfdfd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
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
