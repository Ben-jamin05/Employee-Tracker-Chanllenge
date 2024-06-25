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
        .then( async (data) => {
            //console.log(data);
            let newDepartment = data.newDep;
            let newDepQuery = await queries.addDepartment(newDepartment);
        });
    }

async function addRoleinq() {
    let departmentList = await queries.displayDepartments();
    const data = await inquirer
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

        //console.log(data);
        let newRole = [data.newRol, data.rolSalary, data.rolDep];
        let newRoleQuery = await queries.addRole(newRole);
    }

async function updateEmpRole() {
    let roleList = await queries.displayRoles();
    let empList = await queries.getEmployeesNames();
    const data = await inquirer
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
        //console.log(data);
        let updatedEmp = [data.empName, data.newRole];
        let updatedEmpQuery = await queries.updateEmpRole(updatedEmp);
    }

async function addEmployeeinq() {
    let roleList = await queries.displayRoles();
    let managerList = await queries.managerList();
    managerList.unshift('None');
    const data = await inquirer
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
        //console.log(data);
        let newEmployee = [data.empFirst, data.empLast, data.empRole, data.empManager];
        let newEmpQuery = await queries.addEmployee(newEmployee);
    }


module.exports = {addDepartmentinq, addRoleinq, addEmployeeinq,
updateEmpRole
};
