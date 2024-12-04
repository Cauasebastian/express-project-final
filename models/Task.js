const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["To Do", "In Progress", "Done"] },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Task", taskSchema);
