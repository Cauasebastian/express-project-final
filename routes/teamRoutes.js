const express = require("express");
const { createTeam, getTeams, addUserToTeam, removeUserFromTeam } = require("../controllers/teamController");

const router = express.Router();

router.post("/", createTeam); // Criar um time
router.get("/", getTeams); // Listar todos os times
router.post("/:teamId/add-user", addUserToTeam); // Adicionar um usuário ao time
router.post("/:teamId/remove-user", removeUserFromTeam); // Remover um usuário do time

module.exports = router;
