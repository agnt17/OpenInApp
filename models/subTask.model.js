import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    taskId:{
      type: String,
      ref: "Task",
      required: true,
    },
    subTaskId: { type: String, required: true },
    status: { type: Number, enum: [0, 1], default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

export const SubTask = mongoose.model("SubTask", subTaskSchema);
