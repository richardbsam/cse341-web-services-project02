const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Staff API'
  },
  host: 'localhost:5000', // Updated host for local development
  schemes: ['http'] // Using HTTP instead of HTTPS for localhost
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./server.js'); // Ensure this matches your server entry file
// });
