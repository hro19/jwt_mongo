const express = require("express");
const router = express.Router();
const { updateUserInfo } = require("../controllers/userInfo");

/**
 * @swagger
 * /api/v1/user-info/{id}:
 *   put:
 *     summary: userInfoの編集
 *     tags: [UserInfo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: userInfoのID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     responses:
 *       200:
 *         description: 編集成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfo'
 *       404:
 *         description: userInfoが見つかりません
 *       500:
 *         description: サーバーエラー
 */
router.put("/:id", updateUserInfo);

module.exports = router; 