const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB URI (from environment variables or a default)
const dbURI = process.env.MONGO_URI || 'mongodb+srv://karthi276:karth1ck@cluster0.bbxsjow.mongodb.net/sports';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message); // Log just the error message
  });

// Handle deprecation warning with trace (optional)
process.on('warning', (warning) => {
  console.warn(warning.name);    // Print the name of the warning
  console.warn(warning.message); // Print the message of the warning
  console.warn(warning.stack);   // Print the stack trace of the warning
});
