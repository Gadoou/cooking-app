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
    overview: 'Steak with Mashed Potatoes: A perfectly seared sirloin paired with creamy, buttery mashed potatoes.',
    cost: 22.00,
    likes: 2100,
    origin: 'Global',
    cookingTime: 45,
    dietStyle: 'protein',
    ingredients: [
      { name: 'Steak', quantity: '200g', price: 15.0, imageName: 'beef', isOwned: false },
      { name: 'Potato', quantity: '1 unit', price: 1.0, imageName: 'potato', isOwned: false },
      { name: 'Butter', quantity: '2 tbsp', price: 1.0, imageName: 'butter', isOwned: false },
      { name: 'Milk', quantity: '3 tbsp', price: 0.5, imageName: 'milk', isOwned: false },
      { name: 'Garlic', quantity: '1 clove', price: 0.2, imageName: 'garlic', isOwned: false },
      { name: 'Oil', quantity: '1 tbsp', price: 0.3, imageName: 'oil', isOwned: false },
      { name: 'Salt', quantity: '1 tsp', price: 0.1, imageName: 'salt', isOwned: false },
      { name: 'Black Pepper', quantity: '1 tsp', price: 0.1, imageName: 'pepper', isOwned: false }
    ],
    stages: [
      { id: 's3-1', timeNeeded: 25, videoURL: '', textDescription: 'Take the steak out of the fridge 20–30 minutes before cooking. Prep all other items.' },
      { id: 's3-2', timeNeeded: 2, videoURL: '', textDescription: 'Dry the steak very well. Season both sides with salt and black pepper.' },
      { id: 's3-3', timeNeeded: 3, videoURL: '', textDescription: 'Heat pan on high. Add oil and wait until hot and shiny.' },
      { id: 's3-4', timeNeeded: 3, videoURL: '', textDescription: 'Place steak in pan. Let sear for 2–3 minutes until it gets a brown crust.' },
      { id: 's3-5', timeNeeded: 3, videoURL: '', textDescription: 'Flip steak. Add butter, garlic, and herbs. Baste the steak for 2–3 minutes.' },
      { id: 's3-6', timeNeeded: 7, videoURL: '', textDescription: 'Remove from pan and let it rest for 5–7 minutes before cutting.' },
      { id: 's3-7', timeNeeded: 20, videoURL: '', textDescription: 'Boil potato until soft. Mash with butter, milk, salt, and pepper until creamy.' },
      { id: 's3-8', timeNeeded: 2, videoURL: '', textDescription: 'Slice steak or serve whole beside the mashed potatoes. Enjoy!' }
    ],
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
    overview: 'Makarona Bashamel: Egyptians quintessential comfort food: penne pasta layered with spiced ground beef and thick, creamy béchamel sauce.',
    cost: 16.50,
    likes: 4500,
    origin: 'Egyptian',
    cookingTime: 75,
    dietStyle: 'group',
    ingredients: [
      { name: 'Pasta', quantity: '1 cup', price: 1.0, imageName: 'pasta', isOwned: false },
      { name: 'Beef', quantity: '120g', price: 6.0, imageName: 'beef', isOwned: false },
      { name: 'Butter', quantity: '2 tbsp', price: 1.5, imageName: 'butter', isOwned: false },
      { name: 'Milk', quantity: '1 cup', price: 1.5, imageName: 'milk', isOwned: false },
      { name: 'Flour', quantity: '1 tbsp', price: 0.2, imageName: 'flour', isOwned: false },
      { name: 'Tomato Paste', quantity: '1 tbsp', price: 0.5, imageName: 'tomato', isOwned: false },
      { name: 'Onions', quantity: '0.5 unit', price: 0.3, imageName: 'onions', isOwned: false },
      { name: 'Mozzarella', quantity: '2 tbsp', price: 1.5, imageName: 'cheese', isOwned: false },
      { name: 'Spices', quantity: '1 tsp', price: 0.1, imageName: 'spices', isOwned: false }
    ],
    stages: [
      { id: 's6-1', timeNeeded: 10, videoURL: '', textDescription: 'Prepare the pasta, minced beef, onion, tomato paste, milk, flour, butter, and spices. Grease dish.' },
      { id: 's6-2', timeNeeded: 12, videoURL: '', textDescription: 'Boil the pasta in salted water until it is about 80% cooked. Drain and set aside.' },
      { id: 's6-3', timeNeeded: 10, videoURL: '', textDescription: 'Sauté onion and brown the beef. Add tomato paste, salt, pepper, and spices. Cook until flavorful.' },
      { id: 's6-4', timeNeeded: 10, videoURL: '', textDescription: 'Melt butter, whisk in flour, and slowly add milk until creamy and thick. Season with nutmeg.' },
      { id: 's6-5', timeNeeded: 2, videoURL: '', textDescription: 'Mix the cooked pasta with 2–3 tablespoons of béchamel so it stays creamy.' },
      { id: 's6-6', timeNeeded: 5, videoURL: '', textDescription: 'Layer half pasta, meat filling, then rest of pasta. Pour remaining béchamel over the top.' },
      { id: 's6-7', timeNeeded: 25, videoURL: '', textDescription: 'Bake at 200°C for 20–25 minutes until golden brown. Add cheese if desired.' },
      { id: 's6-8', timeNeeded: 5, videoURL: '', textDescription: 'Let it rest for 5 minutes before eating so the layers hold together. Serve hot.' }
    ],
    reviews: [{ id: 'r6', user: 'PastaLover', rating: 5, comment: 'The creamy layers are perfect!', date: '2026-05-27' }],
    isLiked: false,
    image: require('@/assets/images/recipe-6.jpeg')
  }
];