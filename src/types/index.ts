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
  isLiked: boolean;
}
