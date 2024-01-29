const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
  getUserTasks
} = require("../controllers/tasks");

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/usertasks", getUserTasks);
router.get("/:id", getSingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;