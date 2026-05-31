import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePlanner } from '@/src/context/PlannerContext';
import { MOCK_RECIPES } from '@/src/data/mockRecipes';

import { useLanguage } from '@/src/context/LanguageContext';

export const PlannerStats = () => {
  const { weekEntries } = usePlanner();
  const { isRTL, t } = useLanguage();

  const stats = useMemo(() => {
    const allIds = Object.values(weekEntries).flatMap(day => [
      ...day.breakfast,
      ...day.lunch,
      ...day.dinner,
    ]);
    
    const recipes = allIds.map(id => MOCK_RECIPES.find(r => r.id === id)).filter(Boolean);
    
    const totalCost = recipes.reduce((sum, r) => sum + (r?.cost || 0), 0);
    const totalTime = recipes.reduce((sum, r) => sum + (r?.cookingTime || 0), 0);
    const avgTime = recipes.length > 0 ? totalTime / recipes.length : 0;

    return { count: recipes.length, totalCost, avgTime };
  }, [weekEntries]);

  return (
    <View style={[styles.container, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
      <View style={styles.stat}>
        <Text style={styles.value}>{stats.count}</Text>
        <Text style={styles.label}>{t('Meals')}</Text>
      </View>
      <View style={[styles.stat, styles.border]}>
        <Text style={styles.value}>
          {isRTL ? `${stats.totalCost.toFixed(2)} ${t('$')}` : `${t('$')}${stats.totalCost.toFixed(2)}`}
        </Text>
        <Text style={styles.label}>{t('Total Cost')}</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.value}>{Math.round(stats.avgTime)}{t('mins')}</Text>
        <Text style={styles.label}>{t('Avg. Time')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stat: { alignItems: 'center', flex: 1 },
  border: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F0F0F0',
  },
  label: { fontSize: 11, color: '#999', marginTop: 2, fontWeight: '600', textTransform: 'uppercase' },
  value: { fontSize: 16, fontWeight: '700', color: '#FF6347' },
});
