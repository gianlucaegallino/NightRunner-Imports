const { Router } = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = Router();

brandRouter.get("/", brandController.getAll);
brandRouter.get("/new", brandController.getAddition);
brandRouter.get("/:id", brandController.getSpecific);
brandRouter.get("/:id/update", brandController.getModification);

brandRouter.post("/:id/update", brandController.postModification);
brandRouter.post("/:id/delete", brandController.postDeletion);
brandRouter.post("/new", brandController.postAddition);


module.exports = brandRouter;