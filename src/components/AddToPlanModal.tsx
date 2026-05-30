import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MealSlot } from '../types';

import { useLanguage } from '@/src/context/LanguageContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SLOTS: MealSlot[] = ['breakfast', 'lunch', 'dinner'];

interface AddToPlanModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (day: string, slot: MealSlot) => void;
}

export const AddToPlanModal = ({ visible, onClose, onConfirm }: AddToPlanModalProps) => {
  const { isRTL, t } = useLanguage();
  const [step, setStep] = useState<'day' | 'slot'>('day');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const handleClose = () => {
    setStep('day');
    setSelectedDay(null);
    onClose();
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    setStep('slot');
  };

  const handleSlotSelect = (slot: MealSlot) => {
    if (selectedDay) {
      onConfirm(selectedDay, slot);
      handleClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.content}>
          <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            {step === 'slot' && (
              <TouchableOpacity onPress={() => setStep('day')} style={isRTL ? styles.backButtonRTL : styles.backButton}>
                <Ionicons name={isRTL ? "chevron-forward" : "chevron-back"} size={24} color="#333" />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>{step === 'day' ? t('Select Day') : t('Select Slot')}</Text>
            <TouchableOpacity onPress={handleClose} style={isRTL ? styles.closeButtonRTL : styles.closeButton}>
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          {step === 'day' ? (
            <FlatList
              data={DAYS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={[styles.item, { flexDirection: isRTL ? 'row-reverse' : 'row' }]} onPress={() => handleDaySelect(item)}>
                  <Text style={[styles.itemText, { textAlign: isRTL ? 'right' : 'left' }]}>{t(item)}</Text>
                  <Ionicons name={isRTL ? "chevron-back" : "chevron-forward"} size={20} color="#CCC" />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.slotContainer}>
              {SLOTS.map((slot) => (
                <TouchableOpacity key={slot} style={[styles.item, { flexDirection: isRTL ? 'row-reverse' : 'row' }]} onPress={() => handleSlotSelect(slot)}>
                  <Text style={[styles.itemText, { textAlign: isRTL ? 'right' : 'left' }]}>{t(slot.charAt(0).toUpperCase() + slot.slice(1))}</Text>
                  <Ionicons name="add-circle-outline" size={24} color="#FF6347" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  content: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, height: '60%' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  backButton: { position: 'absolute', left: 20 },
  backButtonRTL: { position: 'absolute', right: 20 },
  closeButton: { position: 'absolute', right: 20 },
  closeButtonRTL: { position: 'absolute', left: 20 },
  title: { fontSize: 18, fontWeight: 'bold' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F0' },
  itemText: { fontSize: 16, color: '#333', fontWeight: '500' },
  slotContainer: { paddingTop: 10 }
});
