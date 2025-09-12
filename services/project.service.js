import { projectRepository } from '../repositories/project.repository.js';

const createProject = async (projectData) => {
  // Basic validation, expand as needed
  if (!projectData.moduleCode || !projectData.moduleName || !projectData.userId) {
    throw new Error('Missing required project fields');
  }
  // Call repository layer
  return await projectRepository.insertProject(projectData);
};

export { createProject };
