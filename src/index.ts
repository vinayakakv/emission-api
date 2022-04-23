import { CountryController } from "./controllers/country.controller";
import { initDb } from "./db";
import express from "express";
import { EmissonController } from "./controllers/emission.controller";
import z from "zod";
import { dataset } from "./models/dataset";
const app = express();
const port = process.env.PORT || 3000;

initDb();

const requestSchema = z.object({
  id: z
    .string()
    .regex(/[A-Z]{3}/, "Invalid country code, must contain 3 characters"),
  startYear: z
    .string()
    .regex(/\d{4}/, "Invalid startYear")
    .transform(year => parseInt(year)),
  endYear: z
    .string()
    .regex(/\d{4}/, "Invalid endYear")
    .transform(year => parseInt(year)),
  data: z.array(dataset),
});

app.get("/api/country", async (req, res) => {
  const result = await CountryController.getCountries();
  res.json(result);
});

app.get("/api/country/:id", async (req, res) => {
  const inputs = {
    id: req.params.id,
    startYear: req.query.startYear,
    endYear: req.query.endYear,
    data: [req.query.data].flat(),
  };
  console.log(inputs);
  const parseResult = requestSchema.safeParse(inputs);
  if (!parseResult.success) {
    res.status(400).json(parseResult.error.errors);
    return;
  }
  const { id, startYear, endYear, data } = parseResult.data;
  const country = await CountryController.getCountry(id);
  if (!country) {
    res.status(403).json({ message: `Country ${id} not found` });
    return;
  }
  if (startYear > endYear) {
    res.status(400).json({
      message: `startYear ${startYear} must be less than or equal to endYear ${endYear}`,
    });
    return;
  }
  const result = await EmissonController.getEmissions({
    countryId: country.id,
    startYear,
    endYear,
    datasets: data,
  });
  res.json(result);
});

app.listen(port, () => {
  console.log(`Emissions API listening on port ${port}`);
});
