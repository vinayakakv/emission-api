import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./country";

@Entity()
export class Emission {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  year!: number;
  @ManyToOne(type => Country, country => country.emissions)
  country!: Country;
  @Column()
  data!: string;
}
