const User = require("../models/User");

//全てのタスク
const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//タスク新規作成
const createUser = async(req, res) => {
    try {
    const createUser = await User.create(req.body);
        res.status(200).json(createUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

//特定タスクの呼び出し
const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const singleUser = await User.findOne({ _id: id }).exec();
    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//タスク編集
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body; // 更新するデータをリクエストボディから取得
    const options = { new: true }; // 更新後のタスクを取得するためのオプション

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      update,
      options
    ).exec();

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "存在しません" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//タスク削除
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findOneAndDelete({ _id: id }).exec();

    if (deletedUser) {
      res.status(200).json({ message: "正常に削除できました" });
    } else {
      res.status(404).json({ message: "このタスクがありません" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
};