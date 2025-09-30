import { assessmentRepository } from "../repositories/assessment.repository.js";

const assessmentService = {
    createAssessment: async (assessmentData) => {
        try {
            if (!assessmentData.module_id || !assessmentData.user_id || !assessmentData.title || !assessmentData.type) {
                throw new Error('Missing required assessment fields');
            }
            const result = await assessmentRepository.create_assessment(assessmentData);
            return result;
        } catch (error) {
            console.error('Error creating assessment:', error);
            throw error;
        }
    },
};

export { assessmentService };