import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { AppHeader } from '@/src/components/AppHeader';

export default function MyRecipesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader welcomeText="Your Favorites" />
      <View style={styles.content}>
        <Text>My Recipes</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
