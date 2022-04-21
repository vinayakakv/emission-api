import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Emission } from "./emissions";

@Entity()
export class Country {
  @PrimaryColumn()
  id!: string;
  @OneToMany(type => Emission, emission => emission.country)
  emissions!: Emission[];
}

export type CountryView = {
  id: string;
  startYear: number;
  endYear: number;
};
