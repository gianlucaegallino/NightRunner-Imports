require("dotenv").config();
const path = require("node:path");
const express = require("express");
const { body, validationResult } = require("express-validator");
const assetsPath = path.join(__dirname, "public");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
