const mongoose = require("mongoose");
const Task = require("./Task");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  Tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Project", projectSchema);
