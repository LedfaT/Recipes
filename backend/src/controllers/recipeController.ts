import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { Filters } from "../types/mainTypes";

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
        res.json(resp.data);
        return;
      }
      if (filter.ingredient) {
        const resp = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter.ingredient}`
        );
        res.json(resp.data);
        return;
      }

      if (filter.country) {
        const resp = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter.country}`
        );
        res.json(resp.data);
        return;
      }

      const resp = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      res.json(resp.data);
    } catch (error) {
      next(error);
    }
  }
}

export default RecipeController;
