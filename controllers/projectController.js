const Project = require("../models/Project");
const Team = require("../models/Team");
const Task = require("../models/Task"); // Certifique-se de que o caminho está correto

// Criar um novo projeto
const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os projetos
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("teams", "name") // Popula o array de times
      .populate("tasks", "title status"); // Popula o array de tarefas
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Associar um time a um projeto
const assignTeamToProject = async (req, res) => {
  const { projectId } = req.params;
  const { teamId } = req.body;

  try {
    const project = await Project.findById(projectId);
    const team = await Team.findById(teamId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Verifica se o time já está associado
    if (project.teams.includes(teamId)) {
      return res.status(400).json({ message: "Team is already assigned to this project" });
    }

    project.teams.push(teamId);
    await project.save();

    res.status(200).json({
      message: "Team assigned to project successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Remover uma tarefa de um projeto
const removeTeamFromProject = async (req, res) => {
  const { projectId } = req.params;
  const { teamId } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Verifica se o time está associado ao projeto
    if (!project.teams.includes(teamId)) {
      return res.status(400).json({ message: "Team is not assigned to this project" });
    }

    // Remove o time do array de times do projeto
    project.teams = project.teams.filter((id) => id.toString() !== teamId);
    await project.save();

    res.status(200).json({
      message: "Team removed from project successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Adicionar uma tarefa a um projeto
const addTaskToProject = async (req, res) => {
  const { projectId } = req.params;
  const { taskId } = req.body;

  if (!projectId || !taskId) {
    return res.status(400).json({ message: "Project ID and Task ID are required" });
  }

  try {
    // Busca o projeto e a tarefa em paralelo
    const [project, task] = await Promise.all([
      Project.findById(projectId),
      Task.findById(taskId),
    ]);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Verifica se a tarefa já pertence ao projeto
    if (task.project && task.project.toString() !== projectId) {
      return res.status(400).json({ message: "Task is already assigned to another project" });
    }

    task.project = projectId;
    await task.save();

    if (!project.tasks.includes(task._id)) {
      project.tasks.push(task._id);
      await project.save();
    }

    res.status(200).json({
      message: "Task added to project successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remover uma tarefa de um projeto
const removeTaskFromProject = async (req, res) => {
  const { projectId } = req.params;
  const { taskId } = req.body;

  if (!projectId || !taskId) {
    return res.status(400).json({ message: "Project ID and Task ID are required" });
  }

  try {
    // Busca o projeto e a tarefa em paralelo
    const [project, task] = await Promise.all([
      Project.findById(projectId),
      Task.findById(taskId),
    ]);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.project && task.project.toString() !== projectId) {
      return res.status(400).json({ message: "Task is not assigned to this project" });
    }

    task.project = null;
    await task.save();

    project.tasks = project.tasks.filter((id) => id.toString() !== taskId);
    await project.save();

    res.status(200).json({
      message: "Task removed from project successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  assignTeamToProject,
  addTaskToProject,
  removeTaskFromProject,
  removeTeamFromProject
};