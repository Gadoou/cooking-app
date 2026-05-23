import { View, Text, StyleSheet } from 'react-native';
import { AppHeader } from '@/src/components/AppHeader';

export default function MyRecipesScreen() {
  return (
    <View style={styles.container}>
      <AppHeader welcomeText="Your Favorites" />
      <View style={styles.content}>
        <Text>My Recipes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
