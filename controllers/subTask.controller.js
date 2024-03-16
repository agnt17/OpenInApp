import { SubTask } from "../models/subTask.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createSubTask = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Please log in to create subtasks." });
  }

  const { subTaskId } = req.body;
  const { taskId } = req.body; // Assuming taskId is passed as a route parameter
  const userId = req.user._id; // this the authentication token that we require

  try {
    // Check if the subtask already exists
    const existingSubTask = await SubTask.findOne({
      userId: userId,
      taskId: taskId,
      subTaskId: subTaskId,
    });
    if (existingSubTask) {
      throw new ApiError(400, "Subtask already exists");
    }

    // Create a new subtask
    const subTask = new SubTask({
      userId: userId,
      taskId: taskId,
      subTaskId: subTaskId,
    });

    await subTask.save();
    res.status(201).json({ subTask });
    console.log("Subtask successfully created");
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Server Error" });
  }
};

// Get All User Tasks
export const getAllUserSubTasks = async (req, res) => {
  const taskId = req.body;

  try {
    const subtasks = await SubTask.find({ taskId });
    res.status(200).json({ subtasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error1" });
  }
};

// // Update Task
export const updateSubTask = async (req, res) => {
  const { userId, status } = req.params;

  try {
    const subtask = await SubTask.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!subtask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ subtask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Task
export const deleteSubTask = async (req, res) => {
  const { subtaskId } = req.body;

  try {
    await SubTask.findOneAndDelete(subtaskId);
    res.status(200).json({ message: "SubTask deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
