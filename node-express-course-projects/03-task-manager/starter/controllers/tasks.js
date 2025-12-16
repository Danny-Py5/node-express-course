const asyncWrapper = require("../middleware/async-wrapper");
const { createCustomAPIError } = require("../errors/custom-error");

const Task = require("../models/task");

const getAllTasks = asyncWrapper(async (req, res) => {
  const allTasks = await Task.find({});
  res.status(200).json({ tasks: allTasks, tasksLength: allTasks.length });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(
      createCustomAPIError(`Can\'t find task with the id: ${taskId}`, 404)
    );
    // const error = new Error(`Can\'t find task with the id: ${taskId}`);
    // error.statusCode = 404;
    // return res.status(404).json({ msg: error.message });
  }
  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const createdTask = await Task.create(req.body);
  res.status(201).json(createdTask);
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    runValidators: true,
    new: true,
  });

  if (!updatedTask) {
    return next(
      createCustomAPIError(`Couldn't find the task with taskId: ${taskId}`, 404)
    );
  }
  res.status(200).json({ task: updatedTask });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const deletedTask = await Task.findOneAndDelete({ _id: taskId });

  if (!deletedTask) {
    return next(
      createCustomAPIError(`Couldn't find the task with taskId: ${taskId}`, 404)
    );
  }

  res.status(200).json({ status: "success", info: "task deleted" });
});
module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
