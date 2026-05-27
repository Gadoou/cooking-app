import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AppHeader = ({ welcomeText, rightElement }: { welcomeText: string; rightElement?: React.ReactNode }) => (
  <View style={styles.header}>
    <View style={styles.topRow}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Ionicons name="restaurant" size={24} color="#fff" />
        </View>
        <Text style={styles.logoText}>ChefPal</Text>
      </View>
      {rightElement}
    </View>
    <Text style={styles.welcome}>{welcomeText}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#FFFFFF'
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FF6347',
    letterSpacing: -0.5
  },
  welcome: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600'
  }
});
