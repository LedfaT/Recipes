"use client";
import { Container, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import OwnCard from "@components/ownCard";
import { useEffect, useState } from "react";
import RecipeService from "@/services/recipeService";
const recipes = [
  {
    id: "52772",
    title: "Teriyaki Chicken Casserole",
    image: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  },
  {
    id: "52773",
    title: "Spaghetti Carbonara",
    image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
  },
];

const RecipeListPage = () => {
  const router = useRouter();
  const handleRecipeClick = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  const [recipeLoading, setRecipeLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<any[]>([]);

  const fetchRecipes = async () => {
    setRecipeLoading(true);
    try {
      const data = await RecipeService.getAllRecipes({});
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    } finally {
      setRecipeLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        All Recipes
      </Typography>

      {recipes.length > 0 && (
        <Grid container justifyContent="center" spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={4} key={recipe.idMeal}>
              <OwnCard
                title={recipe.strMeal}
                imageUrl={recipe.strMealThumb}
                onClick={() => handleRecipeClick(recipe.idMeal)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RecipeListPage;
