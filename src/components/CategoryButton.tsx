import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CategoryButtonProps {
  label: string;
  onPress: () => void;
  active: boolean;
}

export const CategoryButton = ({ label, onPress, active }: CategoryButtonProps) => (
  <TouchableOpacity style={[styles.btn, active && styles.active]} onPress={onPress}>
    <Text style={active ? styles.activeText : styles.text}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: { 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 20, 
    backgroundColor: '#f0f0f0', 
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  active: { 
    backgroundColor: '#FF6347',
    borderColor: '#FF6347'
  },
  text: { 
    color: '#333',
    fontWeight: '500'
  },
  activeText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  }
});
