const inquirer = require('inquirer');
const queries = require('./queryHandler.js');
const furtherQuestions = require('./furtherQuestions.js')

const userOptions = ['View All Employees', 
'Add Employee', 'Update Employee Role', 
'View All Roles', 'Add Role', 
'View all Departments', 'Add Department',
'Exit'];

async function menu() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?", 
                name: "userChoice", 
                choices: [
                    userOptions[0],
                    userOptions[1],
                    userOptions[2],
                    userOptions[3],
                    userOptions[4],
                    userOptions[5],
                    userOptions[6],
                    userOptions[7],
                ]
            },
        ])
        .then( async (data) => {
            //console.log(data);
            switch (data.userChoice) {
                case userOptions[0]:
                    let empDisplayInfo = await queries.displayEmployees();
                    console.table(empDisplayInfo);
                    menu();
                    break;
                case userOptions[1]:
                    let addedEmp = await furtherQuestions.addEmployeeinq();
                    console.log("Employee Added");
                    menu();
                    break;
                case userOptions[2]:
                    let empUpdate = await furtherQuestions.updateEmpRole();
                    console.log("Employee Role Updated");
                    menu();
                    break;
                case userOptions[3]:
                    let roleDisplayInfo = await queries.displayRoles();
                    console.table(roleDisplayInfo);
                    menu();
                    break;
                case userOptions[4]:
                    let addedRole = await furtherQuestions.addRoleinq();
                    console.log("Role Added");
                    menu();
                    break;
                case userOptions[5]:
                    let depDisplayInfo = await queries.displayDepartments();
                    console.table(depDisplayInfo);
                    menu();
                    break;
                case userOptions[6]:
                    let addedDep = await furtherQuestions.addDepartmentinq();
                    console.log("Department Added");
                    menu();
                    break;
                case userOptions[7]:
                    process.exit();
            }
        });
}



module.exports = {menu};

