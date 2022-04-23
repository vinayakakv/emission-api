import { datasource, initDb } from "./db";
import { promises as fs } from "fs";
import { Country, Emission } from "./models";

const seedData = async () => {
  await initDb();
  const countryRepository = datasource.getRepository(Country);
  const emissionsRepository = datasource.getRepository(Emission);
  const countries: { id: string; name: string }[] = JSON.parse(
    await fs.readFile("data/countries.json", "utf-8")
  );
  const emissions: {
    country_id: string;
    year: number;
    emissions: Record<string, string>;
  }[] = JSON.parse(await fs.readFile("data/emissions.json", "utf-8"));
  await countryRepository.insert(countries);
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
