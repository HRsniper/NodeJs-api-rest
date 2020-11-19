import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

class ProjectController {
  async create(request, response) {
    try {
      const { title, description, tasks } = request.body;

      //                    cria e ja salva
      const project = await Project.create({ title, description, userId: request.userId });

      await Promise.all(
        tasks.map(async (task) => {
          //                  cria e nao salva
          const projectTask = new Task({ ...task, project: project._id });

          await projectTask.save();

          return project.tasks.push(projectTask);
        })
      );

      await project.save();

      return response.status(200).json({ project });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async list(request, response) {
    try {
      const projects = await Project.find().populate(["userId", "tasks"]);

      return response.status(200).json({ projects });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async show(request, response) {
    try {
      const { projectId } = request.params;

      const projects = await Project.findById(projectId).populate("userId");

      return response.status(200).json({ projects });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      const { projectId } = request.params;
      const { title, description, tasks } = request.body;

      const project = await Project.findByIdAndUpdate(
        projectId,
        {
          title,
          description,
        },
        { new: true }
      );

      // remover antes de atualizar
      project.tasks = [];
      // await Task.remove({ project: project._id });
      await Task.deleteMany({ project: project._id });

      await Promise.all(
        tasks.map(async (task) => {
          const projectTask = new Task({ ...task, project: project._id });

          await projectTask.save();

          return project.tasks.push(projectTask);
        })
      );

      await project.save();

      return response.status(200).json({ project });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { projectId } = request.params;

      await Project.findByIdAndDelete(projectId);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export const projectController = new ProjectController();
