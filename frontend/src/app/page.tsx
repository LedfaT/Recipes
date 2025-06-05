"use client";

import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import OwnCard from "@components/ui/ownCard";
import RecipeFilters, { FilterType } from "@components/ui/recipeFilters";
import { useEffect, useMemo, useState } from "react";
import RecipeService from "@/services/recipeService";
import PaginationControl from "@components/ui/paginationControl";

const pageSize = 10;

const RecipeListPage = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [recipeLoading, setRecipeLoading] = useState(false);

  const [filterType, setFilterType] = useState<FilterType>("");
  const [filterValue, setFilterValue] = useState("");

  const handleRecipeClick = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  const fetchRecipes = async (filters = {}) => {
    setRecipeLoading(true);
    try {
      const data = await RecipeService.getAllRecipes(filters);
      setRecipes(data || []);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
      setRecipes([]);
    } finally {
      setRecipeLoading(false);
    }
  };

  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
    setFilterValue("");
    setPage(1);
  };

  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
    setPage(1);

    if (filterType) {
      fetchRecipes({ [filterType]: value });
    }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchRecipes({});
  }, []);

  const pageCount = Math.ceil(recipes.length / pageSize);

  const pagedRecipes = useMemo(() => {
    return recipes.slice((page - 1) * pageSize, page * pageSize);
  }, [page, recipes]);

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

      <RecipeFilters
        filterType={filterType}
        filterValue={filterValue}
        onFilterTypeChange={handleFilterTypeChange}
        onFilterValueChange={handleFilterValueChange}
      />

      {recipeLoading ? (
        <CircularProgress />
      ) : pagedRecipes.length > 0 ? (
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
    </Container>
  );
};

export default RecipeListPage;
