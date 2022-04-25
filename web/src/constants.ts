export const constants = {
  mapboxToken: import.meta.env["VITE_MAPBOX_TOKEN"] || "",
  geoJsonUrl: import.meta.env["VITE_GEOJSON_URL"] || "",
  emissionsColorMap: [
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
};
