const { Router } = require("express");
const transmissionController = require("../controllers/transmissionController");
const transmissionRouter = Router();

transmissionRouter.get("/", transmissionController.getAll);
transmissionRouter.get("/:id", transmissionController.getSpecific);
transmissionRouter.post("/:id/update", transmissionController.postModification);
transmissionRouter.post("/:id/delete", transmissionController.postDeletion);
transmissionRouter.post("/new", transmissionController.postAddition);


module.exports = transmissionRouter;