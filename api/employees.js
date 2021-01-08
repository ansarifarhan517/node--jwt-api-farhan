const express = require('express');
const jsonEmployees = require('../data/employees.json');
const router = express.Router();

let employees = jsonEmployees;

router.get('/', (req, res) => {
    res.json(employees)
});

router.get('/:id', (req, res) => {
    const employee = employees.find(i => i.Id === +req.params.id)
    if (employee) {
        res.json(employee);
    }
    else {
        res.status(404).json({ message: 'record not found' });
    }
});
router.post('/', (req, res) => {
    const employee = req.body;
    if (employee) {
        employee.Id = Math.max(...employees.map(i => i.Id)) + 1;
        employees.push(employee);
        res.json(employee);
    }
    else {
        res.status(502).json({ message: 'Record is invalid' });
    }
});

router.put('/:id', (req, res) => {
    const index = employees.findIndex(i => i.Id === parseInt(req.params.id));
    const employee = employees[index];
    if (employee) {
        employees[index] = { ...employee, ...req.body };
        res.json(employees[index]);
    } else {
        res.status(404).json({
            message: 'Record not found'
        });
    }

});



router.delete('/:id', (req, res) => {
    const index = employees.findIndex(i => i.Id === parseInt(req.params.id));
    const employee = employees[index];
    if (index !== -1) {
        employees.splice(index, 1);
        res.json(employee);
    }
    else {
        res.status(404).json({ message: 'Record not found' });
    }
});

module.exports = router;