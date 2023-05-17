const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("User", UserSchema);