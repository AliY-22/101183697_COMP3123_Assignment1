const express = require('express');
const { body, validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new employee
router.post('/employees', [
    body('email').isEmail(),
    body('salary').isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {
        const newEmployee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee_id: newEmployee._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/employees/:id', async (req, res) => {
    const { id } = req.params; // Get the employee ID from the URL
    const updates = req.body; // Get the updated data from the request body

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully', updatedEmployee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE request to delete an employee by ID
router.delete('/employees/:id', async (req, res) => {
    const { id } = req.params; // Get the employee ID from the URL

    try {
        const result = await Employee.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
