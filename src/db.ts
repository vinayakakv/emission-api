import { Country } from "./models/country";
import { Emission } from "./models/emissions";
import { DataSource } from "typeorm";
import { createDatabase } from "typeorm-extension";

export const options = {
  type: "sqlite",
  database: "data/data.sqlite",
  entities: ["src/models/*.ts"],
  logging: true,
  synchronize: true,
};

export const datasource = new DataSource(options as any);

export const initDb = async () => {
  await createDatabase({
    options: options as any,
    ifNotExist: true,
    synchronize: true,
  });
  await datasource.initialize();
};

export const countryRepository = datasource.getRepository(Country);
export const emissionsRepository = datasource.getRepository(Emission);
