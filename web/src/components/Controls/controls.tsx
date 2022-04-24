import { Dataset } from "../../../../src/models";
import { range } from "../../utils";
import "./styles.css";

const datasets = [
  {
    value: "CO2",
    name: "Carbon Dioxide",
  },
  {
    value: "HFCs",
    name: "Hydrofluorocarbon",
  },
  {
    value: "CH4",
    name: "Methane",
  },
  {
    value: "NF3",
    name: "Nitrogen trifluoride",
  },
  {
    value: "N2O",
    name: "Nitrous oxide",
  },
  {
    value: "PFCs",
    name: "Perfluorochemicals",
  },
  {
    value: "SF6",
    name: "Sulphur Hexafluoride",
  },
];

type Props = {
  year: number;
  dataset: Dataset;
  setYear: (value: number) => void;
  setDataset: (dataset: Dataset) => void;
};

export function Controls({ year, dataset, setDataset, setYear }: Props) {
  return (
    <div className="controls">
      <div className="control">
        <label>Year</label>
        <select value={year} onChange={e => setYear(parseInt(e.target.value))}>
          {range(1990, 2015).map(year => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="control">
        <label>Dataset</label>
        <select
          value={dataset}
          onChange={e => setDataset(e.target.value as Dataset)}
        >
          {datasets.map(dataset => (
            <option value={dataset.value} key={dataset.value}>
              {dataset.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
