const db = require("../db/queries");

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
  let id = req.body.id;

  try {
    const messages = await db.getTransmission(id);

    if (!messages) {
      return res.status(404).json({ message: "Transmission not found" });
    }

    res.render("itemListPage", {
      title: "Transmission",
      messages: messages.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function postModification(req, res) {
  let id = req.body.id;
  let type = req.body.type;

  try {
    const updated = await db.updateTransmission(id, type);

    if (!updated) {
      return res.status(404).json({ message: "Transmission not found" });
    }

    res.json({ message: "Transmission updated successfully", target: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postAddition(req, res) {
  let type = req.body.type;

  try {
    const inserted = await db.insertTransmission(type);

    if (!inserted) {
      return res.status(404).json({ message: "Insert Transmission failed" });
    }

    res.json({ message: "Transmission inserted successfully", target: inserted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postDeletion(req, res) {
  let id = req.body.id;

  try {
    const deleted = await db.deleteTransmission(id);

    if (!deleted) {
      return res.status(404).json({ message: "Transmission not found" });
    }

    res.json({ message: "Transmission deleted successfully", target: deleted });
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
