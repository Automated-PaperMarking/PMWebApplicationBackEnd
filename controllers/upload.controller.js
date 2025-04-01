import { processExcelUpload } from '../services/upload.service.js';

export const uploadExcel = async (req, res, next) => {
  try {
    const { successData, errorData, stats } = await processExcelUpload(req.files.excel);
    
    res.json({
      message: "Upload processed",
      stats,
      successData,
      errorData
    });
  } catch (error) {
    next(error);
  }
};