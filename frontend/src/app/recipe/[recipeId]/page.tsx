"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

interface RecipePageProps {
  params: {
    recipeId: string;
  };
}

const RecipePage = ({ params }: RecipePageProps) => {
  const { recipeId } = params;
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузить данные рецепта по id
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const json = await res.json();
        if (json.meals && json.meals.length > 0) {
          setRecipe(json.meals[0]);

          if (json.meals[0].strCategory) {
            const categoryRes = await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${json.meals[0].strCategory}`
            );
            const categoryJson = await categoryRes.json();
            setCategoryRecipes(categoryJson.meals || []);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // Собираем список ингредиентов
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
                  onClick={() =>
                    router.push(
                      `/recipes?ingredient=${encodeURIComponent(name)}`
                    )
                  }
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
                onClick={() =>
                  router.push(
                    `/recipes?category=${encodeURIComponent(r.strCategory)}`
                  )
                }
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
