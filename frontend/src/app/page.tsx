"use client";

import { Container, Typography, Grid, CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import OwnCard from "@components/ui/ownCard";
import RecipeFilters, { FilterType } from "@components/ui/recipeFilters";
import { useEffect, useMemo, useState } from "react";
import RecipeService from "@/services/recipeService";
import PaginationControl from "@components/ui/paginationControl";

const pageSize = 10;
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const RecipeListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [recipeLoading, setRecipeLoading] = useState(false);

  const [filterType, setFilterType] = useState<FilterType>("");
  const [filterValue, setFilterValue] = useState("");

  const fetchRecipes = async (filters = {}) => {
    setRecipeLoading(true);
    try {
      const data = await RecipeService.getAllRecipes(filters);
      setRecipes(data || []);
      console.log("Fetched recipes:", data);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
      setRecipes([]);
    } finally {
      setRecipeLoading(false);
    }
  };

  useEffect(() => {
    const ingredient = searchParams.get("ingredient");
    const category = searchParams.get("category");
    const country = searchParams.get("country");

    if (ingredient) {
      setFilterType("ingredient");
      setFilterValue(ingredient);
      fetchRecipes({ ingredient });
      return;
    }

    if (category) {
      setFilterType("category");
      setFilterValue(category);
      fetchRecipes({ category });
      return;
    }

    if (country) {
      setFilterType("country");
      setFilterValue(country);
      fetchRecipes({ country });
      return;
    }

    setFilterType("");
    setFilterValue("");
    fetchRecipes();
  }, [searchParams]);

  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
    setFilterValue("");
  };

  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
    setPage(1);

    if (!filterType) return;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      if (value.trim() === "") {
        router.push(`/?${filterType}=`);
      } else {
        const query = `?${filterType}=${encodeURIComponent(value)}`;
        router.push(`/${query}`);
      }
    }, 1000);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                  onClick={() => router.push(`/recipe/${recipe.idMeal}`)}
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
