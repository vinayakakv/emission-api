import { CountryController } from "@controllers";
import { Request, Response } from "express";

export const getCountries = async (req: Request, res: Response) => {
  const result = await CountryController.getCountries();
  res.json(result);
};
