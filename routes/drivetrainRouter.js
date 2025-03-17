const { Router } = require("express");
const drivetrainController = require("../controllers/drivetrainController");
const drivetrainRouter = Router();


drivetrainRouter.get("/", drivetrainController.getAll);
drivetrainRouter.get("/new", drivetrainController.getAddition)
drivetrainRouter.get("/:id", drivetrainController.getSpecific);
drivetrainRouter.get("/:id/update", drivetrainController.getModification);

drivetrainRouter.post("/:id/update", drivetrainController.postModification);
drivetrainRouter.post("/:id/delete", drivetrainController.postDeletion);
drivetrainRouter.post("/new", drivetrainController.postAddition);


module.exports = drivetrainRouter;