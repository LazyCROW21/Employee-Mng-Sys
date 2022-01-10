const PostresClient = require("pg").Client;
const DepartmentModal = require("../models/department_model");

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

const departmentModal = new DepartmentModal(pgClient);

async function getAllDepartments(req, res) {
    try {
        var result = await departmentModal.findAll();
        console.table(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getDepartmentById(req, res) {
    try {
        var result = await departmentModal.findById(req.params.id);
        console.table(result.rows);
        res.json(result.rows[0]);
    } catch {
        res.sendStatus(500);
    }
}

async function insertDepartment(req, res) {
    try {
        var result = await departmentModal.insert(req.body);
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllDepartments,
    getDepartmentById,
    insertDepartment
};