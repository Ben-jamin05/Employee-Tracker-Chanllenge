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

const client = await pool.connect();

async function displayEmployees() {
    const res = await client.query('SELECT * FROM employee');
    console.log(res)
    //return res;
}

async function displayRoles() {
    const res = await client.query('SELECT * FROM role');
    console.log(res)
    //return res;
}

async function displayDepartments() {
    const res = await client.query('SELECT * FROM department');
    console.log(res)
    //return res;
}

async function addEmployee(data) {
    const text = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)'
    const values = [data]; //need to convert data into list once I figure out syntax and what I need
    const res = await client.query('SELECT * FROM department');
    console.log(res)
    //return res;
}


module.exports = {displayEmployees, displayRoles, displayDepartments}