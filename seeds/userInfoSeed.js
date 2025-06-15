const mongoose = require("mongoose");
const connectDB = require("../db/connect");
const User = require("../models/User");
const UserInfo = require("../models/userInfo");
require("dotenv").config();

const seedUserInfo = async () => {
  try {
    await connectDB(process.env.DB_URI);
    console.log("データベースと接続しました");

    // 既存のuser_infoデータを削除
    await UserInfo.deleteMany({});
    console.log("既存のuser_infoデータを削除しました");

    // usernameでユーザーを検索
    const userA = await User.findOne({ username: "aaaaaa" });
    const userB = await User.findOne({ username: "bbbbbb" });

    if (!userA || !userB) {
      console.error("ユーザーが見つかりません。先にユーザーを作成してください。");
      process.exit(1);
    }

    // サンプルuser_infoデータ
    const userInfos = [
      {
        userId: userA._id,
        fullName: "山田 太郎",
        age: 30,
        address: "東京都新宿区",
        introduction: "こんにちは、山田太郎です。趣味は読書とジョギングです。よろしくお願いします。",
      },
      {
        userId: userB._id,
        fullName: "佐藤 花子",
        age: 25,
        address: "大阪府大阪市",
        introduction: "佐藤花子です。カフェ巡りと映画鑑賞が好きです。お気軽にフォローしてください。",
      },
    ];

    const inserted = await UserInfo.insertMany(userInfos);
    console.log(`${inserted.length}件のuser_infoを作成しました`);
    process.exit(0);
  } catch (error) {
    console.error("Seedデータの作成中にエラーが発生しました:", error);
    process.exit(1);
  }
};

seedUserInfo(); 