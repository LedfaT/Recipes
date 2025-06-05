import { Router } from "express";
import RecipeController from "../controllers/recipeController";

const recipeRouter = Router();

recipeRouter.get("/recipe/list", RecipeController.getAllRecipes);
recipeRouter.get("/recipe/:id", RecipeController.getRecipe);

export default recipeRouter;
