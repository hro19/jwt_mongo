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
            completed: {
              type: 'boolean',
              default: false,
              description: '完了ステータス',
            },
            userId: {
              type: 'string',
              description: 'ユーザーID',
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