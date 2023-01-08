const express = require("express");
const router = express.Router();
const {
  allTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../controller/todo");

const authenticateToken = require("../validators/token");

router.route("/").get(authenticateToken,allTodos);

router.route("/").post(authenticateToken, addTodo);
router.route("/delete").get(authenticateToken, deleteTodo);
router.route("/update").get(authenticateToken, updateTodo);



module.exports = router;
