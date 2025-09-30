import supabase from '../supabaseClient.js';

const assessmentRepository = {
    create_assessment: async (assessmentData) => {
        try {
            const { data, error } = await supabase.rpc('insert_assessment', {
                p_moduleid: assessmentData.module_id,
                p_user_id: assessmentData.user_id ,
                p_title: assessmentData.title,
                p_type: assessmentData.type,
                p_created_at: assessmentData.created_at,
                p_deadline: assessmentData.deadline,
                p_allocatedtime: assessmentData.allocatedtime,
                p_maximummarks: assessmentData.maximummarks,
                p_enrollment_key: assessmentData.enrollment_key
            });
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating assessment:', error);
            throw error;
        }
    },
};

export { assessmentRepository };