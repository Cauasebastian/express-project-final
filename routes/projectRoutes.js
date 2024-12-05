const express = require("express");
const { 
  createProject, 
  getProjects, 
  assignTeamToProject, 
  addTaskToProject, 
  removeTaskFromProject 
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject); // Criar um projeto
router.get("/", getProjects); // Listar projetos
router.post("/:projectId/assign-team", assignTeamToProject); // Associar um time ao projeto
router.post("/:projectId/add-task", addTaskToProject); // Adicionar uma tarefa ao projeto
router.post("/:projectId/remove-task", removeTaskFromProject); // Remover uma tarefa do projeto

module.exports = router;
