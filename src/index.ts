import { initDb } from "@db";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { getCountries, getEmissions } from "@handlers";
const app = express();
const port = process.env.PORT || 3000;

initDb();

app.use("/static", express.static("static"));

app.use(express.static("web/dist"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: { url: "/static/openapi.yaml" },
  })
);

app.get("/api/country", getCountries);

app.get("/api/country/:id", getEmissions);

app.listen(port, () => {
  console.log(`Emissions API listening on port ${port}`);
});
