const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const alphaErr = "must be non numeric.";
const lengthErr = "must be between 1 and 32 characters.";

//TODO: fix isnumeric validations
const validateDrivetrain = [
  body("type")
    .trim()
    .not()
    .isNumeric()
    .withMessage(`Type ${alphaErr}`)
    .isLength({ min: 1, max: 32 })
    .withMessage(`Type ${lengthErr}`),
];

async function getAll(req, res) {
  try {
    const messages = await db.getAllDrivetrains();
    if (!messages) {
      return res.status(404).json({ message: "Drivetrain not found" });
    }
    res.render("itemListPage", {
      title: "All Drivetrains",
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
    const messages = await db.getDrivetrain(id);

    if (!messages) {
      return res.status(404).json({ message: "Drivetrain not found" });
    }

    res.render("itemDetailPage", {
      title: "Drivetrain",
      messages: messages.rows,
      pathname: "drivetrain",
      fieldId: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getModification(req, res) {
  let id = req.params.id;

  try {
    const messages = await db.getDrivetrain(id);

    if (!messages) {
      return res.status(404).json({ message: "Drivetrain not found" });
    }

    res.render("itemEditPage", {
      title: "Edit Drivetrain",
      messages: messages.rows,
      pathname: "drivetrain",
      fieldId: id,
      FKFields: {},
      notifications: [{ msg: "" }],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

let postModification = [
  validateDrivetrain,
  async (req, res) => {
    let id = req.params.id;
    let type = req.body.type;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getDrivetrain(id);
        return res.status(400).render("itemEditPage", {
          title: "Edit Drivetrain",
          messages: messages.rows,
          pathname: "drivetrain",
          fieldId: id,
          FKFields: {},
          notifications: errors.errors,
        });
      }
      //do a validation for repears in certain fields
      const presentfields = await db.getAllDrivetrains();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (
          presentfields.rows[i].type == type &&
          presentfields.rows[i].id != id
        ) {
          isrepeat = true;
        }
      }

      const updated = isrepeat ? false : await db.updateDrivetrain(id, type);

      if (!updated) {
        const messages = await db.getDrivetrain(id);
        return res.status(404).render("itemEditPage", {
          title: "Edit Drivetrain",
          messages: messages.rows,
          pathname: "drivetrain",
          fieldId: id,
          FKFields: {},
          notifications: [{ msg: "This column name already exists." }],
        });
      }

      const messages = await db.getDrivetrain(id);
      return res.status(200).render("itemEditPage", {
        title: "Edit Drivetrain",
        messages: messages.rows,
        pathname: "drivetrain",
        fieldId: id,
        FKFields: {},
        notifications: [{ msg: "Updated successfully." }],
      });
    } catch (error) {
      console.error(error);
    }
  },
];

async function getAddition(req, res) {
  try {
    const messages = await db.getAllDrivetrains();

    if (!messages) {
      return res.status(404).json({ message: "Drivetrains not found" });
    }

    res.render("itemAddPage", {
      title: "Add Drivetrain",
      messages: messages.fields,
      pathname: "drivetrain",
      FKFields: {},
      notifications: [{ msg: "" }],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

let postAddition = [
  validateDrivetrain,
  async (req, res) => {
    let type = req.body.type;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getAllDrivetrains();
        return res.status(400).render("itemAddPage", {
          title: "Add Drivetrain",
          messages: messages.fields,
          pathname: "drivetrain",
          FKFields: {},
          notifications: errors.errors,
        });
      }
      //do a validation for repears in certain fields
      const presentfields = await db.getAllDrivetrains();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (presentfields.rows[i].type == type) {
          isrepeat = true;
        }
      }

      const inserted = isrepeat ? false : await db.insertDrivetrain(type);

      if (!inserted) {
        const messages = await db.getAllDrivetrains();
        return res.status(400).render("itemAddPage", {
          title: "Add Drivetrain",
          messages: messages.fields,
          pathname: "drivetrain",
          FKFields: {},
          notifications: [{ msg: "This column name already exists." }],
        });
      }

      const messages = await db.getAllDrivetrains();
      return res.status(200).render("itemAddPage", {
        title: "Add Drivetrain",
        messages: messages.fields,
        pathname: "drivetrain",
        FKFields: {},
        notifications: [{ msg: "Drivetrain added successfully." }],
      });
    } catch (error) {
      console.error(error);
    }
  },
];

async function postDeletion(req, res) {
  let id = req.params.id;

  try {
    const deleted = await db.deleteDrivetrain(id);

    if (!deleted) {
      return res.status(404).json({ message: "Drivetrain not found" });
    }

    res.json({ message: "Drivetrain deleted successfully", target: deleted });
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
  getAddition,
  postAddition,
  postDeletion,
  postModification,
};
