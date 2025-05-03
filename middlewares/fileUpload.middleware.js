import fileUpload from 'express-fileupload';

export const uploadOptions = {
  useTempFiles: true,
  tempFileDir: './tmp/',
  createParentPath: true,
};

export const excelFileValidator = (req, res, next) => {
  if (!req.files?.excel) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const { excel } = req.files;
  if (excel.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    fs.unlinkSync(excel.tempFilePath);
    return res.status(400).json({ error: "Invalid file type. Please upload an Excel file." });
  }

  // Add documentId to request for socket notification
  req.documentId = req.body.documentId || 'default';+
  
  next();
};