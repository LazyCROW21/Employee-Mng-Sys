const DeptDesgModal = require("../models/dept_desg_model");
const Validator = require('./validator');
const pgClient = require('../config/dbconfig');


const deptDesgModal = new DeptDesgModal(pgClient);

async function getAllDeptDesgs(req, res) {
    try {
        var result = await deptDesgModal.findAll();
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        console.table(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getDeptDesgById(req, res) {
    if(isNaN(req.params.id)) {
        res.status(400).json({error: 'Invalid ID'});
        return;
    }
    try {
        var result = await deptDesgModal.findById(req.params.id);
        if(!result) {
            res.status(400).json({error: 'Invalid Data / DB error'});
            return;
        }
        console.table(result.rows);
        res.json(result.rows[0]);
    } catch {
        console.error(err);
        res.sendStatus(500);
    }
}

async function insertDeptDesg(req, res) {
    try {
        let error = chkDeptDesgData(req.body);
        if(Object.keys(error).length != 0) {
            res.status(400).json(error);
            return;
        }
        var result = await deptDesgModal.insert(req.body);
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

async function updateDeptDesg(req, res) {
    if(isNaN(req.params.id)) {
        res.status(400).json({error: 'Invalid ID'});
        return;
    }
    try {
        let error = updChkDeptDesgData(req.body);
        if(Object.keys(error).length != 0) {
            res.status(400).json(error);
            return;
        }
        var result = await deptDesgModal.update(req.params.id, req.body);
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

async function deleteDeptDesg(req, res) {
    if(isNaN(req.params.id)) {
        res.status(400).json({error: 'Invalid ID'});
        return;
    }
    try {
        var result = await deptDesgModal.delete(req.params.id);
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

function chkDeptDesgData(data) {
    let error = {};
    if(!Validator.checkID(data.dept_id)) {
        error['dept_id'] = 'Invalid';
    }
    if(!Validator.checkString(data.designation, 1, 64)) {
        error['designation'] = 'Invalid';
    }
    return error;
}

function updChkDeptDesgData(data) {
    let error = {};
    if(('dept_id' in data) && !Validator.checkID(data.dept_id)) {
        error['dept_id'] = 'Invalid';
    }
    if(('designation' in data) && !Validator.checkString(data.designation, 1, 64)) {
        error['designation'] = 'Invalid';
    }
    return error;
}


module.exports = {
    getAllDeptDesgs,
    getDeptDesgById,
    insertDeptDesg,
    deleteDeptDesg,
    updateDeptDesg
};