"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RecipeService from "@/services/recipeService";
import { Recipe } from "@/types/recipeTypes";

import {
  Box,
  Typography,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";

const RecipePage = () => {
  const { recipeId } = useParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async function () {
    setLoading(true);
    try {
      const [recipeData] = await RecipeService.getRecipe(Number(recipeId));
      console.log("Fetched recipe data:", recipeData);
      if (recipeData) {
        setRecipe(recipeData);

        if (recipeData.strCategory) {
          const categoryData = await RecipeService.getAllRecipes({
            category: recipeData.strCategory,
          });

          setCategoryRecipes(categoryData || []);
        }
      }
    } catch (e) {
      console.error("Error loading recipe:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const getIngredients = (recipe: Recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!recipe) {
    return <Typography>Recipe not found</Typography>;
  }

  const ingredients = getIngredients(recipe);

  return (
    <Box sx={{ display: "flex", gap: 4, p: 4 }}>
      <Box sx={{ flex: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              {recipe.strMeal}
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ cursor: "pointer", mb: 2 }}
              onClick={() => router.push(`/recipes?country=${recipe.strArea}`)}
            >
              {recipe.strArea}
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line" }} variant="body1" mb={3}>
              {recipe.strInstructions}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <List>
              {ingredients.map(({ name, measure }, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => router.push(`/?ingredient=${name}`)}
                >
                  <ListItemText primary={`${name} ${measure}`} />
                </ListItemButton>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Paper sx={{ p: 2, maxHeight: "80vh", overflowY: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Other recipes in {recipe.strCategory}
          </Typography>
          <Divider />

          <List>
            {categoryRecipes.slice(0, 4).map((r) => (
              <ListItemButton
                key={r.idMeal}
                onClick={() => router.push(`/?category=${recipe.strCategory}`)}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <img
                  src={r.strMealThumb}
                  alt={r.strMeal}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 4,
                    objectFit: "cover",
                  }}
                />
                <ListItemText primary={r.strMeal} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default RecipePage;
