import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextType {
  likedRecipeIds: string[];
  toggleLike: (recipeId: string) => void;
  isLiked: (recipeId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedRecipeIds, setLikedRecipeIds] = useState<string[]>([]);

  useEffect(() => {
    loadLikes();
  }, []);

  const loadLikes = async () => {
    try {
      const savedLikes = await AsyncStorage.getItem('likedRecipeIds');
      if (savedLikes) {
        setLikedRecipeIds(JSON.parse(savedLikes));
      }
    } catch (e) {
      console.error('Failed to load likes', e);
    }
  };

  const toggleLike = async (recipeId: string) => {
    try {
      const newLikes = likedRecipeIds.includes(recipeId)
        ? likedRecipeIds.filter(id => id !== recipeId)
        : [...likedRecipeIds, recipeId];
      
      setLikedRecipeIds(newLikes);
      await AsyncStorage.setItem('likedRecipeIds', JSON.stringify(newLikes));
    } catch (e) {
      console.error('Failed to save like', e);
    }
  };

  const isLiked = (recipeId: string) => likedRecipeIds.includes(recipeId);

  return (
    <AppContext.Provider value={{ likedRecipeIds, toggleLike, isLiked }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
