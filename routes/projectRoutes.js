const express = require("express");
const { createProject, getProjects, assignTeamToProject } = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject); // Criar um projeto
router.get("/", getProjects); // Listar projetos
router.post("/:projectId/assign-team", assignTeamToProject); // Associar um time ao projeto

module.exports = router;
