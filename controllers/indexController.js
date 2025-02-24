const db = require("../db/queries");

async function getMain(req, res) {
  res.render("index", {
    title: "Nightrunner Imports",
  });
}

module.exports = {
  getMain,
};
