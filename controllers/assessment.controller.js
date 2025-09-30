import { assessmentService } from "../services/assessment.service.js";

const createAssessmentController = async (req, res) => {
    try {
        const assessmentData = req.body;
        const userId = req.user.userid; // Extracted from JWT
        assessmentData.user_id = userId;
        const role = req.user.role;
        if (role !== 'Admin' && role !== 'Teacher' && role !== 'Instructor') {
        return res.status(403).json({ error: 'Insufficient permissions to create a project.' });
        }
        const result = await assessmentService.createAssessment(assessmentData);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating assessment:', error);
        res.status(500).json({ error: 'Failed to create assessment' });
    }
};

export { createAssessmentController };