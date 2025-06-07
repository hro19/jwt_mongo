# Task Manager API

JWT認証とMongoDBを使用したタスク管理API

## 機能

- ユーザー登録・ログイン（JWT認証）
- タスクのCRUD操作
- ユーザー管理
- Swagger UIによるAPIドキュメント

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## API ドキュメント

### Swagger UI

開発環境とデプロイ環境の両方でSwagger UIを使用してAPIドキュメントを確認できます：

- **ローカル環境**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

### API エンドポイント

- **ローカル環境**: [http://localhost:5000/api/v1/tasks](http://localhost:5000/api/v1/tasks) 

## 認証について

ほとんどのAPIエンドポイントはJWT認証が必要です。Swagger UIでは「Authorize」ボタンをクリックして、`Bearer <token>`形式でトークンを設定してください。
