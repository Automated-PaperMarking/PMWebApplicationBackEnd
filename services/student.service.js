import { studentRepository } from "../repositories/student.repository.js";
import {Parser} from "json2csv";
import PDFDocument from 'pdfkit';

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
    exportStudentPDF: async () => {
        try {
            const students = await studentRepository.exportStudent();
            const doc = new PDFDocument();
            const buffers = [];
    
            doc.on('data', buffers.push.bind(buffers)); //Collects PDF data chunks in the buffers array as the document is generated.
    
            // PDF Content
            doc.fontSize(18).text('Student List', { align: 'center' });
            doc.moveDown();
    
            // Table Headers
            doc.font('Helvetica-Bold')
            .text('RegNo', 50, 100)
            .text('Name', 200, 100)
            .text('Batch', 350, 100)
            .text('Username', 450, 100);
            
            // Student Data Rows
            let y = 130;
            students.forEach(student => {
            doc.font('Helvetica')
                .text(student.regno, 50, y)
                .text(student.name, 200, y)
                .text(student.batch, 350, y)
                .text(student.username, 450, y);
            y += 30;
            });
    
            doc.end();

            return new Promise((resolve) => {
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            });
        }catch (error) {
            console.error('Service Error:', error);
            throw error;
        }
    },

};

export {studentService};