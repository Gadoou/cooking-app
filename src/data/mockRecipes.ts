import { Recipe } from '../types';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Kafta',
    overview: 'Traditional Lebanese-style seasoned ground meat skewers, grilled to perfection with fresh parsley and Middle Eastern spices.',
    cost: 15.00,
    likes: 1850,
    origin: 'Lebanese',
    cookingTime: 25,
    dietStyle: 'protein',
    ingredients: [
      { name: 'Beef', quantity: '500g', price: 8.0, imageName: 'beef', isOwned: false },
      { name: 'Garlic', quantity: '3 cloves', price: 0.5, imageName: 'garlic', isOwned: false },
      { name: 'Onions', quantity: '1 unit', price: 0.5, imageName: 'onions', isOwned: false },
      { name: 'Parsley', quantity: '0.5 bunch', price: 1.0, imageName: 'parsley', isOwned: false }
    ],
    stages: [{ id: 's1', timeNeeded: 15, videoURL: '', textDescription: 'Mix ground meat with minced herbs and spices, then grill until charred.' }],
    reviews: [{ id: 'r1', user: 'GrillMaster', rating: 5, comment: 'Authentic flavor!', date: '2026-05-24' }],
    isLiked: false,
    image: require('@/assets/images/recipe-1.jpeg')
  },
  {
    id: '2',
    title: 'Thanksgiving Turkey',
    overview: 'A classic whole roasted turkey with herb butter, garlic, and aromatics. The centerpiece of a festive feast.',
    cost: 45.00,
    likes: 3200,
    origin: 'American',
    cookingTime: 240,
    dietStyle: 'group',
    ingredients: [
      { name: 'Chicken', quantity: '5kg', price: 35.0, imageName: 'chicken', isOwned: false },
      { name: 'Butter', quantity: '200g', price: 4.0, imageName: 'butter', isOwned: false },
      { name: 'Garlic', quantity: '1 unit', price: 1.0, imageName: 'garlic', isOwned: false },
      { name: 'Lemon', quantity: '1 unit', price: 0.5, imageName: 'lemon', isOwned: false }
    ],
    stages: [{ id: 's2', timeNeeded: 210, videoURL: '', textDescription: 'Prep the bird with herb butter and roast until internal temp hits 165°F.' }],
    reviews: [{ id: 'r2', user: 'HolidayFan', rating: 5, comment: 'Juicy and flavorful!', date: '2026-05-25' }],
    isLiked: true,
    image: require('@/assets/images/recipe-2.jpeg')
  },
  {
    id: '3',
    title: 'Steak',
    overview: 'Premium pan-seared sirloin steak seasoned with sea salt and black pepper, rested for maximum juiciness.',
    cost: 22.00,
    likes: 2100,
    origin: 'Global',
    cookingTime: 15,
    dietStyle: 'protein',
    ingredients: [
      { name: 'Beef', quantity: '300g', price: 18.0, imageName: 'beef', isOwned: false },
      { name: 'Butter', quantity: '50g', price: 1.5, imageName: 'butter', isOwned: false },
      { name: 'Garlic', quantity: '2 cloves', price: 0.5, imageName: 'garlic', isOwned: false }
    ],
    stages: [{ id: 's3', timeNeeded: 10, videoURL: '', textDescription: 'Sear in a hot cast-iron skillet for 4 mins per side, then rest.' }],
    reviews: [],
    isLiked: false,
    image: require('@/assets/images/recipe-3.jpeg')
  },
  {
    id: '4',
    title: 'Family Taco Feast',
    overview: 'A massive taco spread perfect for big gatherings and parties.',
    cost: 45.00,
    likes: 3100,
    origin: 'Mexican',
    cookingTime: 40,
    dietStyle: 'group',
    ingredients: [
      { name: 'Beef', quantity: '1kg', price: 12.0, imageName: 'beef', isOwned: false },
      { name: 'Tortillas', quantity: '24 units', price: 5.0, imageName: 'tortilla', isOwned: false },
      { name: 'Avocado', quantity: '4 units', price: 8.0, imageName: 'avocado', isOwned: false }
    ],
    stages: [{ id: 's4', timeNeeded: 30, videoURL: '', textDescription: 'Prepare all toppings and brown the meat.' }],
    reviews: [],
    isLiked: false,
    image: require('@/assets/images/icon.png')
  },
  {
    id: '5',
    title: 'Mixed Mahshi',
    overview: 'A traditional Egyptian favorite: zucchini, eggplant, and peppers stuffed with a fragrant herb and rice mixture.',
    cost: 12.00,
    likes: 2900,
    origin: 'Egyptian',
    cookingTime: 90,
    dietStyle: 'vegan',
    ingredients: [
      { name: 'Rice', quantity: '500g', price: 2.0, imageName: 'rice', isOwned: false },
      { name: 'Tomato', quantity: '3 units', price: 2.5, imageName: 'tomato', isOwned: false },
      { name: 'Onions', quantity: '2 units', price: 1.0, imageName: 'onions', isOwned: false },
      { name: 'Parsley', quantity: '1 bunch', price: 1.5, imageName: 'parsley', isOwned: false }
    ],
    stages: [{ id: 's5', timeNeeded: 60, videoURL: '', textDescription: 'Hollow out veggies, stuff with rice mix, and simmer in broth.' }],
    reviews: [{ id: 'r5', user: 'MamaCook', rating: 5, comment: 'Just like my grandma used to make!', date: '2026-05-26' }],
    isLiked: false,
    image: require('@/assets/images/recipe-5.jpeg')
  },
  {
    id: '6',
    title: 'Bashamel Macaroni',
    overview: 'Egyptians quintessential comfort food: penne pasta layered with spiced ground beef and thick, creamy béchamel sauce.',
    cost: 16.50,
    likes: 4500,
    origin: 'Egyptian',
    cookingTime: 75,
    dietStyle: 'group',
    ingredients: [
      { name: 'Pasta', quantity: '500g', price: 3.0, imageName: 'pasta', isOwned: false },
      { name: 'Beef', quantity: '400g', price: 7.0, imageName: 'beef', isOwned: false },
      { name: 'Butter', quantity: '100g', price: 2.0, imageName: 'butter', isOwned: false },
      { name: 'Onions', quantity: '2 units', price: 1.0, imageName: 'onions', isOwned: false }
    ],
    stages: [{ id: 's6', timeNeeded: 45, videoURL: '', textDescription: 'Layer pasta and meat, cover with béchamel, and bake until golden.' }],
    reviews: [{ id: 'r6', user: 'PastaLover', rating: 5, comment: 'The creamy layers are perfect!', date: '2026-05-27' }],
    isLiked: false,
    image: require('@/assets/images/recipe-6.jpeg')
  }
];