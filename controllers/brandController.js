const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const alphaErr = "must be non numeric.";
const numErr = "must be numeric.";
const lengthErr1 = "must be between 1 and 255 characters.";
const lengthErr2 = "must be between 4 characters long.";
const lengthErr3 = "must be between 1 and 32 characters.";

const validateBrand = [
  body("name")
    .trim()
    .not()
    .isNumeric()
    .withMessage(`Type ${alphaErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Type ${lengthErr1}`),
  body("year_est")
    .trim()
    .isNumeric()
    .withMessage(`Type ${numErr}`)
    .isLength(4)
    .withMessage(`Type ${lengthErr2}`),
  body("founder")
    .trim()
    .not()
    .isNumeric()
    .withMessage(`Type ${alphaErr}`)
    .isLength({ min: 1, max: 32 })
    .withMessage(`Type ${lengthErr3}`),
];

async function getAll(req, res) {
  try {
    const messages = await db.getAllBrands();
    if (!messages) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.render("itemListPage", {
      title: "All Brands",
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
    const messages = await db.getBrand(id);

    if (!messages) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.render("itemDetailPage", {
      title: "Brand",
      messages: messages.rows,
      pathname: "brand",
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
    const messages = await db.getBrand(id);

    if (!messages) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.render("itemEditPage", {
      title: "Edit Brand",
      messages: messages.rows,
      pathname: "brand",
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
  validateBrand,
  async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let year = req.body.year_est;
    let founder = req.body.founder;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getBrand(id);
        return res.status(400).render("itemEditPage", {
          title: "Edit Brand",
          messages: messages.rows,
          pathname: "brand",
          fieldId: id,
          FKFields: {},
          notifications: errors.errors,
        });
      }

      const updated = await db.updateBrand(id, name, year, founder);

      if (!updated) {
        const messages = await db.getBrand(id);
        return res.status(404).render("itemEditPage", {
          title: "Edit Brand",
          messages: messages.rows,
          pathname: "brand",
          fieldId: id,
          FKFields: {},
          notifications: [{ msg: "Brand update failed." }],
        });
      }

      const messages = await db.getBrand(id);
      return res.status(400).render("itemEditPage", {
        title: "Edit Brand",
        messages: messages.rows,
        pathname: "brand",
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
  let year = req.body.year;
  let founder = req.body.founder;

  try {
    const inserted = await db.insertBrand(name, year, founder);

    if (!inserted) {
      return res.status(404).json({ message: "Insert Brand failed" });
    }

    res.json({ message: "Brand inserted successfully", target: inserted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postDeletion(req, res) {
  let id = req.params.id;

  try {
    const deleted = await db.deleteBrand(id);

    if (!deleted) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully", target: deleted });
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
