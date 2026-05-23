import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { AppHeader } from '@/src/components/AppHeader';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader welcomeText="Your Profile" />
      <View style={styles.content}>
        <Text>Profile</Text>
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
