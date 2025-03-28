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



