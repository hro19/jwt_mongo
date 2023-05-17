const Task = require("../models/Task");

//全てのタスク
const getAllTasks = async (req, res) => {
  try {
    const allTask = await Task.find({});
    res.status(200).json(allTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

//タスク新規作成
const createTask = async(req, res) => {
    try {
    const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

//特定タスクの呼び出し
const getSingleTask = async (req, res) => {
  try {
    const id = req.params.id;
    const singleTask = await Task.findOne({ _id: id }).exec();
    res.status(200).json(singleTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

//タスク編集
const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body; // 更新するデータをリクエストボディから取得
    const options = { new: true }; // 更新後のタスクを取得するためのオプション

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      update,
      options
    ).exec();

    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: "存在しません" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//タスク削除
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTask = await Task.findOneAndDelete({ _id: id }).exec();

    if (deletedTask) {
      res.status(200).json({ message: "正常に削除できました" });
    } else {
      res.status(404).json({ message: "このタスクがありません" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask
};