import { emissionsRepository } from "../db";
import { EmissionView } from "../models/emissions";

export class EmissonController {
  static async getEmissions(args: {
    countryId: string;
    startYear: number;
    endYear: number;
  }): Promise<EmissionView> {
    const { countryId, startYear, endYear } = args;
    const emissions = await emissionsRepository
      .createQueryBuilder("emissions")
      .where("emissions.country.id == :countryId", { countryId })
      .andWhere("emissions.year >= :startYear", { startYear })
      .andWhere("emissions.year < :endYear", { endYear })
      .getMany();
    const emissionView: EmissionView = {
      countryId,
      emissions: emissions.map(({ year, data }) => ({
        year,
        data: JSON.parse(data),
      })),
    };
    return emissionView;
  }
}
