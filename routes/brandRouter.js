const { Router } = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = Router();

brandRouter.get("/", brandController.getAll);
brandRouter.get("/:id", brandController.getSpecific);
brandRouter.post("/:id/update", brandController.postModification);
brandRouter.post("/:id/delete", brandController.postDeletion);
brandRouter.post("/new", brandController.postAddition);


module.exports = brandController;