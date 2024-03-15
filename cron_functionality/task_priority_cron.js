import cron from "node-cron";
import { Task } from "../models/task.model.js";

export const updateTaskPriority = async () => {
  try {
    // Get all tasks
    const tasks = await Task.find();

    // Iterate through tasks and update priority based on due_date
    for (const task of tasks) {
      const today = new Date();
      const dueDate = new Date(task.due_date);

      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let priority;
      if (diffDays === 0) {
        priority = 0; // Due date is today
      } else if (diffDays <= 2) {
        priority = 1; // Due date is between tomorrow and day after tomorrow
      } else if (diffDays <= 4) {
        priority = 2; // Due date is within 3-4 days
      } else {
        priority = 3; // Due date is 5 or more days later
      }

      // Update task priority
      await Task.findByIdAndUpdate(task._id, { priority });
    }

    console.log("Task priorities updated successfully.");
  } catch (error) {
    console.error("Error updating task priorities:", error);
  }
};

// Schedule cron job to run daily at midnight (00:00)
cron.schedule("0 0 * * *", updateTaskPriority);
