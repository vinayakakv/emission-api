import { Country, Emission } from "@models";
import { DataSource, DataSourceOptions } from "typeorm";
import { createDatabase } from "typeorm-extension";

export const options: DataSourceOptions = {
  type: "sqlite",
  database: "data/data.sqlite",
  entities: ["src/models/*.ts"],
  logging: false,
  synchronize: true,
};

export const datasource = new DataSource(options);

export const initDb = async () => {
  await createDatabase({
    options: options,
    ifNotExist: true,
    synchronize: true,
  });
  await datasource.initialize();
};

export const countryRepository = datasource.getRepository(Country);
export const emissionsRepository = datasource.getRepository(Emission);
