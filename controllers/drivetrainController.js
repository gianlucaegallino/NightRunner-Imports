const db = require("../db/queries");

async function getAll(req, res) {
  try {
    const messages = await db.getAllDrivetrains();
    if (!messages) {
      return res.status(404).json({ message: "Drivetrain not found" });
    }
    res.render("itemListPage", {
      title: "All Drivetrains",
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
    const messages = await db.getDrivetrain(id);

    if (!messages) {
      return res.status(404).json({ message: "Drivetrain not found" });
    }

    res.render("itemListPage", {
      title: "Drivetrain",
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
    const updated = await db.updateDrivetrain(id, type);

    if (!updated) {
      return res.status(404).json({ message: "Drivetrain not found" });
    }

    res.json({ message: "Drivetrain updated successfully", target: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postAddition(req, res) {
  let type = req.body.type;

  try {
    const inserted = await db.insertDrivetrain(type);

    if (!inserted) {
      return res.status(404).json({ message: "Insert drivetrain failed" });
    }

    res.json({ message: "Drivetrain inserted successfully", target: inserted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  res.redirect("/");
}

async function postDeletion(req, res) {
  let id = req.params.id;

  try {
    const deleted = await db.deleteDrivetrain(id);

    if (!deleted) {
      return res.status(404).json({ message: "Drivetrain not found" });
    }

    res.json({ message: "Drivetrain deleted successfully", target: deleted });
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
