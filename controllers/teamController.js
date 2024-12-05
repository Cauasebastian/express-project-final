const Team = require("../models/Team");
const User = require("../models/User");

const createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("members", "name email");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUserToTeam = async (req, res) => {
  const { teamId } = req.params;
  const { userId } = req.body;
  try {
    const team = await Team.findById(teamId);
    const user = await User.findById(userId);
    if (!team || !user) return res.status(404).json({ message: "Team or User not found" });

    team.members.push(userId);
    await team.save();

    user.teams.push(teamId);
    await user.save();

    res.status(200).json({ message: "User added to team successfully", team });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeUserFromTeam = async (req, res) => {
  const { teamId, userId } = req.params; // userId agora é passado pela URL
  try {
    const team = await Team.findById(teamId);
    const user = await User.findById(userId);
    if (!team || !user) return res.status(404).json({ message: "Team or User not found" });

    // Remove o usuário do time
    team.members.pull(userId);
    await team.save();

    // Remove o time da lista de times do usuário
    user.teams.pull(teamId);
    await user.save();

    res.status(200).json({ message: "User removed from team successfully", team });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTeam, getTeams, addUserToTeam, removeUserFromTeam };
