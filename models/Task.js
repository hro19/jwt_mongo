const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "タスクを入れてください"],
    trim: true,
    maxlength: [20, "タスク名は20文字まで"],
  },
  completedAt: {
    type: Date,
    default: null,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  priority: {
    type: String,
    enum: ["低", "中", "高"],
    default: "中",
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "詳細説明は500文字まで"],
  },
  userId: {
    type: String,
    required: [true, "userIdを入れてください"],
  },
}, {
  timestamps: true  // createdAt と updatedAt を自動生成
});

module.exports = mongoose.model("Task", TaskSchema);