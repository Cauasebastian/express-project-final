const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true }, 
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
}, { timestamps: true }); 


const Comment = mongoose.model("Comment", commentSchema);

async function saveComment(content, taskId, userId) {
  const comment = new Comment({ content, task: taskId, user: userId });
  await comment.save();
  console.log("Comentário salvo!");
}

(async () => {
  await mongoose.connect("mongodb://localhost:27017/taskManagerDB");

  await saveComment("Ótimo trabalho!", "615dbfe8b8e4db3b3d9d8a1b", "615dbfe8b8e4db3b3d9d8a1a");
})();
