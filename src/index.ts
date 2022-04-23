import { initDb } from "@db";
import express from "express";
import { getCountries, getEmissions } from "@handlers";
const app = express();
const port = process.env.PORT || 3000;

initDb();

app.get("/api/country", getCountries);

app.get("/api/country/:id", getEmissions);

app.listen(port, () => {
  console.log(`Emissions API listening on port ${port}`);
});
