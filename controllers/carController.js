const db = require("../db/queries");

async function getAll(req, res) {
  try {
    const messages = await db.getAllCarsJoined();
    if (!messages) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.render("itemListPage", {
      title: "All Cars",
      messages: messages.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getSpecific(req, res) {
  let id = req.params.id;

  try {
    const messages = await db.getCar(id);

    if (!messages) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.render("itemListPage", {
      title: "Car",
      messages: messages.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function postModification(req, res) {
  let id = req.body.id;

  // builds the cardata object
  let carData = {
    modelname: req.body.modelname,
    brandid: req.body.brandid,
    engineid: req.body.engineid,
    enginesize: req.body.enginesize,
    horsepower: req.body.horsepower,
    torque: req.body.torque,
    weightkg: req.body.weightkg,
    year: req.body.year,
    colorid: req.body.colorid,
    mileage: req.body.mileage,
    drivetrainid: req.body.drivetrainid,
    transmissionid: req.body.transmissionid,
    aspirationid: req.body.aspirationid,
  };

  try {
    const updated = await db.updateCar(id, carData);

    if (!updated) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car updated successfully", target: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postAddition(req, res) {
  // builds the cardata object
  let carData = {
    modelname: req.body.modelname,
    brandid: req.body.brandid,
    engineid: req.body.engineid,
    enginesize: req.body.enginesize,
    horsepower: req.body.horsepower,
    torque: req.body.torque,
    weightkg: req.body.weightkg,
    year: req.body.year,
    colorid: req.body.colorid,
    mileage: req.body.mileage,
    drivetrainid: req.body.drivetrainid,
    transmissionid: req.body.transmissionid,
    aspirationid: req.body.aspirationid,
  };

  try {
    const inserted = await db.insertCar(carData);

    if (!inserted) {
      return res.status(404).json({ message: "Insert Car failed" });
    }

    res.json({ message: "Car inserted successfully", target: inserted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postDeletion(req, res) {
  let id = req.body.id;

  try {
    const deleted = await db.deleteCar(id);

    if (!deleted) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully", target: deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

module.exports = {
  getAll,
  getSpecific,
  postAddition,
  postDeletion,
  postModification,
};
