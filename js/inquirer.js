const inquirer = require('inquirer');
const queries = require('./queryHandler.js');
const furtherQuestions = require('./furtherQuestions.js')

const userOptions = ['View All Employees', 
'Add Employee', 'Update Employee Role', 
'View All Roles', 'Add Role', 
'View all Departments', 'Add Department',
'Exit'];

//recusivly call menu if needed?

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
            console.log(data);
            switch (data.userChoice) {
                case userOptions[0]:
                    let info = await queries.displayEmployees();
                    console.table(info);
                    menu();
                    //return true;
                case userOptions[1]:
                    return console.log(data);
                    break;
                case userOptions[2]:
                    return console.log(data);
                    break;
                case userOptions[3]:
                    queries.displayRoles();
                    break;
                case userOptions[4]:
                    furtherQuestions.addRoleinq();
                    break;
                case userOptions[5]:
                    queries.displayDepartments();
                    break;
                case userOptions[6]:
                    return console.log(data);
                    break;
                case userOptions[7]:
                    process.exit();
                    //return false;
            }
        });
}



module.exports = {menu};

