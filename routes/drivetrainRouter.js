const { Router } = require("express");
const drivetrainController = require("../controllers/drivetrainController");
const drivetrainRouter = Router();


drivetrainRouter.get("/", drivetrainController.getAll);
drivetrainRouter.get("/:id", drivetrainController.getSpecific);
drivetrainRouter.post("/:id/update", drivetrainController.postModification);
drivetrainRouter.post("/:id/delete", drivetrainController.postDeletion);
drivetrainRouter.post("/new", drivetrainController.postAddition);


module.exports = drivetrainController;