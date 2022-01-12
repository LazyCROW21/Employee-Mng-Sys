const EmployeeModal = require("../models/employee_model");
const pgClient = require('../config/dbconfig');
const Validator = require('./validator');


const employeeModal = new EmployeeModal(pgClient);

async function getAllEmployees(req, res) {
    try {
        var result = await employeeModal.findAll();
        console.table(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getEmployeeById(req, res) {
    if(isNaN(req.params.id)) {
        res.status(400).json({error: 'Invalid ID'});
        return;
    }
    try {
        var result = await employeeModal.findById(req.params.id);
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        console.table(result.rows);
        res.json(result.rows[0]);
    } catch {
        res.sendStatus(500);
    }
}

async function insertEmployee(req, res) {
    try {
        let error = chkEmployeeData(req.body);
        if(Object.keys(error).length != 0) {
            res.status(400).json(error);
            return;
        }
        var result = await employeeModal.insert(req.body);
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function updateEmployee(req, res) {
    if(isNaN(req.params.id)) {
        res.status(400).json({error: 'Invalid ID'});
        return;
    }
    try {
        let error = updChkEmployeeData(req.body);
        if(Object.keys(error).length != 0) {
            res.status(400).json(error);
            return;
        }
        var result = await employeeModal.update(req.params.id, req.body);
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        console.log(result);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function deleteEmployee(req, res) {
    if(isNaN(req.params.id)) {
        res.status(400).json({error: 'Invalid ID'});
        return;
    }
    try {
        var result = await employeeModal.delete(req.params.id);
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

function chkEmployeeData(data) {
    let error = {};
    if(!Validator.checkString(data.first_name, 1, 64)) {
        error['first_name'] = 'Invalid';
    }
    if(!Validator.checkString(data.last_name, 1, 64)) {
        error['last_name'] = 'Invalid';
    }
    if(!Validator.checkPhone(data.phone)) {
        error['phone'] = 'Invalid';
    }
    if(!Validator.checkEmail(data.email)) {
        error['email'] = 'Invalid';
    }
    if(!Validator.checkID(data.dept_id)) {
        error['dept_id'] = 'Invalid';
    }
    if(!Validator.checkID(data.designation_id)) {
        error['designation_id'] = 'Invalid';
    }
    if(!Validator.checkID(data.salary)) {
        error['salary'] = 'Invalid';
    }
    // if(!Validator.checkString(data.pwd, 6, 12)) {
    //     error['pwd'] = 'Invalid';
    // }
    return error;
}

function updChkEmployeeData(data) {
    let error = {};
    if(('first_name' in data) && !Validator.checkString(data.first_name, 1, 64)) {
        error['first_name'] = 'Invalid';
    }
    if(('last_name' in data) && !Validator.checkString(data.last_name, 1, 64)) {
        error['last_name'] = 'Invalid';
    }
    if(('phone' in data) && !Validator.checkPhone(data.phone)) {
        error['phone'] = 'Invalid';
    }
    if(('email' in data) && !Validator.checkEmail(data.email)) {
        error['email'] = 'Invalid';
    }
    if(('dept_id' in data) && !Validator.checkID(data.dept_id)) {
        error['dept_id'] = 'Invalid';
    }
    if(('designation_id' in data) && !Validator.checkID(data.designation_id)) {
        error['designation_id'] = 'Invalid';
    }
    if(('salary' in data) && !Validator.checkID(data.salary)) {
        error['salary'] = 'Invalid';
    }
    // if(('pwd' in data) && !Validator.checkString(data.pwd, 6, 12)) {
    //     error['pwd'] = 'Invalid';
    // }
    return error;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    insertEmployee,
    deleteEmployee,
    updateEmployee
};