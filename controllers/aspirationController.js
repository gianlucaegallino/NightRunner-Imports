const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const alphaErr = "must be non numeric.";
const lengthErr = "must be between 1 and 32 characters.";

//TODO: fix isnumeric validations
const validateAspiration = [
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
    const messages = await db.getAllAspirations();
    if (!messages) {
      return res.status(404).json({ message: "Aspiration not found" });
    }
    res.render("itemListPage", {
      title: "All Aspirations",
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
    const messages = await db.getAspiration(id);

    if (!messages) {
      return res.status(404).json({ message: "Aspiration not found" });
    }

    res.render("itemDetailPage", {
      title: "Aspiration",
      messages: messages.rows,
      pathname: "aspiration",
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
    const messages = await db.getAspiration(id);

    if (!messages) {
      return res.status(404).json({ message: "Aspiration not found" });
    }

    res.render("itemEditPage", {
      title: "Edit Aspiration",
      messages: messages.rows,
      pathname: "aspiration",
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
  validateAspiration,
  async (req, res) => {
    let id = req.params.id;
    let type = req.body.type;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getAspiration(id);
        return res.status(400).render("itemEditPage", {
          title: "Edit Aspiration",
          messages: messages.rows,
          pathname: "aspiration",
          fieldId: id,
          FKFields: {},
          notifications: errors.errors,
        });
      }
      //do a validation for repears in certain fields
      const presentfields = await db.getAllAspirations();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (
          presentfields.rows[i].type == type &&
          presentfields.rows[i].id != id
        ) {
          isrepeat = true;
        }
      }

      const updated = isrepeat ? false : await db.updateAspiration(id, type);

      if (!updated) {
        const messages = await db.getAspiration(id);
        return res.status(400).render("itemEditPage", {
          title: "Edit Aspiration",
          messages: messages.rows,
          pathname: "aspiration",
          fieldId: id,
          FKFields: {},
          notifications: [{ msg: "This column name already exists." }],
        });
      }

      const messages = await db.getAspiration(id);
      return res.status(200).render("itemEditPage", {
        title: "Edit Aspiration",
        messages: messages.rows,
        pathname: "aspiration",
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
    const messages = await db.getAllAspirations();

    if (!messages) {
      return res.status(404).json({ message: "Aspirations not found" });
    }

    res.render("itemAddPage", {
      title: "Add Aspiration",
      messages: messages.fields,
      pathname: "aspiration",
      FKFields: {},
      notifications: [{ msg: "" }],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

let postAddition = [
  validateAspiration,
  async (req, res) => {
    let type = req.body.type;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getAllAspirations();
        return res.status(400).render("itemAddPage", {
          title: "Add Aspiration",
          messages: messages.fields,
          pathname: "aspiration",
          FKFields: {},
          notifications: errors.errors,
        });
      }
      //do a validation for repears in certain fields
      const presentfields = await db.getAllAspirations();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (presentfields.rows[i].type == type) {
          isrepeat = true;
        }
      }

      const inserted = isrepeat ? false : await db.insertAspiration(type);

      if (!inserted) {
        const messages = await db.getAllAspirations();
        return res.status(400).render("itemAddPage", {
          title: "Add Aspiration",
          messages: messages.fields,
          pathname: "aspiration",
          FKFields: {},
          notifications: [{ msg: "This column name already exists." }],
        });
      }

      const messages = await db.getAllAspirations();
      return res.status(200).render("itemAddPage", {
        title: "Add Aspiration",
        messages: messages.fields,
        pathname: "aspiration",
        FKFields: {},
        notifications: [{ msg: "Aspiration added successfully." }],
      });
    } catch (error) {
      console.error(error);
    }
  },
];

async function postDeletion(req, res) {
  let id = req.params.id;

  try {
    await db.deleteAspirationDep(id);
    const deleted = await db.deleteAspiration(id);

    if (!deleted) {
      return res.status(404).json({ message: "Aspiration not found" });
    }

    return res.status(200).render("index.ejs", {
      notifications: [{ msg: "Aspiration and all dependencies deleted." }],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAll,
  getSpecific,
  getModification,
  getAddition,
  postModification,
  postAddition,
  postDeletion,
};
