const express = require("express");
const { createTask, getTasks, updateTaskStatus, deleteTask } = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask); // Criar uma tarefa
router.get("/", getTasks); // Listar tarefas
router.patch("/:taskId/status", updateTaskStatus); // Atualizar o status da tarefa
router.delete("/:taskId", deleteTask); // Deletar uma tarefa

module.exports = router;
