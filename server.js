const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const invoiceRoutes = require('./routes/invoiceRoutes');

// Use Routes
app.use('/api/invoices', invoiceRoutes);

// Database Connection


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
