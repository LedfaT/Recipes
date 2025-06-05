import { Recipe } from "../types/mainTypes";

class RecipeListOut {
  idMeal: number;
  strMeal: string;
  strMealThumb: string;

  constructor(meal: Recipe) {
    this.idMeal = Number(meal.idMeal);
    this.strMeal = meal.strMeal;
    this.strMealThumb = meal.strMealThumb;
  }
}

export default RecipeListOut;
