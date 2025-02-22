const { Router } = require("express");
const indexController = require("../controllers/indexcontroller");
const indexRouter = Router();

indexRouter.get("/", indexController.getMain);


module.exports = indexController;