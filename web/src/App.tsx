import type { CountryView, EmissionView, Dataset } from "../../src/models";
import "./App.css";
import Map, { Layer, Source } from "react-map-gl";
import { useEffect, useState } from "react";
import { constants } from "./constants";
import { getCountryEmissions } from "./helpers/getCountryEmissons";
import { range } from "./utils";

type CountryGeoJSON = {
  type: "FeatureCollection";
  features: {
    type: "FeatureCollection";
    properties: {
      ADMIN: string;
      ISO_A3: string;
      emisson?: number;
      emissionScale?: number;
    };
  }[];
};

function App() {
  const [countries, setCounties] = useState<CountryView[]>([]);
  const [geoJson, setGeoJson] = useState<CountryGeoJSON | null>(null);
  const [geoJsonWithEmissons, setGeoJsonWithEmissons] =
    useState<CountryGeoJSON | null>(null);
  const [dataset, setDataset] = useState<Dataset>("CO2");
  const [year, setYear] = useState(1990);
  const [country, setCountry] = useState("");
  const [emissions, setEmissions] = useState(0);
  useEffect(() => {
    fetch("/api/country").then(async res => setCounties(await res.json()));
  }, []);
  useEffect(() => {
    fetch(constants.geoJsonUrl).then(async res => setGeoJson(await res.json()));
  }, []);
  useEffect(() => {
    if (!geoJson) return;
    const countryIds = countries.map(country => country.id);
    const geoJsonWithEmissions: CountryGeoJSON = JSON.parse(
      JSON.stringify(geoJson)
    );
    Promise.all(
      geoJsonWithEmissions?.features.map(async ({ properties }) => {
        const countryId = properties.ISO_A3;
        if (!countryIds.includes(countryId)) {
          return;
        }
        const emissions = await getCountryEmissions({
          datasets: [dataset],
          countryId,
          startYear: year,
          endYear: year,
        });
        const emission = emissions[0].data[dataset];
        properties.emisson = emission;
        properties.emissionScale = Math.round((emission / 6122746.61) * 10);
      }) || []
    ).then(() => setGeoJsonWithEmissons(geoJsonWithEmissions));
  }, [countries, geoJson, year, dataset]);
  const clickHandler = (e: any) => {
    const { properties } = e.features[0];
    console.log(properties);
    setCountry(properties.ADMIN + ", " + properties.ISO_A3);
    setEmissions(properties.emisson || 0);
  };
  return (
    <div className="App">
      <h1>Emissions </h1>
      <div className="controls">
        <div className="control">
          <label>Year</label>
          <select
            value={year}
            onChange={e => setYear(parseInt(e.target.value))}
          >
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
            <option value="CO2">Carbon Dioxide</option>
            <option value="HFCs">Hydrofluorocarbon</option>
            <option value="CH4">Methane</option>
            <option value="NF3">Nitrogen trifluoride</option>
            <option value="N2O">Nitrous oxide</option>
            <option value="PFCs">Perfluorochemicals</option>
            <option value="SF6">Sulphur Hexafluoride</option>
          </select>
        </div>
      </div>
      <Map
        mapboxAccessToken={constants.mapboxToken}
        initialViewState={{
          longitude: 100,
          latitude: 40,
          zoom: 1,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/vinayakakv/cl2734xmz005914nvtp4byajn"
        interactiveLayerIds={["countries"]}
        onClick={clickHandler}
      >
        <Source type="geojson" data={geoJsonWithEmissons as any}>
          <Layer
            type="fill"
            id="countries"
            paint={{
              "fill-opacity": 0.3,
              "fill-color": {
                property: "emissionScale",
                stops: [
                  [0, "#3288bd"],
                  [1, "#66c2a5"],
                  [2, "#abdda4"],
                  [3, "#e6f598"],
                  [4, "#ffffbf"],
                  [5, "#fee08b"],
                  [6, "#fdae61"],
                  [7, "#f46d43"],
                  [8, "#d53e4f"],
                  [9, "#ff001d"],
                ],
              },
            }}
          />
          <Layer type="line" id="borders" paint={{ "line-color": "#FAFAFA" }} />
        </Source>
      </Map>
    </div>
  );
}

export default App;
