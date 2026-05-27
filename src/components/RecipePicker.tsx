import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';
import { Ionicons } from '@expo/vector-icons';

interface RecipePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (recipeId: string) => void;
}

export const RecipePicker = ({ visible, onClose, onSelect }: RecipePickerProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Select a Recipe</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={MOCK_RECIPES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.item} 
                onPress={() => {
                  onSelect(item.id);
                  onClose();
                }}
              >
                <View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>${item.cost.toFixed(2)} • {item.cookingTime}m</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end' 
  },
  content: { 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24, 
    height: '80%',
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  list: { paddingBottom: 40 },
  item: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F5F5F5' 
  },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  itemSubtitle: { fontSize: 13, color: '#666', marginTop: 2 },
});
