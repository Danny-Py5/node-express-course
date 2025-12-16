const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).json({ tasks: allTasks, tasksLength: allTasks.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, error });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return res
        .status(404)
        .json({ msg: `Can\'t find task with the id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        msg: `Couldn't find the task with taskId: ${error.value}`,
        fact: "CastError: the id passed is not valid",
      });
    }
    res.status(500).json({ msg: error.message, success: false, error });
  }
};

const createTask = async (req, res) => {
  try {
    const createdTask = await Task.create(req.body);
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      status: "unsuccessful",
      taskName: req.body.name,
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      runValidators: true,
      new: true,
    });

    if (!updatedTask) {
      return res
        .status(404)
        .json({ msg: `Couldn't find the task with taskId: ${taskId}` });
    }
    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ msg: error.message, success: false, error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });

    if (!deletedTask) {
      // must return here else, the execution of the code continues
      return res
        .status(404)
        .json({ msg: `Couldn't find the task with taskId: ${taskId}` });
    }

    res.status(200).json({ status: "success", info: "task deleted" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        msg: `Couldn't find the task with taskId: ${error.value}`,
        fact: "CastError: the id passed is not valid",
      });
    }
    res.status(500).json({ msg: error.message, success: false, error });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
