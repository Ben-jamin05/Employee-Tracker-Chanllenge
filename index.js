const inquirer = require('inquirer');

const userOptions = ['View All Employees', 
'Add Employee', 'Update Employee Role', 
'View All Roles', 'Add Role', 
'View all Departments', 'Add Department',
'Exit'];

function menu() {
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
        .then((data) => {
            return data;
        });
}

function choiceHandler() {
    let userChoice = menu();
    switch (userChoice) {
        case userOptions[0]:
            return console.log('lol');
        case userOptions[1]:
            return console.log(userChoice);
        case userOptions[2]:
            return console.log(userChoice);
        case userOptions[3]:
            return console.log(userChoice);
        case userOptions[4]:
            return console.log(userChoice);
        case userOptions[5]:
            return console.log(userChoice);
        case userOptions[6]:
            return console.log(userChoice);
    }

    /*
    if (userChoice === userOptions[0]) {

    }
    */
}


choiceHandler();


/*
while (true) {
    let userChoice = menu();
    if (userChoice === "Exit") {
        break;
    }
};
*/