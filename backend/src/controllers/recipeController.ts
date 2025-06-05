import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { Filters, Recipe } from "../types/mainTypes";
import RecipeListOut from "../dtos/recipeListOut";

class RecipeController {
  static async getAllRecipes(req: Request, res: Response, next: NextFunction) {
    try {
      const filter: Filters = {
        ingredient: req.query.ingredient as string | undefined,
        country: req.query.country as string | undefined,
        category: req.query.category as string | undefined,
      };

      if (filter.category) {
        const resp = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter.category}`
        );
        const recipeListOut = RecipeController._recipeMapping(resp);
        res.json(recipeListOut);
        return;
      }
      if (filter.ingredient) {
        const resp = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter.ingredient}`
        );
        const recipeListOut = RecipeController._recipeMapping(resp);
        res.json(recipeListOut);
        return;
      }

      if (filter.country) {
        const resp = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter.country}`
        );
        const recipeListOut = RecipeController._recipeMapping(resp);
        res.json(recipeListOut);
        return;
      }

      const resp = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );

      const recipeListOut = RecipeController._recipeMapping(resp);
      res.json(recipeListOut);
    } catch (error) {
      next(error);
    }
  }

  static async getRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const resp = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const recipeListOut = this._recipeMapping(resp);
      res.json(recipeListOut);
    } catch (e) {}
  }

  static _recipeMapping(resp: AxiosResponse) {
    const rec = resp.data["meals"];
    return rec.map((recipe: Recipe) => new RecipeListOut(recipe));
  }
}

export default RecipeController;
