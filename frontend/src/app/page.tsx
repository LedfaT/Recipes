"use client";

import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import OwnCard from "@components/ui/ownCard";
import { useEffect, useMemo, useState } from "react";
import RecipeService from "@/services/recipeService";
import PaginationControl from "@components/ui/paginationControl";

const RecipeListPage = () => {
  const router = useRouter();
  const pageSize = 10;

  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [recipeLoading, setRecipeLoading] = useState(false);

  const handleRecipeClick = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  // Загружаем все рецепты один раз
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

  const pageCount = Math.ceil(recipes.length / pageSize);

  const pagedRecipes = useMemo(() => {
    return recipes.slice((page - 1) * pageSize, page * pageSize);
  }, [page, recipes]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      {recipeLoading ? (
        <CircularProgress />
      ) : (
        <>
          {pagedRecipes.length > 0 ? (
            <>
              <Grid container justifyContent="center" spacing={3}>
                {pagedRecipes.map((recipe) => (
                  <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
                    <OwnCard
                      title={recipe.strMeal}
                      imageUrl={recipe.strMealThumb}
                      onClick={() => handleRecipeClick(recipe.idMeal)}
                    />
                  </Grid>
                ))}
              </Grid>

              <PaginationControl
                page={page}
                count={pageCount}
                onChange={handlePageChange}
              />
            </>
          ) : (
            <Typography>No recipes found.</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default RecipeListPage;
