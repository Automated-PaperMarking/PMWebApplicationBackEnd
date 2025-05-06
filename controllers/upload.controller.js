import { processExcelUpload as processBookUpload} from '../services/upload.service.js';
import { processExcelUpload as processStudentUpload} from '../services/studentXCLupload.service.js';

export const uploadExcel = async (req, res, next) => {
  try {
    let processor;

    // Use req.originalUrl to decide which upload logic to use
    if (req.originalUrl.includes('/upload-studentXCL')) {
      processor = processStudentUpload;
    } else {
      processor = processBookUpload;
    }

    const { successData, errorData, stats } = await processor(req.files.excel);
    
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