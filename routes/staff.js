const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/authenticate');
const staffController = require('../controllers/staff');

// Public routes
router.get('/', staffController.getAll);       
router.get('/:id', staffController.getSingle);  

// Protected routes
router.post('/', isAuthenticated, staffController.createStaff);  
router.put('/:id', isAuthenticated, staffController.updateStaff); 
router.delete('/:id', isAuthenticated, staffController.deleteStaff); 

module.exports = router;





/*
const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staff');
const validation = require('../middleware/validate');

router.get('/', staffController.getAll);
router.get('/:id', staffController.getSingle);
router.post('/', validation.validateStaff, staffController.createStaff); 
router.put('/:id', validation.validateStaff, staffController.updateStaff); 
router.delete('/:id', staffController.deleteStaff);

module.exports = router;

*/


