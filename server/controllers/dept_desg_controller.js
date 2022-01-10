const PostresClient = require("pg").Client;
const DeptDesgModal = require("../models/dept_desg_model");

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

const deptDesgModal = new DeptDesgModal(pgClient);

async function getAllDeptDesgs(req, res) {
    try {
        var result = await deptDesgModal.findAll();
        console.table(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getDeptDesgById(req, res) {
    try {
        var result = await deptDesgModal.findById(req.params.id);
        console.table(result.rows);
        res.json(result.rows[0]);
    } catch {
        console.error(err);
        res.sendStatus(500);
    }
}

async function insertDeptDesg(req, res) {
    try {
        var result = await deptDesgModal.insert(req.body);
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function deleteDeptDesg(req, res) {
    try {
        var result = await deptDesgModal.delete(req.params.id);
        console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllDeptDesgs,
    getDeptDesgById,
    insertDeptDesg,
    deleteDeptDesg
};