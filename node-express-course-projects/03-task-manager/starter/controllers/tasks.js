const Task = require("../models/task");
const tasks = [
  {
    id: "task1",
    completed: false,
    name: "buy yam",
  },
  {
    id: "task2",
    completed: true,
    name: "eat yam and play ball",
  },
];
const getAllTasks = (req, res) => {
  res.send("all tasks from the file");
};
const getTask = (req, res) => {
  taskResponse = tasks.find((task) => {
    return task.id == req.params.id;
  });
  return res.status(200).json(taskResponse);
};
const createTask = async (req, res) => {
  try {
    const createdTask = await Task.create(req.body);
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(400).json({ msg: error.message, status: "unsuccessful" });
  }
};
const updateTask = (req, res) => {
  res.send("task updated");
};
const deleteTask = (req, res) => {
  res.send("task deleted");
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
