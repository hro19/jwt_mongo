const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 1対1リレーション
    },
    fullName: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    introduction: {
      type: String,
      required: false,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserInfo", userInfoSchema); 