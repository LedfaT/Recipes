"use client";
import { Container, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import OwnCard from "@components/ownCard";
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

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Recipes
      </Typography>

      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <OwnCard
            key={recipe.id}
            title={recipe.title}
            imageUrl={recipe.image}
            onClick={() => handleRecipeClick(recipe.id)}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeListPage;
