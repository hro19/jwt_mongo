const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
const port = 5000;

// CORSを許可する設定
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//ルーティング設計
app.use("/api/v1/users",userRoute);

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