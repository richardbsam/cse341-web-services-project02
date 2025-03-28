const validator = require('../helpers/validate');

const validateStaff = (req, res, next) => {
  const validationRule = {
    name: 'required|string|min:3|max:50',
    email: 'required|email',
    phone: 'required|string|min:10|max:15',
    position: 'required|string|min:3|max:50',
    salary: 'required|numeric|min:0',
    hireDate: 'required|date',
    departmentId: 'required|string',
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err,
      });
    }
    next();
  });
};

const validateDepartment = (req, res, next) => {
  const validationRule = {
    _id: 'string|regex:/^[a-fA-F0-9]{24}$/', // Optional since MongoDB generates it
    name: 'required|string|min:3|max:50',
    head: 'required|string|min:3|max:50',
    employees_count: 'required|numeric|min:0',
    projects: 'array',
    'projects.*': 'string|min:3|max:100',
    tools_used: 'array',
    'tools_used.*': 'string|min:3|max:100',
    contact_email: 'required|email',
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err,
      });
    }
    next();
  });
};

module.exports = {
  validateStaff,
  validateDepartment,
};
