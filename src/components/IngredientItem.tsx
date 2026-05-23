import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IngredientItemProps {
  name: string;
  quantity: string;
  price: number;
  isOwned: boolean;
  onToggle: () => void;
}

export const IngredientItem = ({ name, quantity, price, isOwned, onToggle }: IngredientItemProps) => (
  <TouchableOpacity 
    style={[styles.item, isOwned && styles.owned]} 
    onPress={onToggle}
    activeOpacity={0.7}
  >
    <Ionicons 
      name={isOwned ? "checkbox" : "square-outline"} 
      size={24} 
      color={isOwned ? "#D4AF37" : "#ccc"} 
    />
    <View style={styles.info}>
      <View style={styles.leftInfo}>
        <Text style={[styles.name, isOwned && styles.strike]}>{name}</Text>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <Text style={[styles.price, isOwned && styles.strike]}>${price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 14, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0' 
  },
  owned: { 
    opacity: 0.5 
  },
  info: { 
    marginLeft: 12, 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftInfo: {
    flex: 1
  },
  name: { 
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
  },
  quantity: {
    fontSize: 12,
    color: '#888',
    marginTop: 2
  },
  strike: { 
    textDecorationLine: 'line-through' 
  },
  price: { 
    fontSize: 15,
    fontWeight: '600',
    color: '#444' 
  }
});
