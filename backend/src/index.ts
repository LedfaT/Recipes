import express, { Router } from "express";
import cors from "cors";
import "dotenv/config";
import recipeRouter from "./routes/recipeRoutes";

const app = express();
const port = process.env.PORT || 8080;
const router = Router();

app.use(express.json());
app.use(cors());

app.use("/api", recipeRouter);

const start = async function () {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

start();
