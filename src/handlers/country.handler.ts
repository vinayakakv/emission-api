import { CountryController } from "../controllers/country.controller";
import { Request, Response } from "express";

export const getCountries = async (req: Request, res: Response) => {
  const result = await CountryController.getCountries();
  res.json(result);
};
