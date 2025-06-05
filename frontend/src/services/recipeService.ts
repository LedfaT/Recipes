import $api from "@/lib/axios";
import { RecipeQueryParams } from "@/types/recipeTypes";

class RecipeService {
  static async getAllRecipes(params: RecipeQueryParams) {
    try {
      const response = await $api.get("/recipe/list", {
        params: params,
      });

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async getRecipe(id: number) {
    try {
      const response = await $api.get(`/recipe/${id}`);

      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

export default RecipeService;
