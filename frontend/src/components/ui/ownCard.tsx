"use client";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";

import { listRecipeType } from "@/types/recipeTypes";

export default function OwnCard({ title, imageUrl, onClick }: listRecipeType) {
  return (
    <Card sx={{ maxWidth: 300, width: "100%" }}>
      <CardActionArea>
        <CardMedia
          onClick={onClick}
          component="img"
          height="180"
          image={imageUrl}
          alt={title}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
