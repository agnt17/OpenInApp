import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Please log in to create tasks." });
  }

  const { title, description, due_date, taskId } = req.body;
  const userId = req.user._id;

  try {
    const task = new Task({
      title,
      taskId,
      description,
      due_date,
      userId: userId,
    });

    await task.save();
    res.status(201).json({ task });
    console.log("Task successfully created!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
    console.log("Server side error!!");
  }
};

// Get All User Tasks
export const getAllUserTasks = async (req, res) => {
  const userId = req.user._id;

  try {
    const tasks = await Task.find({ userId });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error1" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  // const userId = req.user._id; // Assuming taskId is passed as a route parameter
  const taskId = req.params;
  const { due_date, status } = req.body; // Extracting due_date and status from request body

  try {
    const task = await Task.findByIdAndUpdate(
      taskId, // Use taskId to identify the task to update
      { $set: { due_date, status } }, // Update due_date and status
      { new: true } // Return the updated task
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findOneAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
