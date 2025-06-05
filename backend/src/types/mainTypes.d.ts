export type Filters = {
  ingredient: string | undefined;
  country: string | undefined;
  category: string | undefined;
};

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  strCategory: string;
  [key: string]: any;
};
