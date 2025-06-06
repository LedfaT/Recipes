export type RecipeQueryParams = {
  ingredient?: string;
  country?: string;
  category?: string;
};

export type listRecipeType = {
  title: string;
  imageUrl: string;
  onClick: () => void;
};

export type PaginationControlProps = {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
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
