import { insertBook } from '../repositories/book.repository.js';
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
      const bookData = {
        name: row.Name,
        author: row.Author,
        description: row.Description?.toString() || null,
        price: parseFloat(row.Price) || null
      };

      const inserted = await insertBook(bookData);
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