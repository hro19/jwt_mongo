const mongoose = require("mongoose");
const Task = require("../models/Task");
const connectDB = require("../db/connect");
require("dotenv").config();

const seedTasks = async () => {
  try {
    // データベースに接続
    await connectDB(process.env.DB_URI);
    console.log("データベースと接続しました");

    // 既存のタスクデータを削除
    await Task.deleteMany({});
    console.log("既存のタスクデータを削除しました");

    // 実際のユーザーID
    const userIds = [
      "64ca465b59acf1aa11d7152b",
      "6515d9f255fc9067634b246f"
    ];

    // ランダムにuserIdを選択する関数
    const getRandomUserId = () => userIds[Math.floor(Math.random() * userIds.length)];

    // サンプルタスクデータ
    const sampleTasks = [
      {
        name: "プレゼン資料作成",
        dueDate: new Date("2024-01-25T15:00:00Z"),
        priority: "高",
        description: "来週の会議用のプレゼンテーション資料を作成する",
        userId: getRandomUserId(),
      },
      {
        name: "買い物",
        dueDate: new Date("2024-01-22T18:00:00Z"),
        priority: "中",
        description: "夕食の材料を買いに行く",
        userId: getRandomUserId(),
      },
      {
        name: "運動",
        dueDate: new Date("2024-01-21T07:00:00Z"),
        priority: "低",
        description: "30分のジョギング",
        userId: getRandomUserId(),
      },
      {
        name: "レポート提出",
        completedAt: new Date("2024-01-15T10:30:00Z"),
        dueDate: new Date("2024-01-15T23:59:00Z"),
        priority: "高",
        description: "大学のレポートを提出済み",
        userId: getRandomUserId(),
      },
      {
        name: "歯医者予約",
        dueDate: new Date("2024-01-30T14:00:00Z"),
        priority: "中",
        description: "定期検診の予約を取る",
        userId: getRandomUserId(),
      },
      {
        name: "読書",
        completedAt: new Date("2024-01-18T20:00:00Z"),
        dueDate: new Date("2024-01-18T21:00:00Z"),
        priority: "低",
        description: "技術書を1章読了",
        userId: getRandomUserId(),
      },
    ];

    // タスクデータを挿入
    const insertedTasks = await Task.insertMany(sampleTasks);
    console.log(`${insertedTasks.length}件のサンプルタスクを作成しました`);

    // 作成されたタスクを表示
    console.log("\n=== 作成されたタスク一覧 ===");
    insertedTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.name}`);
      console.log(`   期日: ${task.dueDate ? task.dueDate.toLocaleString('ja-JP') : '未設定'}`);
      console.log(`   優先度: ${task.priority}`);
      console.log(`   状態: ${task.completedAt ? '完了' : '未完了'}`);
      console.log(`   説明: ${task.description || '説明なし'}`);
      console.log(`   ユーザーID: ${task.userId}`);
      console.log("---");
    });

    process.exit(0);
  } catch (error) {
    console.error("Seedデータの作成中にエラーが発生しました:", error);
    process.exit(1);
  }
};

seedTasks(); 