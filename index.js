import express from 'express';
import supabase from './supabaseClient.js';

import fileUpload from 'express-fileupload';

const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

const uploadOpts = {
    useTempFiles: true,
    tempFileDir: './tmp/',
    createParentPath: true,
};
import XLSX from 'xlsx';
import fs from 'fs';
import { fail } from 'assert';

app.post('/upload', fileUpload(uploadOpts), async (req, res) => {
    if (!req.files?.excel) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    const { excel } = req.files;

    try {
        // Validate file type
        if (excel.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            fs.unlinkSync(excel.tempFilePath); // Delete temp file
            return res.status(400).json({ error: "Invalid file type. Please upload an Excel file." });
        }

        // Process Excel file
        const workbook = XLSX.readFile(excel.tempFilePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const successData = [];
        const errorData = [];

        for (const row of data) {
            try {
                // Map Excel columns to database columns
                const { 
                    Name: name, 
                    Author: author, 
                    Description: description, 
                    Price: price 
                } = row;

                // Insert into Supabase
                const { data: result, error } = await supabase
                    .from('books')
                    .insert([{ 
                        name, 
                        author, 
                        description, 
                        price 
                    }])
                    .select();

                if (error) throw error;

                successData.push(result[0]);
            } catch (error) {
                errorData.push({
                    row,
                    error: error.message,
                    supabaseDetails: error.details || error.hint  // Additional debug info
                });
            }
        }

        // Cleanup
        fs.unlinkSync(excel.tempFilePath);

        // Response
        res.json({
            message: "Upload processed",
            stats: {
                total: data.length,
                success: successData.length,
                failed: errorData.length
            },
            successData,
            errorData
        });

    } catch (error) {
        console.error("Upload failed:", error);
        if (req.files?.excel?.tempFilePath) {
            fs.unlinkSync(req.files.excel.tempFilePath);
        }
        res.status(500).json({ 
            error: "Server error",
            details: error.message 
        });
    }
});

app.use(fileUpload(uploadOpts));

// Function to check the connection to the database
const checkDatabaseConnection = async () => {
    try {
        // Call the custom "check_connection" function
        const { data, error } = await supabase.rpc('check_connection');
        
        if (error) {
            console.error('Error connecting to the database:', error.message);
            return false; // Connection failed
        }

        console.log('Database connected successfully:', data);
        return true;  // Connection successful
    } catch (err) {
        console.error('Error checking database connection:', err.message);
        return false;  // Connection failed
    }
};

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Check database connection when the server starts
    const isConnected = await checkDatabaseConnection();
    if (isConnected) {
        console.log('Backend connected to the database successfully!');
    } else {
        console.log('Failed to connect to the database.');
    }
});