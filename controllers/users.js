const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Task = require("../models/Task");
require("dotenv").config();

// register関数
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    //【4】 パスワードの暗号化
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();
    //【5】 ユーザー新規作成
    const user = await User.create({ username, password: encryptedPassword });
    //【6】 JWTの発行
    const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// login関数
const login = async (req, res) => {
  const { username, password } = req.body;

  //【3】 すでにそのユーザーが存在しているのチェック
  try {
    const user = await User.findOne({ username }).select("password username");
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "ユーザー名が無効です",
          },
        ],
      });
    }

    //【4】パスワードが合っているかを照合する。【5】は保存プロセスなのでログインページではありませんのでスキップ
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "パスワードが無効です",
          },
        ],
      });
    }

    //【6】 JWTの発行
    const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    //リクエスト成功、新たなリソースの作成に成功したことを表す。
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};


//全てのユーザー
const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find({});
    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json(err);
  }
};


//特定ユーザの呼び出し
const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;

    // 特定のユーザーを取得
    const user = await User.findOne({ _id: id }).exec();
    // 特定のユーザーのtasksを全取得
    const userTasks = await Task.find({ userId: id }).exec();
    res.status(200).json({user,userTasks});
  } catch (err) {
    res.status(500).json(err);
  }
};

//ユーザー情報編集
// const updateTask = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const update = req.body; // 更新するデータをリクエストボディから取得
//     const options = { new: true }; // 更新後のタスクを取得するためのオプション

//     const updatedTask = await Task.findOneAndUpdate(
//       { _id: id },
//       update,
//       options
//     ).exec();

//     if (updatedTask) {
//       res.status(200).json(updatedTask);
//     } else {
//       res.status(404).json({ message: "存在しません" });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

//ユーザー削除
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
  register,
  login,
  getAllUsers,
  getSingleUser,
  // updateUser,
  deleteUser
};
