import { studentRepository } from "../repositories/student.repository.js";
import {Parser} from "json2csv";

const studentService = {
    exportStudent: async () => {
        try {
            const students = await studentRepository.exportStudent();
            const fields = ['regno', 'name', 'batch', 'username'];
            const opts = { fields };
            const parser = new Parser(opts);
            const csv = parser.parse(students);
            return csv;
        } catch (error) {
            console.error('Service Error:', error);
            throw error;
        }
    },

};

export {studentService};