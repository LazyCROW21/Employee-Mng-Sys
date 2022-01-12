const DepartmentModal = require("../models/department_model");
const Validator = require('./validator');
const pgClient = require('../config/dbconfig');


const departmentModal = new DepartmentModal(pgClient);

async function getAllDepartments(req, res) {
    try {
        var result = await departmentModal.findAll();
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        // console.table(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getDepartmentById(req, res) {
    if(isNaN(req.params.id)) {
        res.status(400).json({error: 'Invalid ID'});
        return;
    }
    try {
        var result = await departmentModal.findById(req.params.id);
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        // console.table(result.rows);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function insertDepartment(req, res) {
    try {
        let error = chkDepartmentData(req.body);
        if(Object.keys(error).length != 0) {
            res.status(400).json(error);
            return;
        }
        var result = await departmentModal.insert(req.body);
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        // console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function updateDepartment(req, res) {
    if(isNaN(req.params.id)) {
        res.status(400).json({error: 'Invalid ID'});
        return;
    }
    try {
        let error = updChkDeptData(req.body);
        if(Object.keys(error).length != 0) {
            res.status(400).json(error);
            return;
        }
        var result = await departmentModal.update(req.params.id, req.body);
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        // console.log(result);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function deleteDepartment(req, res) {
    if(isNaN(req.params.id)) {
        res.status(400).json({error: 'Invalid ID'});
        return;
    }
    try {
        var result = await departmentModal.delete(req.params.id);
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        // console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

function chkDepartmentData(data) {
    let error = {};
    if(!Validator.checkString(data.dept_name, 1, 128)) {
        error['dept_name'] = 'Invalid';
    }
    return error;
}

function updChkDeptData(data) {
    let error = {};
    if(data.dept_name) {
        if(!Validator.checkString(data.dept_name, 1, 128)) {
            error['dept_name'] = 'Invalid';
        }
    }
    return error;
}

module.exports = {
    getAllDepartments,
    getDepartmentById,
    insertDepartment,
    deleteDepartment,
    updateDepartment
};