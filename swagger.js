const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Company Management API',
    description: 'API Documentation for Departments and Staff'
  },
  host: 'cse341-web-services-project02-1.onrender.com', // Updated host for local development
  schemes: ['https'] // Using HTTP instead of HTTPS for localhost
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
await import('./server.js'); // Ensure this matches your server entry file
});
