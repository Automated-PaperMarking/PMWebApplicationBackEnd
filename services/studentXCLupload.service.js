import { studentRepository } from '../repositories/student.repository.js';
import XLSX from 'xlsx';
import fs from 'fs';

export const processExcelUpload = async (excelFile) => {
  const workbook = XLSX.readFile(excelFile.tempFilePath);
  const sheetName = workbook.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const results = {
    successData: [],
    errorData: [],
    stats: {
      total: rows.length,
      success: 0,
      failed: 0
    }
  };

  for (const row of rows) {
    try {
        const regNo = row.RegistrationNo;
        let batch = row.Batch;
        let userName = row.UserName;
        let password = row.Password;
  
        // EG/20XX/XXXX
        const regParts = regNo?.split('/');
        if (regParts?.length === 3) {
          const yearPart = regParts[1];
          const serial = regParts[2];
          const year = parseInt(yearPart.slice(2)); // Get last two digits of the year
  
          // Set batch if not present or invalid
          if (!batch || isNaN(parseInt(batch))) {
            batch = year + 2; // e.g., 20 -> 22
          }
  
          // Set default userName if not provided
          if (!userName) {
            userName = `eg${year}${serial}`;
          }
  
          // Set default password if not provided
          if (!password) {
            password = `Student@${batch}`;
          }
        }
  
        const studentData = {
          name: row.Name,
          regNo: regNo,
          batch: batch,
          userName: userName,
          password: password,
        };
  
        const inserted = await studentRepository.insertStudent(studentData);
        results.successData.push(inserted);
        results.stats.success++;
    } catch (error) {
      results.errorData.push({
        row,
        error: error.message
      });
      results.stats.failed++;
    }
  }

  fs.unlinkSync(excelFile.tempFilePath);
  return results;
};