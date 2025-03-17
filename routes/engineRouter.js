const { Router } = require("express");
const engineController = require("../controllers/engineController");
const engineRouter = Router();

engineRouter.get("/", engineController.getAll);
engineRouter.get("/:id", engineController.getSpecific);
engineRouter.get("/:id/update", engineController.getModification);
engineRouter.get("/new", engineController.getAddition);

engineRouter.post("/:id/update", engineController.postModification);
engineRouter.post("/:id/delete", engineController.postDeletion);
engineRouter.post("/new", engineController.postAddition);


module.exports = engineRouter;