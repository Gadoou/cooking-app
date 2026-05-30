import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/src/context/LanguageContext';

export const AppHeader = ({ welcomeText, rightElement }: { welcomeText: string; rightElement?: React.ReactNode }) => {
  const { isRTL, toggleLayout, t } = useLanguage();

  return (
    <View style={styles.header}>
      <View style={[styles.topRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/brandlogo2.jpeg')} 
            style={styles.brandLogo} 
            resizeMode="contain" 
          />
        </View>
        <View style={styles.headerRight}>
          {rightElement}
          <TouchableOpacity style={styles.langToggle} onPress={toggleLayout}>
            <Text style={styles.langText}>{isRTL ? 'EN' : 'AR'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.welcome, { textAlign: isRTL ? 'right' : 'left' }]}>
        {t(welcomeText)}
      </Text>
    </View>
  );
};

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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  langToggle: {
    marginLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E5E5E0'
  },
  langText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#666'
  },
  welcome: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600'
  }
});
