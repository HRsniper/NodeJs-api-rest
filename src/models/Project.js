import mongoose from "../database/index.js";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  created_at: { type: Date, default: Date.now() },
});

export const Project = mongoose.model("Project", ProjectSchema);
