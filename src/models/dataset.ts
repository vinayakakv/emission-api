import z from "zod";

export const dataset = z.enum([
  "CO2",
  "HFCs",
  "CH4",
  "NF3",
  "N2O",
  "PFCs",
  "SF6",
]);

export type Dataset = z.infer<typeof dataset>;
