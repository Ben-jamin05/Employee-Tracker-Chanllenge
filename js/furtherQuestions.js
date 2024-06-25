const inquirer = require('inquirer');
const queries = require('./queryHandler.js');

async function addDepartmentinq() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the department?", 
                name: "newDep",
            },
        ])
        .then((data) => {
            newDepartment = data.newDep;
            queries.addDepartment(newDepartment);
        });
    }

async function addRoleinq() {
    let departmentList = await queries.displayDepartments();
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the role?", 
                name: "newRol",
            },
            {
                type: 'input',
                message: "What is the salary of the role?", 
                name: "rolSalary",
            },
            {
                type: 'list',
                message: "Which department does the role belong to?", 
                name: "rolDep",
                choices: departmentList,
            },
        ])
        .then((data) => {
            console.log(data);
        });
    }

async function addEmployeeinq() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "?", 
                name: "newRol",
            },
            {
                type: 'input',
                message: "", 
                name: "rolSalary",
            },
            {
                type: 'list',
                message: "?", 
                name: "rolDep",
                choices: departmentList,
            },
        ])
        .then((data) => {
            console.log(data);
        });
    }

//addDepartmentinq();
//addRoleinq();

module.exports = {addDepartmentinq, addRoleinq};