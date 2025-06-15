const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'JWT認証とMongoDBを使用したタスク管理API',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: '開発サーバー'
      },
      {
        url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://your-deployment-url.vercel.app',
        description: '本番サーバー'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'ユーザーID',
            },
            username: {
              type: 'string',
              minLength: 6,
              description: 'ユーザー名（6文字以上）',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'パスワード（6文字以上）',
              writeOnly: true
            }
          }
        },
        Task: {
          type: 'object',
          required: ['name', 'userId'],
          properties: {
            _id: {
              type: 'string',
              description: 'タスクID',
            },
            name: {
              type: 'string',
              maxLength: 20,
              description: 'タスク名（20文字まで）',
            },
            completedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: '完了日時（nullの場合は未完了）',
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: '期日（日付と時間）',
            },
            priority: {
              type: 'string',
              enum: ['低', '中', '高'],
              default: '中',
              description: '優先度',
            },
            description: {
              type: 'string',
              maxLength: 500,
              description: 'タスクの詳細説明（500文字まで）',
            },
            userId: {
              type: 'string',
              description: 'ユーザーID',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: '作成日時（自動生成）',
              readOnly: true
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: '更新日時（自動生成）',
              readOnly: true
            }
          }
        },
        TaskCreate: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              maxLength: 20,
              description: 'タスク名（20文字まで）',
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: '期日（ISO 8601形式: 2024-01-25T15:00:00Z）',
            },
            priority: {
              type: 'string',
              enum: ['低', '中', '高'],
              default: '中',
              description: '優先度',
            },
            description: {
              type: 'string',
              maxLength: 500,
              description: 'タスクの詳細説明（500文字まで）',
            }
          }
        },
        TaskUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              maxLength: 20,
              description: 'タスク名（20文字まで）',
            },
            completedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: '完了日時（完了時に現在時刻を設定、未完了にする場合はnull）',
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: '期日（ISO 8601形式）',
            },
            priority: {
              type: 'string',
              enum: ['低', '中', '高'],
              description: '優先度',
            },
            description: {
              type: 'string',
              maxLength: 500,
              description: 'タスクの詳細説明（500文字まで）',
            }
          }
        },
        UserRegister: {
          type: 'object',
          required: ['username', 'password', 'confirmPassword'],
          properties: {
            username: {
              type: 'string',
              minLength: 6,
              description: 'ユーザー名（6文字以上）',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'パスワード（6文字以上）',
            },
            confirmPassword: {
              type: 'string',
              minLength: 6,
              description: '確認用パスワード（6文字以上）',
            }
          }
        },
        UserLogin: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              minLength: 6,
              description: 'ユーザー名（6文字以上）',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'パスワード（6文字以上）',
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT認証トークン',
            },
            user: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'エラーメッセージ',
            }
          }
        },
        UserInfo: {
          type: 'object',
          required: ['userId'],
          properties: {
            _id: {
              type: 'string',
              description: 'user_infoのID',
            },
            userId: {
              type: 'string',
              description: 'ユーザーID（UserのObjectId）',
            },
            fullName: {
              type: 'string',
              description: '氏名',
            },
            age: {
              type: 'integer',
              description: '年齢',
            },
            address: {
              type: 'string',
              description: '住所',
            },
            introduction: {
              type: 'string',
              description: '紹介文',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: '作成日時',
              readOnly: true
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: '更新日時',
              readOnly: true
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'], // ルートファイルからコメントを読み取り
};

const specs = swaggerJSDoc(options);

module.exports = specs; 