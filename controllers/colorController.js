const db = require("../db/queries");

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

    res.render("itemListPage", {
      title: "Color",
      messages: messages.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function postModification(req, res) {
  let id = req.params.id;
  let name = req.body.name;

  try {
    const updated = await db.updateColor(id, name);

    if (!updated) {
      return res.status(404).json({ message: "Color not found" });
    }

    res.json({ message: "Color updated successfully", target: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postAddition(req, res) {
  let name = req.body.name;

  try {
    const inserted = await db.insertColor(name);

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
  postAddition,
  postDeletion,
  postModification,
};
