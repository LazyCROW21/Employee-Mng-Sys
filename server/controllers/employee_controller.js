const PostresClient = require("pg").Client;
const EmployeeModal = require("../models/employee_model");

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
        var result = await employeeModal.insert(req.body);
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    insertEmployee
};