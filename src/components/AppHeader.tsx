import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AppHeader = ({ welcomeText, rightElement }: { welcomeText: string; rightElement?: React.ReactNode }) => (
  <View style={styles.header}>
    <View style={styles.topRow}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/images/brandlogo2.jpeg')} 
          style={styles.brandLogo} 
          resizeMode="contain" 
        />
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
    backgroundColor: '#F5F5F0'
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
    marginLeft: -85,
  },
  brandLogo: {
    height: 86,
    width: 303, // Adjust width based on typical logo proportions, contain will handle the rest
  },
  welcome: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600'
  }
});
