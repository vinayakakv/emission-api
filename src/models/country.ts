import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Emission } from "./emissions";

@Entity()
export class Country {
  @PrimaryColumn()
  id!: string;
  @Column()
  name!: string;
  @OneToMany(type => Emission, emission => emission.country)
  emissions!: Emission[];
}

export type CountryView = {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
};
