import type { Dataset, EmissionView } from "../../../src/models";

type Args = {
  datasets: Dataset[];
  startYear: number;
  endYear: number;
  countryId: string;
};

export const getCountryEmissions = async ({
  datasets,
  startYear,
  endYear,
  countryId,
}: Args) => {
  const url = new URL(`/api/country/${countryId}`, window.location.href);
  datasets.forEach(dataset => url.searchParams.append("data", dataset));
  url.searchParams.append("startYear", `${startYear}`);
  url.searchParams.append("endYear", `${endYear}`);
  const { emissions }: EmissionView = await fetch(url.toString()).then(res =>
    res.json()
  );
  return emissions;
};
