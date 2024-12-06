const Comment = require("../models/commentModel");


exports.createComment = async (req, res) => {
  const { content, taskId, userId } = req.body;
  try {
    const comment = new Comment({ content, task: taskId, user: userId });
    await comment.save();
    res.status(201).json({ message: "Comentário criado!", comment });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar comentário", error });
  }
};


exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("task user");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar comentários", error });
  }
};

// Atualizando um comentário
exports.updateComment = async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
    res.status(200).json({ message: "Comentário atualizado!", updatedComment });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar comentário", error });
  }
};


exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comentário deletado!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar comentário", error });
  }
};
