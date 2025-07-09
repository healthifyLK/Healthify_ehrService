const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5001;

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Start the Server
app.listen(PORT, () => {
    console.log(`EHR Proxy Server is running on port ${PORT}`);
})