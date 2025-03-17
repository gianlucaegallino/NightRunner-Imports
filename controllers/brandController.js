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
    .withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Name ${lengthErr1}`),
  body("year_est")
    .trim()
    .isNumeric()
    .withMessage(`Year of establishment ${numErr}`)
    .isLength(4)
    .withMessage(`Year of establishment ${lengthErr2}`),
  body("founder")
    .trim()
    .not()
    .isNumeric()
    .withMessage(`Founder ${alphaErr}`)
    .isLength({ min: 1, max: 32 })
    .withMessage(`Founder ${lengthErr3}`),
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
      //do a validation for repears in certain fields
      const presentfields = await db.getAllBrands();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (
          presentfields.rows[i].name == name &&
          presentfields.rows[i].id != id
        ) {
          isrepeat = true;
        }
      }

      const updated = isrepeat
        ? false
        : await db.updateBrand(id, name, year, founder);

      if (!updated) {
        const messages = await db.getBrand(id);
        return res.status(404).render("itemEditPage", {
          title: "Edit Brand",
          messages: messages.rows,
          pathname: "brand",
          fieldId: id,
          FKFields: {},
          notifications: [{ msg: "This brand already exists." }],
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

async function getAddition(req, res) {
  try {
    const messages = await db.getAllBrands();

    if (!messages) {
      return res.status(404).json({ message: "Brands not found" });
    }

    res.render("itemAddPage", {
      title: "Add Brand",
      messages: messages.fields,
      pathname: "brand",
      FKFields: {},
      notifications: [{ msg: "" }],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

let postAddition = [
  validateBrand,
  async (req, res) => {
    let name = req.body.name;
    let year = req.body.year;
    let founder = req.body.founder;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const messages = await db.getAllBrands();
        res.render("itemAddPage", {
          title: "Add Brand",
          messages: messages.fields,
          pathname: "brand",
          FKFields: {},
          notifications: errors.errors,
        });
      }
      //do a validation for repears in certain fields
      const presentfields = await db.getAllBrands();

      let isrepeat = false;

      for (let i = 0; i < presentfields.rowCount; i++) {
        if (presentfields.rows[i].name == name) {
          isrepeat = true;
        }
      }

      const inserted = isrepeat
        ? false
        : await db.insertBrand(name, year, founder);

      if (!inserted) {
        const messages = await db.getAllBrands();
        return res.status(400).render("itemAddPage", {
          title: "Add Brand",
          messages: messages.fields,
          pathname: "brand",
          FKFields: {},
          notifications: [{ msg: "This column name already exists." }],
        });
      }

      const messages = await db.getAllBrands();
      return res.status(200).render("itemAddPage", {
        title: "Add Brand",
        messages: messages.fields,
        pathname: "brand",
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
  getAddition,
  postAddition,
  postDeletion,
  postModification,
};
