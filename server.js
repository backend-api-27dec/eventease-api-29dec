const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/events');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');  // Importing cors middleware

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Enable CORS
app.use(cors());  // Use the cors middleware

// Define Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/events', authMiddleware, eventRoutes); // Event CRUD routes, protected by authMiddleware

// Define a basic route
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
