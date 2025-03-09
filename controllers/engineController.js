const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const alphaErr = "must be non numeric.";
const lengthErr = "must be between 1 and 32 characters.";

//TODO: fix isnumeric validations
const validateEngine = [
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
    const messages = await db.getAllEngines();
    if (!messages) {
      return res.status(404).json({ message: "Engine not found" });
    }
    res.render("itemListPage", {
      title: "All Engines",
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
    const messages = await db.getEngine(id);

    if (!messages) {
      return res.status(404).json({ message: "Engine not found" });
    }

    res.render("itemDetailPage", {
      title: "Engine",
      messages: messages.rows,
      pathname: "engine",
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
    const messages = await db.getEngine(id);

    if (!messages) {
      return res.status(404).json({ message: "Engine not found" });
    }

    res.render("itemEditPage", {
      title: "Edit Engine",
      messages: messages.rows,
      pathname: "engine",
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
  validateEngine,
  async (req, res) => {
    let id = req.params.id;
    let type = req.body.type;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getEngine(id);
        return res.status(400).render("itemEditPage", {
          title: "Edit Engine",
          messages: messages.rows,
          pathname: "engine",
          fieldId: id,
          FKFields: {},
          notifications: errors.errors,
        });
      }
      const updated = await db.updateEngine(id, type);

      if (!updated) {
        const messages = await db.getEngine(id);
        return res.status(404).render("itemEditPage", {
          title: "Edit Engine",
          messages: messages.rows,
          pathname: "engine",
          fieldId: id,
          FKFields: {},
          notifications: [{ msg: "Engine update failed." }],
        });
      }

      const messages = await db.getEngine(id);
      return res.status(400).render("itemEditPage", {
        title: "Edit Engine",
        messages: messages.rows,
        pathname: "engine",
        fieldId: id,
        FKFields: {},
        notifications: [{ msg: "Updated successfully." }],
      });
    } catch (error) {
      console.error(error);
    }
  },
];

async function postAddition(req, res) {
  let type = req.body.type;

  try {
    const inserted = await db.insertEngine(type);

    if (!inserted) {
      return res.status(404).json({ message: "Insert Engine failed" });
    }

    res.json({ message: "Engine inserted successfully", target: inserted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postDeletion(req, res) {
  let id = req.params.id;

  try {
    const deleted = await db.deleteEngine(id);

    if (!deleted) {
      return res.status(404).json({ message: "Engine not found" });
    }

    res.json({ message: "Engine deleted successfully", target: deleted });
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
