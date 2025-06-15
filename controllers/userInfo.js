const UserInfo = require("../models/userInfo");

// userInfo更新
const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params; // userInfoのid
    const update = req.body;
    // introduction, fullName, age, address などを受け取る
    const updated = await UserInfo.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "userInfoが見つかりません" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "更新中にエラー", error: err });
  }
};

module.exports = { updateUserInfo }; 