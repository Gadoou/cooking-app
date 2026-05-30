import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';

import { useLanguage } from '@/src/context/LanguageContext';

interface MealSlotItemProps {
  label: string;
  recipeIds: string[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export const MealSlotItem = ({ label, recipeIds, onAdd, onRemove }: MealSlotItemProps) => {
  const { isRTL, t } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <Text style={styles.label}>{t(label)}</Text>
        <TouchableOpacity onPress={onAdd} style={styles.addButton}>
          <Ionicons name="add-circle" size={24} color="#FF6347" />
        </TouchableOpacity>
      </View>
      {recipeIds.length === 0 ? (
        <TouchableOpacity onPress={onAdd} style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t("Tap to add a meal")}</Text>
        </TouchableOpacity>
      ) : (
        recipeIds.map((id, index) => {
          const recipe = MOCK_RECIPES.find(r => r.id === id);
          return (
            <View key={`${id}-${index}`} style={[styles.recipeCard, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Image source={recipe?.image} style={[styles.mealImage, { marginLeft: isRTL ? 12 : 0, marginRight: isRTL ? 0 : 12 }]} />
              <View style={[styles.recipeInfo, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Ionicons name="restaurant-outline" size={16} color="#FF6347" style={{ marginLeft: isRTL ? 8 : 0, marginRight: isRTL ? 0 : 8 }} />
                <Text style={[styles.recipeTitle, { textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={1}>{t(recipe?.title || 'Unknown')}</Text>
              </View>
              <TouchableOpacity onPress={() => onRemove(id)}>
                <Ionicons name="trash-outline" size={18} color="#999" />
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  label: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#888', 
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  addButton: { padding: 2 },
  emptyContainer: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EEE',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center'
  },
  emptyText: { color: '#AAA', fontSize: 13 },
  recipeCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  mealImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  recipeInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  recipeTitle: { fontSize: 14, color: '#333', fontWeight: '500', flex: 1 },
});
