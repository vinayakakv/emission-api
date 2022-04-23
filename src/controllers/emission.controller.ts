import { Dataset, EmissionView } from "@models";
import { pickKeys } from "@utils";
import { emissionsRepository } from "@db";

export class EmissonController {
  static async getEmissions(args: {
    countryId: string;
    startYear: number;
    endYear: number;
    datasets: Dataset[];
  }): Promise<EmissionView> {
    const { countryId, startYear, endYear, datasets } = args;
    const emissions = await emissionsRepository
      .createQueryBuilder("emissions")
      .where("emissions.country.id == :countryId", { countryId })
      .andWhere("emissions.year >= :startYear", { startYear })
      .andWhere("emissions.year <= :endYear", { endYear })
      .getMany();
    const emissionView: EmissionView = {
      countryId,
      emissions: emissions.map(({ year, data }) => ({
        year,
        data: pickKeys(JSON.parse(data), datasets),
      })),
    };
    return emissionView;
  }
}
