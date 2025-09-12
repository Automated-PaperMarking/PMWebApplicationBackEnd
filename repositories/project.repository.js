import supabase from '../supabaseClient.js';

const projectRepository = {
  insertProject: async (projectData) => {
    try {
      const { data, error } = await supabase.rpc('insert_project', {
        module_code: projectData.moduleCode,
        module_name: projectData.moduleName,
        user_id: projectData.userId
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Repository Error:', error);
      throw error;
    }
  }
};

export { projectRepository };
