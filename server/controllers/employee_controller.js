const PostresClient = require("pg").Client;
const EmployeeModal = require("../models/employee_model");
const Validator = require('./validator');

const pgClient = new PostresClient({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "employee_db",
});

pgClient
    .connect()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Error while connecting to DB: " + err);
    });

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
    try {
        var result = await employeeModal.findById(req.params.id);
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
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function deleteEmployee(req, res) {
    try {
        var result = await employeeModal.delete(req.params.id);
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
    if(!Validator.checkString(data.phone, 10, 10)) {
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
    if(!Validator.checkString(data.pwd, 6, 12)) {
        error['pwd'] = 'Invalid';
    }
    return error;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    insertEmployee,
    deleteEmployee
};