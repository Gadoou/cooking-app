import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { AppHeader } from '@/src/components/AppHeader';

export default function PlannerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader welcomeText="Your Week" />
      <View style={styles.content}>
        <Text>Planner</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
