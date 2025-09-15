import { createProject } from '../services/project.service.js';

const createProjectController = async (req, res) => {
  try {
    const { moduleCode, moduleName } = req.body;
    const userId = req.user.userid; // Extracted from JWT
    const role = req.user.role;
    if (role !== 'Admin' && role !== 'Teacher' && role !== 'Instructor') {
      return res.status(403).json({ error: 'Insufficient permissions to create a project.' });
    }
    const project = await createProject({ moduleCode, moduleName, userId });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createProjectController };
