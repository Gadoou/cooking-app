import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlannerState, DayPlan, MealSlot } from '../types';

interface PlannerContextType extends PlannerState {
  addMeal: (date: string, slot: MealSlot, recipeId: string) => void;
  removeMeal: (date: string, slot: MealSlot, recipeId: string) => void;
  toggleKeepPlan: (value: boolean) => void;
  clearWeek: () => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

const STORAGE_KEY = '@planner_state';

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlannerState>({
    weekEntries: {},
    keepPlan: false,
  });

  useEffect(() => {
    const loadState = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setState(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed to load planner state', e);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save planner state', e);
      }
    };
    saveState();
  }, [state]);

  const addMeal = (date: string, slot: MealSlot, recipeId: string) => {
    setState(prev => {
      const day = prev.weekEntries[date] || { breakfast: [], lunch: [], dinner: [] };
      return {
        ...prev,
        weekEntries: {
          ...prev.weekEntries,
          [date]: { 
            ...day, 
            [slot]: [...day[slot], recipeId] 
          },
        },
      };
    });
  };

  const removeMeal = (date: string, slot: MealSlot, recipeId: string) => {
    setState(prev => {
      const day = prev.weekEntries[date];
      if (!day) return prev;
      return {
        ...prev,
        weekEntries: {
          ...prev.weekEntries,
          [date]: { 
            ...day, 
            [slot]: day[slot].filter(id => id !== recipeId) 
          },
        },
      };
    });
  };

  const toggleKeepPlan = (keepPlan: boolean) => setState(prev => ({ ...prev, keepPlan }));
  const clearWeek = () => setState(prev => ({ ...prev, weekEntries: {} }));

  return (
    <PlannerContext.Provider value={{ ...state, addMeal, removeMeal, toggleKeepPlan, clearWeek }}>
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) throw new Error('usePlanner must be used within a PlannerProvider');
  return context;
};
