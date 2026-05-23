import { Recipe } from '../types';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Spicy Garlic Pasta',
    overview: 'A quick 15-minute pasta dish.',
    cost: 12.50,
    likes: 1200,
    origin: 'Italy',
    cookingTime: 15,
    dietStyle: 'lowCal',
    ingredients: [{ name: 'Pasta', quantity: '200g', price: 2.0, imageName: 'pasta', isOwned: false }],
    stages: [{ id: 's1', timeNeeded: 10, videoURL: 'https://example.com/video.mp4', textDescription: 'Boil water' }],
    isLiked: false
  },
  {
    id: '2',
    title: 'High Protein Chicken Bowl',
    overview: 'Perfect for muscle building.',
    cost: 18.00,
    likes: 850,
    origin: 'Global',
    cookingTime: 25,
    dietStyle: 'protein',
    ingredients: [{ name: 'Chicken', quantity: '250g', price: 5.0, imageName: 'chicken', isOwned: false }],
    stages: [{ id: 's2', timeNeeded: 20, videoURL: 'https://example.com/video2.mp4', textDescription: 'Grill chicken' }],
    isLiked: true
  }
];
