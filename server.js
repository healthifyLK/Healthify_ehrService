const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const fhirRoutes = require('./routes/fhir');

dotenv.config();

const PORT = process.env.PORT || 5001;

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/ehr', fhirRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`EHR Proxy Server is running on port ${PORT}`);
})