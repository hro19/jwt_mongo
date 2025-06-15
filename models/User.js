const mongoose = require("mongoose");
// const { schemaOptions } = require("./modelOption");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,//こちらで一覧画面に表示を制御することが出来る。
    },
  },
  // schemaOptions
);

const UserInfo = require("./userInfo");

userSchema.post("save", async function (doc, next) {
  try {
    // 既にuser_infoが存在しない場合のみ作成
    const exists = await UserInfo.findOne({ userId: doc._id });
    if (!exists) {
      await UserInfo.create({
        userId: doc._id,
        fullName: "",
        age: undefined,
        address: "",
        introduction: ""
      });
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);