require("dotenv").config();
const path = require("node:path");
const express = require("express");
const { body, validationResult } = require("express-validator");
const assetsPath = path.join(__dirname, "public");
const app = express();
const PORT = process.env.PORT || 3000;


//General config 
 
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


//Router Setup 

app.use("/", indexRouter);
app.use("/aspiration", aspirationRouter);
app.use("/brand", brandRouter);
app.use("/car", carRouter);
app.use("/color", colorRouter);
app.use("/drivetrain", drivetrainRouter);
app.use("/engine", engineRouter);
app.use("/transmission", transmissionRouter);
app.get("/*", (req, res) => {
  res.render("404", {});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
