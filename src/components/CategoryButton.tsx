import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CategoryButtonProps {
  label: string;
  onPress: () => void;
  active: boolean;
  iconName?: any;
}

export const CategoryButton = ({ label, onPress, active, iconName }: CategoryButtonProps) => (
  <TouchableOpacity style={[styles.btn, active && styles.active]} onPress={onPress}>
    <View style={styles.iconPlaceholder}>
      <Ionicons name={iconName || 'restaurant-outline'} size={20} color={active ? '#fff' : '#D4AF37'} />
    </View>
    <Text style={[active ? styles.activeText : styles.text]} numberOfLines={1}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: { 
    flex: 1,
    paddingVertical: 8, 
    paddingHorizontal: 4,
    borderRadius: 12, 
    backgroundColor: '#f8f8f8', 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 2
  },
  active: { 
    backgroundColor: '#FF6347',
    borderColor: '#FF6347'
  },
  iconPlaceholder: {
    marginBottom: 4
  },
  text: { 
    color: '#333',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center'
  },
  activeText: { 
    color: '#fff', 
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
