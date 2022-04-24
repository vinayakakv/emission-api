import Dialog from "@reach/dialog";
import { VictoryChart, VictoryAxis, VictoryLine } from "victory";
import "./styles.css";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  data: {
    countryId: string;
    countryName: string;
    dataset: string;
    emission?: number;
    year: number;
  };
};

const emissionHistory = [
  { year: 1998, data: { CO2: 1 } },
  { year: 1999, data: { CO2: 2 } },
  { year: 2000, data: { CO2: 1 } },
  { year: 2001, data: { CO2: 2.35 } },
];

export function CountryDetails({ isOpen, onDismiss, data }: Props) {
  const { countryId, countryName, dataset, emission, year } = data;
  return (
    <Dialog
      as="div"
      aria-label="Country Details"
      className="dialog"
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <p>
        <b>ISO A3:</b> {countryId}
      </p>
      <p>
        <b>Name</b> {countryName}
      </p>
      <p>
        <b>
          {dataset} Emissions on year {year}:
        </b>{" "}
        {emission !== undefined ? `${emission} kiloTonn` : "Data not available"}
      </p>
      <VictoryChart domainPadding={30}>
        <VictoryAxis
          tickValues={emissionHistory.map(emission => emission.year)}
        />
        <VictoryAxis dependentAxis tickFormat={x => `${x}`} />
        <VictoryLine
          height={200}
          data={emissionHistory}
          x="year"
          y={data => data.data.CO2}
        />
      </VictoryChart>

      <button onClick={onDismiss}>Okay</button>
    </Dialog>
  );
}
