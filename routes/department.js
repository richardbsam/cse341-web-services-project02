const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/department');
const validation = require('../middleware/validate');

router.get('/', departmentController.getAll);
router.get('/:id', departmentController.getSingle);

router.post('/', validation.validateDepartment, departmentController.createDepartment); 
router.put('/:id', validation.validateDepartment, departmentController.updateDepartment); 

router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;

