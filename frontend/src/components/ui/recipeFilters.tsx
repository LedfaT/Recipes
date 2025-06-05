import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";

export type FilterType = "ingredient" | "country" | "category" | "";

export interface RecipeFiltersProps {
  filterType: FilterType;
  filterValue: string;
  onFilterTypeChange: (type: FilterType) => void;
  onFilterValueChange: (value: string) => void;
}

const RecipeFilters = ({
  filterType,
  filterValue,
  onFilterTypeChange,
  onFilterValueChange,
}: RecipeFiltersProps) => {
  const handleFilterTypeChange = (event: SelectChangeEvent) => {
    const newFilterType = event.target.value as FilterType;
    onFilterTypeChange(newFilterType);
    onFilterValueChange("");
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterValueChange(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4, justifyContent: "center" }}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Filter by</InputLabel>
        <Select
          value={filterType}
          onChange={handleFilterTypeChange}
          label="Filter by"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="ingredient">Ingredient</MenuItem>
          <MenuItem value="country">Country</MenuItem>
          <MenuItem value="category">Category</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Value"
        value={filterValue}
        onChange={handleValueChange}
        disabled={!filterType}
        sx={{ minWidth: 200 }}
        placeholder="Enter filter value"
      />
    </Box>
  );
};

export default RecipeFilters;
