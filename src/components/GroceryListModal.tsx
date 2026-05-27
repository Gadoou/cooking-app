import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe, Ingredient } from '../types';

interface GroceryListModalProps {
  visible: boolean;
  onClose: () => void;
  dayRecipes: Recipe[];
  weekRecipes: Recipe[];
}

interface ConsolidatedIngredient {
  name: string;
  quantity: string;
  price: number;
}

export const GroceryListModal: React.FC<GroceryListModalProps> = ({
  visible,
  onClose,
  dayRecipes,
  weekRecipes,
}) => {
  const [showFullWeek, setShowFullWeek] = useState(false);
  const [ownedItems, setOwnedItems] = useState<Record<string, boolean>>({});

  const consolidatedList = useMemo(() => {
    const recipes = showFullWeek ? weekRecipes : dayRecipes;
    const map = new Map<string, { quantityVal: number; unit: string; price: number; rawQuantities: string[] }>();

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        const existing = map.get(ing.name);
        
        // Basic parser for units like "200g", "50ml", "4 cloves"
        const match = ing.quantity.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/);
        const val = match ? parseFloat(match[1]) : 0;
        const unit = match ? match[2].toLowerCase() : '';

        if (existing) {
          // If units match, we can sum numerically
          const canSum = unit !== '' && existing.unit === unit;
          map.set(ing.name, {
            quantityVal: canSum ? existing.quantityVal + val : 0,
            unit: existing.unit,
            price: existing.price + ing.price,
            rawQuantities: canSum ? [] : [...existing.rawQuantities, ing.quantity]
          });
        } else {
          map.set(ing.name, {
            quantityVal: val,
            unit: unit,
            price: ing.price,
            rawQuantities: match ? [] : [ing.quantity]
          });
        }
      });
    });

    return Array.from(map.entries()).map(([name, data]) => {
      let displayQuantity = '';
      if (data.quantityVal > 0) {
        displayQuantity = `${data.quantityVal}${data.unit}`;
      } else {
        displayQuantity = data.rawQuantities.join(' + ');
      }

      return {
        name,
        quantity: displayQuantity,
        price: data.price,
        isOwned: ownedItems[name]
      };
    });
  }, [showFullWeek, dayRecipes, weekRecipes, ownedItems]);

  const totalPrice = useMemo(() => {
    return consolidatedList.reduce((acc, item) => {
      if (!ownedItems[item.name]) {
        return acc + item.price;
      }
      return acc;
    }, 0);
  }, [consolidatedList, ownedItems]);

  const toggleItemOwned = (name: string) => {
    setOwnedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed',
      `Your order for $${totalPrice.toFixed(2)} has been placed successfully!`,
      [{ text: 'OK', onPress: onClose }]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Grocery List</Text>
          <View style={{ width: 28 }} />
        </View>

        <View style={styles.toggleContainer}>
          <View style={styles.segmentedControl}>
            <TouchableOpacity 
              style={[styles.segmentButton, !showFullWeek && styles.activeSegment]} 
              onPress={() => setShowFullWeek(false)}
            >
              <Text style={[styles.segmentText, !showFullWeek && styles.activeSegmentText]}>
                Today's check out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.segmentButton, showFullWeek && styles.activeSegment]} 
              onPress={() => setShowFullWeek(true)}
            >
              <Text style={[styles.segmentText, showFullWeek && styles.activeSegmentText]}>
                The whole week
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={consolidatedList}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemRow}
              onPress={() => toggleItemOwned(item.name)}
            >
              <View style={styles.itemInfo}>
                <Ionicons
                  name={ownedItems[item.name] ? 'checkbox' : 'square-outline'}
                  size={24}
                  color={ownedItems[item.name] ? '#FF6347' : '#CCC'}
                />
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.itemName,
                      ownedItems[item.name] && styles.strikethrough,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No ingredients found in plan.</Text>
            </View>
          }
        />

        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total to Buy:</Text>
            <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.orderButton,
              totalPrice === 0 && styles.disabledButton,
            ]}
            onPress={handlePlaceOrder}
            disabled={totalPrice === 0}
          >
            <Text style={styles.orderButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  toggleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 4,
    height: 50,
  },
  segmentButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  activeSegment: {
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeSegmentText: {
    color: '#FF6347',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#AAA',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
  },
  orderButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  orderButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
