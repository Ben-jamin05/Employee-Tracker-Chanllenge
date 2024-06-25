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
            //console.log(data);
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
            //console.log(data);
            newRole = [data.newRol, data.rolSalary, data.rolDep];
            queries.addRole(newRole);
        });
    }

async function updateEmpRole() {
    let roleList = await queries.displayRoles();
    let empList = await queries.getEmployeesNames();
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee's role do you want to update?", 
                name: "empName",
                choices: empList,
            },
            {
                type: 'list',
                message: "Which role do you want to assign the selected employee?", 
                name: "newRole",
                choices: roleList,
            },
        ])
        .then((data) => {
            //console.log(data);
            // do something with name and roll pls
            let empID = 0;
            let empRoleID = 0;
            updatedEmp = [empID, empRoleID];
            queries.updateEmpRole(updatedEmp);
        });
    }

async function addEmployeeinq() {
    let roleList = await queries.displayRoles();
    let managerList = await queries.managerList();
    managerList.unshift('None');
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employees first name?", 
                name: "empFirst",
            },
            {
                type: 'input',
                message: "What is the employees last name?", 
                name: "empLast",
            },
            {
                type: 'list',
                message: "What is the employees role?", 
                name: "empRole",
                choices: roleList,
            },
            {
                type: 'list',
                message: "Who is the employees manager?", 
                name: "empManager",
                choices: managerList,
            },
        ])
        .then((data) => {
            //console.log(data);
            // do something with data.empManager for manager id
            let manager_id = NULL;
            newEmployee = [data.empFirst, data.empLast, data.empRole, manager_id];
            queries.updateEmpRole(updatedEmp);
        });
    }
    

module.exports = {addDepartmentinq, addRoleinq, addEmployeeinq,
updateEmpRole
};