const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: null }], // Corrigido para "tasks"
});

module.exports = mongoose.model("Project", projectSchema);
