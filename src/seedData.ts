import { datasource, initDb } from "./db";
import { promises as fs } from "fs";
import { Country } from "./models/country";
import { Emission } from "./models/emissions";

const seedData = async () => {
  await initDb();
  const countryRepository = datasource.getRepository(Country);
  const emissionsRepository = datasource.getRepository(Emission);
  const countries: { country_id: string }[] = JSON.parse(
    await fs.readFile("data/countries.json", "utf-8")
  );
  const emissions: {
    country_id: string;
    year: number;
    emissions: Record<string, string>;
  }[] = JSON.parse(await fs.readFile("data/emissions.json", "utf-8"));
  await countryRepository.insert(
    countries.map(({ country_id }) => ({ id: country_id }))
  );
  await emissionsRepository.insert(
    await Promise.all(
      emissions.map(async ({ country_id, year, emissions }) => {
        const country = (await countryRepository.findOneBy({
          id: country_id,
        })) || { id: "" };
        return {
          country,
          year,
          data: JSON.stringify(emissions),
        };
      })
    )
  );
};

seedData();
