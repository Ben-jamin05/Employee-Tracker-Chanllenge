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


async function displayEmployees() {
    const res = await pool.query('SELECT * FROM employee');
    return res.rows;
}

async function getEmployeesNames() {
    const res = await pool.query('SELECT first_name, last_name FROM employee');
    return res.rows;
}

async function displayRoles() {
    const res = await pool.query('SELECT title FROM role');
    let rolList = [];
    for (let i = 0;  i < res.rows.length; i++) {
        rolList.push(res.rows[i].title);
    }
    //console.log(rolList);
    return rolList;
}

async function displayDepartments() {
    const res = await pool.query('SELECT name FROM department');
    let depList = [];
    for (let i = 0;  i < res.rows.length; i++) {
        depList.push(res.rows[i].name);
    }
    return depList;
}

async function addEmployee(data) {
    const text = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)';
    const values = [data];
    const res = await pool.query(text, data);
    //console.log(res)
    return res;
}

async function addRole(data) {
    const text = 'INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3)';
    const values = [data];
    const res = await pool.query(text, data);
    //console.log(res)
    return res;
}

async function addDepartment(data) {
    const text = 'INSERT INTO department(name) VALUES($1)';
    const values = [data];
    const res = await pool.query(text, values);
    //console.log(res)
    return res;
}

async function managerList() {
    const res = await pool.query('SELECT first_name, last_name FROM employee WHERE manager_id = NULL');
    return res.rows;
}

async function updateEmpRole(data) {
    const text = 'UPDATE employee SET role_id = $2 WHERE id = $1';
    const values = [data];
    const res = await pool.query(text, data);
    //console.log(res)
    return res;
}


module.exports = {displayEmployees, displayRoles, displayDepartments,
addDepartment, managerList, getEmployeesNames, addEmployee,
addRole, updateEmpRole
};