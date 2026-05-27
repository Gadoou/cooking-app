import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MealSlot } from '../types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SLOTS: MealSlot[] = ['breakfast', 'lunch', 'dinner'];

interface AddToPlanModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (day: string, slot: MealSlot) => void;
}

export const AddToPlanModal = ({ visible, onClose, onConfirm }: AddToPlanModalProps) => {
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
          <View style={styles.header}>
            {step === 'slot' && (
              <TouchableOpacity onPress={() => setStep('day')} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="#333" />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>{step === 'day' ? 'Select Day' : 'Select Slot'}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          {step === 'day' ? (
            <FlatList
              data={DAYS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleDaySelect(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.slotContainer}>
              {SLOTS.map((slot) => (
                <TouchableOpacity key={slot} style={styles.item} onPress={() => handleSlotSelect(slot)}>
                  <Text style={styles.itemText}>{slot.charAt(0).toUpperCase() + slot.slice(1)}</Text>
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
  closeButton: { position: 'absolute', right: 20 },
  title: { fontSize: 18, fontWeight: 'bold' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  itemText: { fontSize: 16, color: '#333', fontWeight: '500' },
  slotContainer: { paddingTop: 10 }
});
