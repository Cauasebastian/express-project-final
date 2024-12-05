const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
  task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Nome correto
});

module.exports = mongoose.model("Project", projectSchema);
