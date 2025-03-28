const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const staffs = await mongodb.getDb().db().collection('staffs').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff records', error });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid staff ID to find a staff.' });
    }
    const userId = new ObjectId(req.params.id);
    const staff = await mongodb.getDb().db().collection('staffs').findOne({ _id: userId });
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff record', error });
  }
};

const createStaff = async (req, res) => {
  try {
    const staff = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      salary: req.body.salary,
      hireDate: req.body.hireDate,
      departmentId: req.body.departmentId,
      createdAt: new Date()
    };
    const response = await mongodb.getDb().db().collection('staffs').insertOne(staff);
    if (response.acknowledged) {
      return res.status(201).json({ message: 'Staff created successfully', staffId: response.insertedId });
    }
    res.status(500).json({ message: 'Some error occurred while creating the staff.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

const updateStaff = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid staff ID to update a staff.' });
    }
    const userId = new ObjectId(req.params.id);
    const staff = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      position: req.body.position,
      salary: req.body.salary,
      hireDate: req.body.hireDate,
      departmentId: req.body.departmentId,
      updatedAt: new Date()
    };
    const response = await mongodb.getDb().db().collection('staffs').replaceOne({ _id: userId }, staff);
    if (response.modifiedCount > 0) {
      return res.status(200).json({ message: 'Staff updated successfully' });
    }
    res.status(404).json({ message: 'Staff not found or no changes made' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff record', error });
  }
};


// Delete Staff
const deleteStaff = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid staff ID to delete a staff.' });
    }
    
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('staffs').deleteOne({ _id: userId });
    
    if (response.deletedCount > 0) {
      return res.status(200).json({ message: 'Staff deleted successfully.' });
    } else {
      return res.status(404).json({ message: 'Staff not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Some error occurred while deleting the staff.', error });
  }
};


module.exports = {
  getAll,
  getSingle,
  createStaff,
  updateStaff,
  deleteStaff
};

