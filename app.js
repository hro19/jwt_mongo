const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');

const app = express();
const taskRoute = require("./routes/tasks");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");

const User = require("./models/User");
app.use(cookieParser());
app.use(express.json());
const port = 5000;

// CORSを許可する設定
app.use(cors());

// データベースと接続
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

// Swagger UIの設定
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Task Manager API Documentation"
}));

// ルーティング設計 (task)
app.use("/api/v1/tasks", taskRoute);

// ユーザーの全件取得
app.use("/api/v1/users", userRoute);

// ユーザー新規登録API
app.use("/api/v1", authRoute);
