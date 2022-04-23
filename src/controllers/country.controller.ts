import { countryRepository, emissionsRepository } from "../db";
import { Country, CountryView } from "../models/country";

export class CountryController {
  static async getCountries(): Promise<CountryView[]> {
    const countryViews: CountryView[] = await emissionsRepository
      .createQueryBuilder("emission")
      .leftJoinAndSelect(
        Country,
        "country",
        "country.id == emission.country.id"
      )
      .select("min(emission.year)", "startYear")
      .addSelect("max(emission.year)", "endYear")
      .addSelect("emission.country.id", "id")
      .addSelect("country.name", "name")
      .groupBy("emission.country.id")
      .getRawMany();
    return countryViews;
  }

  static async getCountry(countryId: string) {
    return countryRepository.findOneBy({ id: countryId });
  }
}
