export interface Ingredient {
  name: string;
  quantity: string;
  price: number;
  imageName: string;
  isOwned: boolean;
}

export interface CookingStage {
  id: string;
  timeNeeded: number;
  videoURL: string;
  textDescription: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Recipe {
  id: string;
  title: string;
  overview: string;
  cost: number;
  likes: number;
  origin: string;
  cookingTime: number;
  dietStyle: 'lowCal' | 'protein' | 'vegan' | 'group';
  ingredients: Ingredient[];
  stages: CookingStage[];
  reviews: Review[];
  isLiked: boolean;
}
