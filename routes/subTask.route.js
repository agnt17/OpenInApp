import express from "express";
import {
  createSubTask,
  getAllUserSubTasks,
  updateSubTask,
  deleteSubTask,
} from "../controllers/subTask.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.route("/task/subtask").post(verifyJWT, createSubTask);

router.route("/getAllTasks/getAllSubTasks").post(getAllUserSubTasks);

router.route("/task/updateSubTask/:subtaskId").put(updateSubTask);

router.route("/deleteSubTasks").delete(deleteSubTask);

export default router;
