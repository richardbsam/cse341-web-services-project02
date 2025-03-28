const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const mongodb = require('./db/connect');
const routes = require('./routes/index'); // Import routes once

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use('/', routes); // Use routes correctly

process.on(`uncaughtException`, (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// Initialize DB and Start Server
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // Exit process on DB failure
  } else {
    app.listen(port, () => {
      console.log(`✅ Connected to Database and listening on port ${port}`);
    });
  }
});



