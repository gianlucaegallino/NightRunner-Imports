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
  let id = req.params.id;

  try {
    const messages = await db.getTransmission(id);

    if (!messages) {
      return res.status(404).json({ message: "Transmission notgetSpecific found" });
    }

    res.render("itemDetailPage", {
      title: "Transmission",
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
    const messages = await db.getTransmission(id);

    if (!messages) {
      return res.status(404).json({ message: "Transmission notgetSpecific found" });
    }

    res.render("itemEditPage", {
      title: "Edit Transmission",
      messages: messages.rows,
      pathname: "transmission",
      fieldId: id
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
    const updated = await db.updateTransmission(id, type);

    if (!updated) {
      return res.status(404).json({ message: "Transmission not found" });
    }

    
  } catch (error) {
    console.error(error);

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
  let id = req.params.id;

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
  getModification,
  postAddition,
  postDeletion,
  postModification,
};
