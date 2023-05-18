const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const connectDB = require("./db/connect");
require("dotenv").config();

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
app.use("/api/v1", authRoute);