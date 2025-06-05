"use client";

import { Pagination, Stack } from "@mui/material";
import { PaginationControlProps } from "@/types/recipeTypes";
const PaginationControl = ({
  page,
  count,
  onChange,
}: PaginationControlProps) => {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationControl;
