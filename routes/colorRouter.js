const { Router } = require("express");
const colorController = require("../controllers/colorController");
const colorRouter = Router();

colorRouter.get("/", colorController.getAll);
colorRouter.get("/:id", colorController.getSpecific);
colorRouter.post("/:id/update", colorController.postModification);
colorRouter.post("/:id/delete", colorController.postDeletion);
colorRouter.post("/new", colorController.postAddition);


module.exports = colorController;