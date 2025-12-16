const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true, "must provide name for task"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  completed: Boolean,
});

module.exports = model("tasks", TaskSchema);
