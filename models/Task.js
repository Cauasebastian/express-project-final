const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Task", taskSchema);
