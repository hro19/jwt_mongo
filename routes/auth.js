const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/User");
const validation = require("../middlewares/validation");
const userController = require("../controllers/users");

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
  validation.validate,
  userController.register
);

//ユーザーログイン用API
router.post(
  "/login",
  body("username")
    .isLength({ min: 6 })
    .withMessage("ユーザー名は6文字以上である必要があります"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("ユーザー名は6文字以上である必要があります"),
  validation.validate,
  userController.login
);

    
    // ここにユーザーログイン用のAPIの実装を追加することができます

    (module.exports = router);