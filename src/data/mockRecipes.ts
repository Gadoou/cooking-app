import { Recipe } from '../types';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Spicy Garlic Pasta',
    overview: 'A quick 15-minute pasta dish with olive oil, chili flakes, and lots of garlic.',
    cost: 12.50,
    likes: 1200,
    origin: 'Italy',
    cookingTime: 15,
    dietStyle: 'lowCal',
    ingredients: [
      { name: 'Pasta', quantity: '200g', price: 2.0, imageName: 'pasta', isOwned: false },
      { name: 'Garlic', quantity: '4 cloves', price: 0.5, imageName: 'garlic', isOwned: false },
      { name: 'Olive Oil', quantity: '50ml', price: 1.5, imageName: 'oil', isOwned: false }
    ],
    stages: [{ id: 's1', timeNeeded: 10, videoURL: 'https://example.com/video.mp4', textDescription: 'Boil water and cook pasta until al dente.' }],
    reviews: [
      { id: 'r1', user: 'Chef Mario', rating: 5, comment: 'Simple and delicious!', date: '2026-05-20' },
      { id: 'r2', user: 'Linda P.', rating: 4, comment: 'Great for a quick lunch.', date: '2026-05-21' }
    ],
    isLiked: false,
    image: require('@/assets/images/icon.png')
  },
  {
    id: '2',
    title: 'High Protein Chicken Bowl',
    overview: 'Perfect for muscle building with grilled chicken, brown rice, and steamed broccoli.',
    cost: 18.00,
    likes: 2850,
    origin: 'Global',
    cookingTime: 25,
    dietStyle: 'protein',
    ingredients: [
      { name: 'Chicken', quantity: '250g', price: 5.0, imageName: 'chicken', isOwned: false },
      { name: 'Rice', quantity: '100g', price: 1.0, imageName: 'rice', isOwned: false },
      { name: 'Broccoli', quantity: '150g', price: 2.5, imageName: 'broccoli', isOwned: false }
    ],
    stages: [{ id: 's2', timeNeeded: 20, videoURL: 'https://example.com/video2.mp4', textDescription: 'Grill chicken with your favorite spices.' }],
    reviews: [
      { id: 'r3', user: 'GymRat99', rating: 5, comment: 'The best post-workout meal!', date: '2026-05-19' }
    ],
    isLiked: true,
    image: require('@/assets/images/icon.png')
  },
  {
    id: '3',
    title: 'Vegan Quinoa Salad',
    overview: 'Refreshing and light salad with fresh veggies and a lemon dressing.',
    cost: 10.00,
    likes: 1450,
    origin: 'South America',
    cookingTime: 20,
    dietStyle: 'vegan',
    ingredients: [
      { name: 'Quinoa', quantity: '150g', price: 3.0, imageName: 'quinoa', isOwned: false },
      { name: 'Cucumber', quantity: '1 large', price: 1.0, imageName: 'cucumber', isOwned: false },
      { name: 'Lemon', quantity: '1 unit', price: 0.5, imageName: 'lemon', isOwned: false }
    ],
    stages: [{ id: 's3', timeNeeded: 15, videoURL: 'https://example.com/video3.mp4', textDescription: 'Mix cooked quinoa with chopped vegetables.' }],
    reviews: [],
    isLiked: false,
    image: require('@/assets/images/icon.png')
  },
  {
    id: '4',
    title: 'Family Taco Feast',
    overview: 'A massive taco spread perfect for big gatherings and parties.',
    cost: 45.00,
    likes: 3100,
    origin: 'Mexico',
    cookingTime: 40,
    dietStyle: 'group',
    ingredients: [
      { name: 'Beef', quantity: '1kg', price: 12.0, imageName: 'beef', isOwned: false },
      { name: 'Tortillas', quantity: '24 units', price: 5.0, imageName: 'tortilla', isOwned: false },
      { name: 'Avocado', quantity: '4 units', price: 8.0, imageName: 'avocado', isOwned: false }
    ],
    stages: [{ id: 's4', timeNeeded: 30, videoURL: 'https://example.com/video4.mp4', textDescription: 'Prepare all toppings and brown the meat.' }],
    reviews: [
      { id: 'r4', user: 'PartyHost', rating: 5, comment: 'Feeds a lot of people! Great flavor.', date: '2026-05-18' }
    ],
    isLiked: false,
    image: require('@/assets/images/icon.png')
  },
  {
    id: '5',
    title: 'Budget Lentil Soup',
    overview: 'Warm, filling, and incredibly cheap to make in large batches.',
    cost: 8.50,
    likes: 1600,
    origin: 'Global',
    cookingTime: 45,
    dietStyle: 'lowCal',
    ingredients: [
      { name: 'Lentils', quantity: '500g', price: 2.0, imageName: 'lentils', isOwned: false },
      { name: 'Carrots', quantity: '3 units', price: 1.0, imageName: 'carrots', isOwned: false },
      { name: 'Onions', quantity: '2 units', price: 0.8, imageName: 'onions', isOwned: false }
    ],
    stages: [{ id: 's5', timeNeeded: 40, videoURL: 'https://example.com/video5.mp4', textDescription: 'Simmer lentils and veggies until soft.' }],
    reviews: [],
    isLiked: false,
    image: require('@/assets/images/icon.png')
  },
  {
    id: '6',
    title: 'Keto Salmon Steak',
    overview: 'Premium protein and healthy fats with buttery Atlantic salmon.',
    cost: 25.00,
    likes: 2500,
    origin: 'Nordic',
    cookingTime: 18,
    dietStyle: 'protein',
    ingredients: [
      { name: 'Salmon', quantity: '2 steaks', price: 15.0, imageName: 'salmon', isOwned: false },
      { name: 'Butter', quantity: '50g', price: 2.0, imageName: 'butter', isOwned: false },
      { name: 'Asparagus', quantity: '200g', price: 4.0, imageName: 'asparagus', isOwned: false }
    ],
    stages: [{ id: 's6', timeNeeded: 12, videoURL: 'https://example.com/video6.mp4', textDescription: 'Pan-sear salmon in butter until skin is crispy.' }],
    reviews: [
      { id: 'r5', user: 'KetoQueen', rating: 5, comment: 'Crispy skin every time!', date: '2026-05-22' }
    ],
    isLiked: false,
    image: require('@/assets/images/icon.png')
  }
];
