import express from "express";
import {
  createTask,
  getAllUserTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/task").post(verifyJWT, createTask);
router.route("/getAllTasks").post(verifyJWT, getAllUserTasks);
router.route("/task/:taskId").put(updateTask);
router.route("/deleteTask").delete(deleteTask);

export default router;
