const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const alphaErr = "must be non numeric.";
const lengthErr = "must be between 1 and 64 characters.";

//TODO: fix isnumeric validations
const validateColor = [
  body("name")
    .trim()
    .not()
    .isNumeric()
    .withMessage(`Type ${alphaErr}`)
    .isLength({ min: 1, max: 64 })
    .withMessage(`Type ${lengthErr}`),
];

async function getAll(req, res) {
  try {
    const messages = await db.getAllColors();
    if (!messages) {
      return res.status(404).json({ message: "Color not found" });
    }
    res.render("itemListPage", {
      title: "All Colors",
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
    const messages = await db.getColor(id);

    if (!messages) {
      return res.status(404).json({ message: "Color not found" });
    }

    res.render("itemDetailPage", {
      title: "Color",
      messages: messages.rows,
      pathname: "color",
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
    const messages = await db.getColor(id);

    if (!messages) {
      return res.status(404).json({ message: "Color not found" });
    }

    res.render("itemEditPage", {
      title: "Edit Color",
      messages: messages.rows,
      pathname: "color",
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
  validateColor,
  async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getColor(id);
        return res.status(400).render("itemEditPage", {
          title: "Edit Color",
          messages: messages.rows,
          pathname: "color",
          fieldId: id,
          FKFields: {},
          notifications: errors.errors,
        });
      }

      //do a validation for repears in certain fields
      const presentfields = await db.getAllColors();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (presentfields.rows[i].name == name) {
          isrepeat = true;
        }
      }

      const updated = isrepeat ? false : await db.updateColor(id, name);

      if (!updated) {
        const messages = await db.getColor(id);
        return res.status(404).render("itemEditPage", {
          title: "Edit Color",
          messages: messages.rows,
          pathname: "color",
          fieldId: id,
          FKFields: {},
          notifications: [{ msg: "This column name already exists." }],
        });
      }

      const messages = await db.getColor(id);
      return res.status(400).render("itemEditPage", {
        title: "Edit Color",
        messages: messages.rows,
        pathname: "color",
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
  let name = req.body.name;

  try {
    //do a validation for repears in certain fields
    const presentfields = await db.getAllColors();

    let isrepeat = false;

    for (let i = 0; i < presentfields.rowCount; i++) {
      if (presentfields.rows[i].name == name) {
        isrepeat = true;
      }
    }

    const inserted = isrepeat ? false : await db.insertColor(name);

    if (!inserted) {
      return res.status(404).json({ message: "Insert color failed" });
    }

    res.json({ message: "Color inserted successfully", target: inserted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postDeletion(req, res) {
  let id = req.params.id;

  try {
    const deleted = await db.deleteColor(id);

    if (!deleted) {
      return res.status(404).json({ message: "Color not found" });
    }

    res.json({ message: "Color deleted successfully", target: deleted });
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
