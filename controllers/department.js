const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const departments = await mongodb.getDb().db().collection('departments').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department records', error });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid department ID to find a department.' });
    }
    const userId = new ObjectId(req.params.id);
    const department = await mongodb.getDb().db().collection('departments').findOne({ _id: userId });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department record', error });
  }
};

const createDepartment = async (req, res) => {
  try {
    const department = {
      name: req.body.name,
      head: req.body.head,
      employees_count: req.body.employees_count,
      contact_email: req.body.contact_email,
      createdAt: new Date()
    };
    const response = await mongodb.getDb().db().collection('departments').insertOne(department);
    if (response.acknowledged) {
      return res.status(201).json({ message: 'Department created successfully', departmentId: response.insertedId });
    }
    res.status(500).json({ message: 'Some error occurred while creating the department.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const updateDepartment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid department ID to update a department.' });
    }
    const userId = new ObjectId(req.params.id);
    const department = {
      name: req.body.name,
      head: req.body.head,
      employees_count: req.body.employees_count,
      contact_email: req.body.contact_email,
      createdAt: new Date()
    };
    const response = await mongodb.getDb().db().collection('departments').replaceOne({ _id: userId }, department);
    if (response.modifiedCount > 0) {
      return res.status(200).json({ message: 'Department updated successfully' });
    }
    res.status(404).json({ message: 'Department not found or no changes made' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating department record', error });
  }
};


// Delete Department
const deleteDepartment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid department ID to delete a department.' });
    }
 
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('departments').deleteOne({ _id: userId });
    
    if (response.deletedCount > 0) {
      return res.status(200).json({ message: 'Department deleted successfully.' });
    } else {
      return res.status(404).json({ message: 'Department not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Some error occurred while deleting the department.', error });
  }
};


module.exports = {
  getAll,
  getSingle,
  createDepartment,
  updateDepartment,
  deleteDepartment
};

