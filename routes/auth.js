const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

//ユーザー新規登録API
router.post(
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

module.exports = router;