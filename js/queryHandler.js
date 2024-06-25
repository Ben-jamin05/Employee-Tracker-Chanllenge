const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool(
    {
      user: "postgres",
      password: process.env.DB_PASSWORD,
      host: "127.0.0.1",
      database: "employee_db",
    },
);

async function connectPool() {
    try {
        await pool.connect();
        console.log("Connected to the database!");
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
}

connectPool();


async function displayEmployees() {
    const res = await pool.query('SELECT * FROM employee');
    return res.rows;
}

async function getEmployeesNames() {
    const res = await pool.query('SELECT * FROM employee');
    let empList = [];
    for (let i = 0;  i < res.rows.length; i++) {
        let firstName = res.rows[i].first_name
        let lastName = res.rows[i].last_name
        empList.push(firstName + ' ' + lastName);
    }
    return empList;
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
    const manager = [data[3].split(' ')];
    const managerText = 'SELECT manager_id FROM employee WHERE first_name = $1 AND last_name = $2';
    const managerId = await pool.query(managerText, manager);

    const role = [data[1]];
    const roleText = 'SELECT id FROM role WHERE title = $1'
    const roleId = await pool.query(roleText, role);

    const text = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)';
    const values = [data[0], data[1], roleId.rows[0].id, managerId.rows[0].manager_id];
    const res = await pool.query(text, values);
    //console.log(res)
    return res;
}

async function addRole(data) {
    const department = [data[2]];
    const depText = 'SELECT id FROM department WHERE name = $1'
    const depId = await pool.query(depText, department);

    const text = 'INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3)';
    const values = [data[0], data[1], depId.rows[0].id];
    const res = await pool.query(text, values);
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
    const res = await pool.query('SELECT * FROM employee WHERE manager_id IS NULL');
    let manaList = [];
    for (let i = 0;  i < res.rows.length; i++) {
        firstName = res.rows[i].first_name
        lastName = res.rows[i].last_name
        manaList.push(firstName + ' ' + lastName);
    }
    return manaList;
}

async function updateEmpRole(data) {
    const name = data[0].split(' ');
    const empText = 'SELECT id FROM employee WHERE first_name = $1 AND last_name = $2'
    const empId = await pool.query(empText, name);

    const role = [data[1]];
    const roleText = 'SELECT id FROM role WHERE title = $1'
    const roleId = await pool.query(roleText, role);


    const text = 'UPDATE employee SET role_id = $2 WHERE id = $1';
    const values = [empId.rows[0].id, roleId.rows[0].id];
    const res = await pool.query(text, values);
    //console.log(res)
    return res;
}


module.exports = {displayEmployees, displayRoles, displayDepartments,
addDepartment, managerList, getEmployeesNames, addEmployee,
addRole, updateEmpRole
};