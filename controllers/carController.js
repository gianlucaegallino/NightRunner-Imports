const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const alphaErr = "must be non numeric.";
const numErr = "must be an integer.";
const lengthErr1 = "must be between 1 and 128 characters.";
const lengthErr2 = "must be between 1 and 12 characters.";
const lengthErr3 = "must have at least 1 number.";
const validDateErr = "must be a valid date.";

//its only necessary to verify the non foreign fields.

const validateCar = [
  body("modelname")
    .trim()
    .not()
    .isNumeric()
    .withMessage(`Model name ${alphaErr}`)
    .isLength({ min: 1, max: 128 })
    .withMessage(`Model name ${lengthErr1}`),
  body("enginesize")
    .trim()
    .isNumeric()
    .withMessage(`Engine size ${alphaErr}`)
    .isLength({ min: 1, max: 12 })
    .withMessage(`Engine size ${lengthErr2}`),
  body("horsepower")
    .trim()
    .isNumeric()
    .withMessage(`Horsepower ${numErr}`)
    .isLength({ min: 1 })
    .withMessage(`Horsepower ${lengthErr3}`),
  body("torque")
    .trim()
    .isNumeric()
    .withMessage(`Torque ${numErr}`)
    .isLength({ min: 1 })
    .withMessage(`Torque ${lengthErr3}`),
  body("weightkg")
    .trim()
    .isNumeric()
    .withMessage(`Weight ${numErr}`)
    .isLength({ min: 1 })
    .withMessage(`Weight ${lengthErr3}`),
  body("year")
    .trim()
    .isNumeric()
    .withMessage(`Year ${numErr}`)
    .isLength({ min: 3, max: 4 })
    .withMessage(`Year ${validDateErr}`),
  body("mileage")
    .trim()
    .isNumeric()
    .withMessage(`Mileage ${numErr}`)
    .isLength({ min: 1 })
    .withMessage(`Mileage ${lengthErr3}`),
];

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

    res.render("itemDetailPage", {
      title: "Car",
      messages: messages.rows,
      pathname: "car",
      fieldId: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getModification(req, res) {
  let id = req.params.id;
  //gets fields from other tables to display in dropdown menus.

  //Declares fields to be interpreted as dropdown fields in reference to other tables
  const FKFields = {
    brandid: await db.getIdNameBrands(),
    engineid: await db.getIdNameEngines(),
    colorid: await db.getIdNameColors(),
    drivetrainid: await db.getIdNameDrivetrains(),
    transmissionid: await db.getIdNameTransmissions(),
    aspirationid: await db.getIdNameAspirations(),
  };

  try {
    const messages = await db.getCar(id);

    if (!messages) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.render("itemEditPage", {
      title: "Edit Car",
      messages: messages.rows,
      pathname: "car",
      fieldId: id,
      FKFields: FKFields,
      notifications: [{ msg: "" }],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

let postModification = [
  validateCar,
  async (req, res) => {
    let id = req.params.id;

    //Declares fields to be interpreted as dropdown fields in reference to other tables
    const FKFields = {
      brandid: await db.getIdNameBrands(),
      engineid: await db.getIdNameEngines(),
      colorid: await db.getIdNameColors(),
      drivetrainid: await db.getIdNameDrivetrains(),
      transmissionid: await db.getIdNameTransmissions(),
      aspirationid: await db.getIdNameAspirations(),
    };

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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getCar(id);
        return res.status(400).render("itemEditPage", {
          title: "Edit Car",
          messages: messages.rows,
          pathname: "car",
          fieldId: id,
          FKFields: FKFields,
          notifications: errors.errors,
        });
      }
      //do a validation for repears in certain fields
      const presentfields = await db.getAllCars();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (presentfields.rows[i].modelname == carData.modelname && presentfields.rows[i].id != id) {
          isrepeat = true;
        }
      }

      const updated = isrepeat ? false : await db.updateCar(id, carData);

      if (!updated) {
        const messages = await db.getCar(id);
        return res.status(404).render("itemEditPage", {
          title: "Edit Car",
          messages: messages.rows,
          pathname: "car",
          fieldId: id,
          FKFields: FKFields,
          notifications: [{ msg: "This car already exists." }],
        });
      }

      const messages = await db.getCar(id);
      return res.status(400).render("itemEditPage", {
        title: "Edit Car",
        messages: messages.rows,
        pathname: "car",
        fieldId: id,
        FKFields: FKFields,
        notifications: [{ msg: "Updated successfully." }],
      });
    } catch (error) {
      console.error(error);
    }
  },
];

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
    //do a validation for repears in certain fields
    const presentfields = await db.getAllCars();

    let isrepeat = false;

    for (let i = 0; i < presentfields.rowCount; i++) {
      if (presentfields.rows[i].modelname == carData.modelname) {
        isrepeat = true;
      }
    }

    const inserted = isrepeat ? false : await db.insertCar(carData);

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
  getModification,
  postAddition,
  postDeletion,
  postModification,
};
