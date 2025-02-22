const { Router } = require("express");
const aspirationController = require("../controllers/aspirationController");
const aspirationRouter = Router();


aspirationRouter.get("/", aspirationController.getAll);
aspirationRouter.get("/:id", aspirationController.getSpecific);
aspirationRouter.post("/:id/update", aspirationController.postModification);
aspirationRouter.post("/:id/delete", aspirationController.postDeletion);
aspirationRouter.post("/new", aspirationController.postAddition);


module.exports = aspirationController;