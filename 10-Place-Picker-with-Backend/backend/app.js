/* eslint-disable consistent-return */
import fs from "node:fs/promises";

// import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(express.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/places", async (req, res) => {
  const fileContent = await fs.readFile("./data/places.json");

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json");

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put("/user-places", async (req, res) => {
  const { places } = req.body;
  console.log(places);

  await fs.writeFile("./data/user-places.json", JSON.stringify(places));

  res.status(200).json({ message: "User places updated!" });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000, "192.168.1.3", () => {
  // Here, 192.168.1.3 is your current IP address for other devices, like your phone or iPad to find on the same network.
  console.log("Server's up! Running on port 3000");
});
