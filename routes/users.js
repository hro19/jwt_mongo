const express = require("express");
const router = express.Router();
const {
    getAllUser,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
} = require("../controllers/users");

router.get("/", getAllUser);
router.post("/", createTask);
router.get("/:id", getSingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;