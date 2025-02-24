const db = require("../db/queries");

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
    const updated = await db.updateEngine(id, type);

    if (!updated) {
      return res.status(404).json({ message: "Engine not found" });
    }

    res.json({ message: "Engine updated successfully", target: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

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
  postAddition,
  postDeletion,
  postModification,
};
