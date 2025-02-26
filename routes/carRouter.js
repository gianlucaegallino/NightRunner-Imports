const { Router } = require("express");
const carController = require("../controllers/carController");
const carRouter = Router();


carRouter.get("/", carController.getAll);
carRouter.get("/:id", carController.getSpecific);
carRouter.get("/:id/update", carController.getModification);
carRouter.post("/:id/update", carController.postModification);
carRouter.post("/:id/delete", carController.postDeletion);
carRouter.post("/new", carController.postAddition);


module.exports = carRouter;