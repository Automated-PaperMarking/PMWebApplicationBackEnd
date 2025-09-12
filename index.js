import express from 'express';
import supabase from './supabaseClient.js';
import uploadRoute from './routes/upload.route.js';
import { errorHandler } from './middlewares/error.middleware.js';
import usermanagementRoute from './routes/usermanagement.route.js';
import projectManagementRoute from './routes/project.route.js';
const app = express();

app.use(express.json());

const PORT = 3001 | 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes
app.use('/', uploadRoute);
app.use('/users', usermanagementRoute);
app.use('/projects', projectManagementRoute);

// Error middleware (must be last)
app.use(errorHandler);

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