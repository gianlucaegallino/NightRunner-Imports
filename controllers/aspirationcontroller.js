const db = require("../db/queries");

async function getAll(req, res) {
    let messages = await db.getAllAspirations();
    res.render("aspirations", { title: "All Aspirations", messages: messages.rows });
  }
  
  async function getSpecific(req, res) {
    let id = req.body.id;
    let messages = await db.getAspiration(id);
    let message = messages.rows[0];
    res.render("aspirations", { title: "Aspiration details", messages: message});
  }
  
  async function postModification(req, res) {
    let description = req.body.description;
    let messages = await db.modifyAspiration(description);
    let message = messages.rows[id-1];
  
    res.render("info", { message: message });
  }
  
  async function postAddition(req, res) {
    let name = req.body.name;
    let text = req.body.text;
    let added = new Date().toLocaleString("en-GB").toString();
    await db.insertMessage(name, text, added);
    res.redirect("/");
  }
  
  async function postDeletion(req, res) {
    let name = req.body.name;
    let text = req.body.text;
    let added = new Date().toLocaleString("en-GB").toString();
    await db.insertMessage(name, text, added);
    res.redirect("/");
  }

  module.exports = {
    getIndex,
    getNew,
    postInfo,
    postNew,
  };