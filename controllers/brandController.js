const db = require("../db/queries");

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
      fieldId: id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function postModification(req, res) {
  let id = req.params.id;
  let name = req.body.name;
  let year = req.body.year;
  let founder = req.body.founder;

  try {
    const updated = await db.updateBrand(id, name, year, founder);

    if (!updated) {
      return res.status(404).json({ message: "Brand not found" });
    }

   
  } catch (error) {
    console.error(error);

  }

  res.redirect("/");
}

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
