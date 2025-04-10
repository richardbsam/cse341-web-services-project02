const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/authenticate');
const departmentController = require('../controllers/department');

// Public routes
router.get('/', departmentController.getAll);       
router.get('/:id', departmentController.getSingle);  

// Protected routes
router.post('/', isAuthenticated, departmentController.createDepartment);  
router.put('/:id', isAuthenticated, departmentController.updateDepartment); 
router.delete('/:id', isAuthenticated, departmentController.deleteDepartment); 

module.exports = router;


