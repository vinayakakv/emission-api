import { CountryController } from "controllers/country.controller";
import { EmissonController } from "controllers/emission.controller";
import { Request, Response } from "express";
import z from "zod";
import { dataset } from "../models/dataset";

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

export const getEmissions = async (req: Request, res: Response) => {
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
};
