const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const userRoute = require("./routes/users");
const connectDB = require("./db/connect");
require("dotenv").config();
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("./models/User");
app.use(express.json());
const port = 5000;

// CORSを許可する設定
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//データベースと接続
const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => {
      console.log(`サーバー起動 port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();

//ルーティング設計(task)
app.use("/api/v1/tasks", taskRoute);

// ユーザーの全件取得
app.use("/api/v1/users", userRoute);

//ユーザー新規登録API
app.post(
  "/register",
  body("username")
    .isLength({ min: 6 })
    .withMessage("ユーザー名は6文字以上である必要があります"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("パスワードは6文字以上である必要があります"),
  body("confirmPassword")
    .isLength({ min: 6 })
    .withMessage("確認用パスワードは6文字以上である必要があります"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザーは既に使われております");
      }
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  },
  async (req, res) => {
    //パスワードの受け取り
    const password = req.body.password;

    try {
      //【4】 パスワードの暗号化
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        "test"
      ).toString();
      req.body.password = encryptedPassword;
      //【5】 ユーザー新規作成
      const user = await User.create(req.body);
      //【6】 JWTの発行
      const token = JWT.sign({ id: user._id }, "test", {
        expiresIn: "24h",
      });
      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

//ユーザーログイン用API

// ここにユーザーログイン用のAPIの実装を追加することができます
