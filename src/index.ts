import { CountryController } from "./controllers/country.controller";
import { initDb } from "./db";
import express from "express";
import { EmissonController } from "./controllers/emission.controller";
const app = express();
const port = 3000;

initDb();

app.get("/api/country", async (req, res) => {
  const result = await CountryController.getCountries();
  res.json(result);
});

app.get("/api/country/:id", async (req, res) => {
  const result = await EmissonController.getEmissions({
    countryId: "CHE",
    startYear: 1990,
    endYear: 2018,
  });
  res.json(result);
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
