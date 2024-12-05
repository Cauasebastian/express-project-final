const Project = require("../models/Project");
const Team = require("../models/Team");

const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("team", "name")
      .populate("category", "name")
      .populate("Task", "title status"); // Listar as tarefas do projeto
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignTeamToProject = async (req, res) => {
  const { projectId } = req.params;
  const { teamId } = req.body;
  try {
    const project = await Project.findById(projectId);
    const team = await Team.findById(teamId);
    if (!project || !team) {
      return res.status(404).json({ message: "Project or Team not found" });
    }

    project.team = teamId;
    await project.save();

    res.status(200).json({ message: "Team assigned to project successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addTaskToProject = async (req, res) => {
  const { projectId } = req.params;
  const { taskId } = req.body;

  try {
    const project = await Project.findById(projectId);
    const task = await Task.findById(taskId);

    if (!project || !task) {
      return res.status(404).json({ message: "Project or Task not found" });
    }

    task.project = projectId;
    await task.save();

    if (!project.tasks.includes(taskId)) {
      project.tasks.push(taskId);
      await project.save();
    }

    res.status(200).json({ message: "Task added to project successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeTaskFromProject = async (req, res) => {
  const { projectId } = req.params;
  const { taskId } = req.body;

  try {
    const project = await Project.findById(projectId);
    const task = await Task.findById(taskId);

    if (!project || !task) {
      return res.status(404).json({ message: "Project or Task not found" });
    }

    task.project = null;
    await task.save();

    project.tasks = project.tasks.filter((id) => id.toString() !== taskId);
    await project.save();

    res.status(200).json({ message: "Task removed from project successfully", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createProject, 
  getProjects, 
  assignTeamToProject, 
  addTaskToProject, 
  removeTaskFromProject 
};