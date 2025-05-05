import express from 'express';
import fileUpload from 'express-fileupload';
import { uploadOptions, excelFileValidator } from '../middlewares/fileUpload.middleware.js';
import { uploadExcel } from '../controllers/upload.controller.js';

const router = express.Router();

router.post(
  '/upload',
  fileUpload(uploadOptions),
  excelFileValidator,
  uploadExcel
);

router.post(
  '/upload-studentXCL',
  fileUpload(uploadOptions),
  excelFileValidator,
  uploadExcel
);
export default router;