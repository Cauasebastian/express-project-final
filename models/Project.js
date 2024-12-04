const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

module.exports = mongoose.model("Project", projectSchema);
