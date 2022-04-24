import Dialog from "@reach/dialog";

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

export function CountryDetails({ isOpen, onDismiss, data }: Props) {
  const { countryId, countryName, dataset, emission, year } = data;
  return (
    <Dialog
      as="div"
      aria-label="Country Details"
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
      <button onClick={onDismiss}>Okay</button>
    </Dialog>
  );
}
