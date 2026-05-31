import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { useLanguage } from '@/src/context/LanguageContext';
import { Recipe, CookingStage } from '@/src/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GuidedCookingModalProps {
  visible: boolean;
  onClose: () => void;
  recipe: Recipe;
}

const GuidedCookingModal: React.FC<GuidedCookingModalProps> = ({ visible, onClose, recipe }) => {
  const { isRTL, t } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const stages = recipe.stages || [];
  const progress = stages.length > 0 ? (currentStepIndex + 1) / stages.length : 0;

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / SCREEN_WIDTH);
    setCurrentStepIndex(index);
  };

  const handleSpeak = async (text: string) => {
    const translatedText = t(text);
    const langCode = isRTL ? 'ar' : 'en';
    
    try {
      // 1. Get all available voices on the device
      const voices = await Speech.getAvailableVoicesAsync();
      
      // 2. Filter for a voice that matches our language (e.g., 'ar-SA' or 'en-US')
      const targetVoice = voices.find(v => v.language.startsWith(langCode));
      
      console.log(`Using voice: ${targetVoice?.name || 'Default'}`);

      // 3. Stop any current speech
      await Speech.stop();
      
      // 4. Speak using the EXPLICIT voice if found
      Speech.speak(translatedText, {
        language: langCode,
        voice: targetVoice?.identifier, // This is the key fix
        pitch: 1.0,
        rate: 0.9,
        onStart: () => console.log("Audio logic triggered..."),
        onError: (e) => console.error("Speech error details:", e),
      });
    } catch (error) {
      console.error("Critical speech error:", error);
    }
  };

  const renderStep = ({ item, index }: { item: CookingStage; index: number }) => {
    return (
      <View style={styles.page}>
        <Image
          source={item.videoURL as any}
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={[
            styles.speakButton,
            isRTL ? { left: 25 } : { right: 25 }
          ]}
          onPress={() => handleSpeak(item.textDescription)}
        >
          <Ionicons name="volume-high" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.descriptionCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[styles.stepTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
              {t("Step")} {index + 1}
            </Text>
            <Text style={[styles.descriptionText, { textAlign: isRTL ? 'right' : 'left' }]}>
              {t(item.textDescription)}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>

            <Text style={styles.stepCounter}>
              {currentStepIndex + 1} / {stages.length}
            </Text>
          </View>

          <FlatList
            ref={flatListRef}
            data={stages}
            renderItem={renderStep}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            inverted={isRTL}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  closeButton: {
    padding: 5,
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#333',
    marginHorizontal: 15,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6347',
  },
  stepCounter: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'center',
  },
  page: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  image: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.55,
  },
  descriptionCard: {
    flex: 1,
    backgroundColor: '#222',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  stepTitle: {
    color: '#FF6347',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
  },
  speakButton: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.55 - 62,
    backgroundColor: '#FF6347',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 10,
  },
});

export default GuidedCookingModal;
