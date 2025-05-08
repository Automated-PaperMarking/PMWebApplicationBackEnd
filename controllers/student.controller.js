import { studentService } from "../services/student.service.js";

const studentController = {
    exportStudent: async (req, res, next) => {
        try {
            const csvData = await studentService.exportStudent();
            res.setHeader('Content-Type', 'text/csv');  // the browser the response is a CSV file.
            res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
            res.status(200).send(csvData);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

export { studentController };