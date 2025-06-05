import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;

const start = async function () {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

start();
