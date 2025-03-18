const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const alphaErr = "must be non numeric.";
const lengthErr = "must be between 1 and 32 characters.";

//TODO: fix isnumeric validations
const validateTransmission = [
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
    const messages = await db.getAllTransmissions();
    if (!messages) {
      return res.status(404).json({ message: "Transmission not found" });
    }
    res.render("itemListPage", {
      title: "All Transmissions",
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
    const messages = await db.getTransmission(id);

    if (!messages) {
      return res.status(404).json({ message: "Transmission not found" });
    }

    res.render("itemDetailPage", {
      title: "Transmission",
      messages: messages.rows,
      pathname: "transmission",
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
    const messages = await db.getTransmission(id);

    if (!messages) {
      return res.status(404).json({ message: "Transmission not found" });
    }

    res.render("itemEditPage", {
      title: "Edit Transmission",
      messages: messages.rows,
      pathname: "transmission",
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
  validateTransmission,
  async (req, res) => {
    let id = req.params.id;
    let type = req.body.type;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getTransmission(id);
        return res.status(400).render("itemEditPage", {
          title: "Edit Transmission",
          messages: messages.rows,
          pathname: "transmission",
          fieldId: id,
          FKFields: {},
          notifications: errors.errors,
        });
      }
      //do a validation for repears in certain fields
      const presentfields = await db.getAllTransmissions();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (
          presentfields.rows[i].type == type &&
          presentfields.rows[i].id != id
        ) {
          isrepeat = true;
        }
      }

      const updated = isrepeat ? false : await db.updateTransmission(id, type);

      if (!updated) {
        const messages = await db.getTransmission(id);
        return res.status(404).render("itemEditPage", {
          title: "Edit Transmission",
          messages: messages.rows,
          pathname: "transmission",
          fieldId: id,
          FKFields: {},
          notifications: [{ msg: "Transmission update failed." }],
        });
      }

      const messages = await db.getTransmission(id);
      return res.status(200).render("itemEditPage", {
        title: "Edit Transmission",
        messages: messages.rows,
        pathname: "transmission",
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
    const messages = await db.getAllTransmissions();

    if (!messages) {
      return res.status(404).json({ message: "Transmissions not found" });
    }

    res.render("itemAddPage", {
      title: "Add Transmission",
      messages: messages.fields,
      pathname: "transmission",
      FKFields: {},
      notifications: [{ msg: "" }],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
let postAddition = [
  validateTransmission,
  async (req, res) => {
    let type = req.body.type;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getAllTransmissions();
        return res.status(400).render("itemAddPage", {
          title: "Add Transmission",
          messages: messages.fields,
          pathname: "transmission",
          FKFields: {},
          notifications: errors.errors,
        });
      }
      //do a validation for repears in certain fields
      const presentfields = await db.getAllTransmissions();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (presentfields.rows[i].type == type) {
          isrepeat = true;
        }
      }

      const inserted = isrepeat ? false : await db.insertTransmission(type);

      if (!inserted) {
        const messages = await db.getAllTransmissions();
        return res.status(400).render("itemAddPage", {
          title: "Add Transmission",
          messages: messages.fields,
          pathname: "transmission",
          FKFields: {},
          notifications: [{ msg: "This transmission name already exists." }],
        });
      }

      const messages = await db.getAllTransmissions();
      return res.status(200).render("itemAddPage", {
        title: "Add Transmission",
        messages: messages.fields,
        pathname: "transmission",
        FKFields: {},
        notifications: [{ msg: "Transmission added successfully." }],
      });
    } catch (error) {
      console.error(error);
    }
  },
];
async function postDeletion(req, res) {
  let id = req.params.id;

  try {
    await db.deleteTransmissionDep(id);
    const deleted = await db.deleteTransmission(id);

    if (!deleted) {
      return res.status(404).json({ message: "Transmission not found" });
    }

    return res.status(200).render("index.ejs", {
      notifications: [{ msg: "Transmission and all dependencies deleted." }],
    });
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
