import { createProject } from '../services/project.service.js';

const createProjectController = async (req, res) => {
  try {
    const { moduleCode, moduleName } = req.body;
    const userId = req.user.userid; // Extracted from JWT
    const project = await createProject({ moduleCode, moduleName, userId });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createProjectController };
