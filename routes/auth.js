const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/User");
const validation = require("../middlewares/validation");
const tokenHandler = require("../middlewares/tokenHandler");
const userController = require("../controllers/users");

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: ユーザー新規登録
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: ユーザー登録成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: バリデーションエラー
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: ユーザー名が既に存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//ユーザー新規登録API
router.post(
  "/register",
  //【2】 バリデーションチェック
  body("username")
    .isLength({ min: 6 })
    .withMessage("ユーザー名は6文字以上である必要があります"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("パスワードは6文字以上である必要があります"),
  body("confirmPassword")
    .isLength({ min: 6 })
    .withMessage("確認用パスワードは6文字以上である必要があります"),
  //【3】 すでにそのユーザーが存在しているのチェック
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザーは既に使われております");
      }
    });
  }),
  validation.validate,
  userController.register
);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: ユーザーログイン
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: ログイン成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: バリデーションエラー
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 認証失敗
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//ユーザーログイン用API
router.post(
  "/login",
  //【2】 バリデーションチェック
  body("username")
    .isLength({ min: 6 })
    .withMessage("ユーザー名は6文字以上である必要があります"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("ユーザー名は6文字以上である必要があります"),
  validation.validate,
  userController.login
);

/**
 * @swagger
 * /api/v1/verify-token:
 *   post:
 *     summary: JWT認証トークン検証
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: トークン検証成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: 認証失敗
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// JWT認証API
router.post(
  "/verify-token",
  tokenHandler.verifyToken,
  (req, res) => {
    return res.status(200).json({user:req.user})
  }
);


    (module.exports = router);