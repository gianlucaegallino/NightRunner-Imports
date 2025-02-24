const db = require("../db/queries");

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

    res.render("itemListPage", {
      title: "Aspiration",
      messages: messages.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function postModification(req, res) {
  let id = req.params.id;
  let type = req.body.type;

  try {
    const updated = await db.updateAspiration(id, type);

    if (!updated) {
      return res.status(404).json({ message: "Aspiration not found" });
    }

    res.json({ message: "Aspiration updated successfully", target: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postAddition(req, res) {
  let type = req.body.type;

  try {
    const inserted = await db.insertAspiration(type);

    if (!inserted) {
      return res.status(404).json({ message: "Insert aspiration failed" });
    }

    res.json({ message: "Aspiration inserted successfully", target: inserted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postDeletion(req, res) {
  let id = req.params.id;

  try {
    const deleted = await db.deleteAspiration(id);

    if (!deleted) {
      return res.status(404).json({ message: "Aspiration not found" });
    }

    res.json({ message: "Aspiration deleted successfully", target: deleted });
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
