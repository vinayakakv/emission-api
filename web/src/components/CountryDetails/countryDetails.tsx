import Dialog from "@reach/dialog";
import { VictoryChart, VictoryAxis, VictoryLine } from "victory";
import { EmissionRecord } from "../../helpers/getCountryEmissons";
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
    historicalData: EmissionRecord[];
  };
};

export function CountryDetails({ isOpen, onDismiss, data }: Props) {
  const { countryId, countryName, dataset, emission, year, historicalData } =
    data;
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
      {historicalData.length > 0 && (
        <VictoryChart domainPadding={30}>
          <VictoryAxis
            tickFormat={x => `${x}`}
            label="Year"
            style={{ axisLabel: { padding: 30 } }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x: number) => `${x}`}
            label="Emissions (kiloTonn)"
            style={{ axisLabel: { padding: 30 } }}
          />
          <VictoryLine
            height={200}
            data={historicalData}
            x="year"
            y={({ data }) => data[dataset]}
          />
        </VictoryChart>
      )}

      <button onClick={onDismiss}>Okay</button>
    </Dialog>
  );
}
