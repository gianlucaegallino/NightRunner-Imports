const { Router } = require("express");
const aspirationController = require("../controllers/aspirationController");
const aspirationRouter = Router();


aspirationRouter.get("/", aspirationController.getAll);
aspirationRouter.get("/new", aspirationController.getAddition);
aspirationRouter.get("/:id", aspirationController.getSpecific);
aspirationRouter.get("/:id/update", aspirationController.getModification);

aspirationRouter.post("/new", aspirationController.postAddition);
aspirationRouter.post("/:id/update", aspirationController.postModification);
aspirationRouter.post("/:id/delete", aspirationController.postDeletion);



module.exports = aspirationRouter;
