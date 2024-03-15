import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    due_date: { type: String, required: true },
    status: {
      type: String,
      enum: ["TODO", "DONE"],
      default: "TODO",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
