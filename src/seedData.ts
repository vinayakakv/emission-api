import { initDb, countryRepository, emissionsRepository } from "./db";
import { promises as fs } from "fs";

const seedData = async () => {
  await initDb();
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
