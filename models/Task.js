const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "タスクを入れてください"],
    trim: true,
    maxlength: [20, "タスク名は20文字まで"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: [true, "userIdを入れてください"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);