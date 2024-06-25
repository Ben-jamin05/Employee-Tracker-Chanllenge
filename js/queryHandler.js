const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool(
    {
      user: "postgres",
      password: process.env.DB_PASSWORD,
      host: "127.0.0.1",
      database: "employee_db",
    },
    console.log("Connected to the employee_db database!")
);

//const client = pool.connect();

async function displayEmployees() {
    const res = await pool.query('SELECT * FROM employee');
    //console.log(res.rows);
    return res.rows;
}

async function displayRoles() {
    const res = await pool.query('SELECT * FROM role');
    //console.log(res.rows);
    return res.rows;
}

async function displayDepartments() {
    const res = await pool.query('SELECT name FROM department');
    let depList = [];
    for (let i = 0;  i < res.rows.length; i++) {
        depList.push(res.rows[i].name);
    }
    //console.log(depList);
    return depList;
}

async function addEmployee(data) {
    const text = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)';
    const values = [data]; //need to convert data into list once I figure out syntax and what I need
    const res = await pool.query(text, values);
    console.log(res)
    //return res;
}

async function addRole(data) {
    const text = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)';
    const values = [data]; //need to convert data into list once I figure out syntax and what I need
    const res = await pool.query(text, values);
    console.log(res)
    //return res;
}

async function addDepartment(data) {
    const text = 'INSERT INTO department(name) VALUES($1)';
    const values = [data];
    const res = await pool.query(text, values);
    //console.log(res)
    return res;
}

//displayDepartments();


module.exports = {displayEmployees, displayRoles, displayDepartments, addDepartment}