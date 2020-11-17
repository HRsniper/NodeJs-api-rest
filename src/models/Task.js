import mongoose from "../database/index.js";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  completed: { type:Boolean,required: true,default: false},
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now() },
});

export const Task = mongoose.model("Task", TaskSchema);
