import "./App.css";
import Map, { Layer, Source } from "react-map-gl";
import { useEffect, useMemo, useState } from "react";
import { constants } from "./constants";

function App() {
  const [geoJson, setGeoJson] = useState({});
  const [country, setCountry] = useState("");
  const [emissions, setEmissions] = useState(0);
  useEffect(() => {
    (async () => {
      const { type, features } = await fetch(constants.geoJsonUrl).then(res =>
        res.json()
      );
      const updatedFeatures = {
        type,
        features: features.map(({ properties, ...rest }: any) => ({
          ...rest,
          properties: { ...properties, emissions: Math.random() * 10 },
        })),
      };
      setGeoJson(updatedFeatures);
    })();
  }, []);
  const clickHandler = (e: any) => {
    const { properties } = e.features[0];
    console.log(properties);
    setCountry(properties.ADMIN + ", " + properties.ISO_A3);
    setEmissions(properties.emissions);
  };
  return (
    <div className="App">
      <h1>Mapbox Test</h1>
      <h2>
        Clicked Country: {country} , Emissions: {emissions.toFixed(2)}
      </h2>
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
        <Source type="geojson" data={geoJson as any}>
          <Layer
            type="fill"
            id="countries"
            paint={{
              "fill-opacity": 0.3,
              "fill-color": {
                property: "emissions",
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
