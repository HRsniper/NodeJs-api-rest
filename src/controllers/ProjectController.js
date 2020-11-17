import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

class ProjectController {
  async create(request, response) {
    try {
      const project = await Project.create(request.body);

      return response.status(200).json({ project });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async list(request, response) {
    try {
      return response.status(200).json({ userId: request.userId });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async show(request, response) {
    try {
      return response.status(200).json({ userId: request.userId });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      return response.status(200).json({ userId: request.userId });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      return response.status(200).json({ userId: request.userId });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export const projectController = new ProjectController();
