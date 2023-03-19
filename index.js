// Variable Definitions & Dependencies
const inquirer = require('inquirer');
const database = require('./config/connection');
const table = require('console.table');
const chalk = require('chalk');

// Start server after DataBase connection
database.connect(err => {
    if (err) throw err;
    console.log(chalk.greenBright('            Database connected!\n'));
    employee_tracker();
});

console.log(chalk.redBright(`
 _________________________________________                              
|    _____           _                    |
|   |   __|_____ ___| |___ _ _ ___ ___    |
|   |   __|     | . | | . | | | -_| -_|   |
|   |_____|_|_|_|  _|_|___|_  |___|___|   |
|               |_|       |___|           |
|                                         |
|    _____                                |
|   |     |___ ___ ___ ___ ___ ___        |
|   | | | | .'|   | .'| . | -_|  _|       |
|   |_|_|_|__,|_|_|__,|_  |___|_|         |
|                     |___|               |
|_________________________________________|
`));
var employee_tracker = function () {
    inquirer.prompt([{
        // Begin Command Line
        type: 'list',
        name: 'prompt',
        message: chalk.whiteBright('What would you like to do?' + '\n'),
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Delete An Employee', 'Delete A Department', 'Log Out']
    }]).then((answers) => {
        // Views the Department Table in the Database
        if (answers.prompt === 'View All Departments') {
            database.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments:\n");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Roles') {
            database.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles:\n");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Employees') {
            database.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees:\n");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                // Adding a Department
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please Add A Department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                database.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Add A Role') {
            // Beginning with the database so that we may acquire the departments for the choice
            database.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Adding A Role
                        type: 'input',
                        name: 'role',
                        message: 'What is the name of the role?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please Add A Role!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding the Salary
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Department
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }

                    database.query(`INSERT INTO role (title, salary, department) VALUES (?, ?, ?)`, [answers.role, answers.salary, answers.department], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Add An Employee') {
            // Calling the database to acquire the roles and managers
            database.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Adding Employee First Name
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees first name?',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A First Name!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding Employee Last Name
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding Employee Role
                        type: 'list',
                        name: 'title',
                        message: 'What is the employees role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        // Adding Employee Department
                        type: 'list',
                        name: 'department',
                        message: 'What is the employees department?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].department);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        // Adding Employee Salary
                        type: 'number',
                        name: 'salary',
                        message: 'What is the employees salary?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding Employee Manager
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the employees manager?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].first_name + ' ' + result[i].last_name);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }

                    database.query(`INSERT INTO employee (first_name, last_name, title, department, salary, manager) VALUES (?, ?, ?, ?, ?, ?)`, [answers.firstName, answers.lastName, answers.title, answers.department, answers.salary, answers.manager], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Update An Employee Role') {
            // Calling the database to acquire the roles and managers
            database.query('SELECT * FROM employee', (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Choose an Employee to Update
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee\'s role do you want to update?',
                        choices: () => {
                            const uniqueEmployees = [...new Set(result.map(row => `${row.first_name} ${row.last_name}`))];
                            return uniqueEmployees;
                        }
                    },
                    {
                        // Updating the New Role
                        type: 'list',
                        name: 'title',
                        message: 'What is their new role?',
                        choices: () => {
                            const uniqueTitles = [...new Set(result.map(row => row.title))];
                            return uniqueTitles;
                        }
                    },
                    {
                        // Updating the New Department
                        type: 'list',
                        name: 'department',
                        message: 'What is their new department?',
                        choices: () => {
                            const uniqueDepartments = [...new Set(result.map(row => row.department))];
                            return uniqueDepartments;
                        }
                    },
                    {
                        // Adding Employee Salary
                        type: 'input',
                        name: 'salary',
                        message: 'What is the employee\'s new salary?',
                        validate: salaryInput => {
                            const isValid = !isNaN(parseFloat(salaryInput));
                            return isValid || 'Please enter a number';
                        }
                    },
                    {
                        // Adding Employee Manager
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the employee\'s new manager?',
                        choices: () => {
                            const uniqueManagers = [...new Set(result.map(row => `${row.first_name} ${row.last_name}`))];
                            return uniqueManagers;
                        }
                    }
                ]).then((answers) => {
                    // Comparing the result and storing it into the variable
                    const employee = result.find(row => `${row.first_name} ${row.last_name}` === answers.employee);
                    const { title, department, salary, manager } = answers;
                    const values = [title, department, salary, manager, employee.first_name, employee.last_name];

                    database.query('UPDATE employee SET title = ?, department = ?, salary = ?, manager = ? WHERE first_name = ? AND last_name = ?', values, (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${employee.first_name} ${employee.last_name}'s role to ${title} in the ${department} department with their new manager ${manager} and a new salary of $${salary}.`);
                        employee_tracker();
                    });
                });
            });
        } else if (answers.prompt === 'Delete An Employee') {
            // Calling the database to acquire the list of employees
            database.query('SELECT * FROM employee', (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Choose an Employee to Delete
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee do you want to delete?',
                        choices: () => {
                            const uniqueEmployees = [...new Set(result.map(row => `${row.first_name} ${row.last_name}`))];
                            return uniqueEmployees;
                        }
                    }
                ]).then((answers) => {
                    // Comparing the result and storing it into the variable
                    const employee = result.find(row => `${row.first_name} ${row.last_name}` === answers.employee);
                    const { first_name, last_name } = employee;

                    database.query('DELETE FROM employee WHERE first_name = ? AND last_name = ?', [first_name, last_name], (err, result) => {
                        if (err) throw err;
                        console.log(chalk.redBright(`Deleted ${first_name} ${last_name} from the database!`));
                        employee_tracker();
                    });
                });
            });
        } else if (answers.prompt === 'Delete A Department') {
            database.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department would you like to delete?',
                        choices: () => {
                            const departmentNames = result.map(row => row.name);
                            return departmentNames;
                        }
                    }
                ]).then((answer) => {
                    const departmentName = answer.department;
                    const department = result.find(row => row.name === departmentName);
                    const id = department.id;
                    database.query('DELETE FROM department WHERE name = ?', [departmentName], (err, result) => {
                        if (err) throw err;
                        console.log(`Deleted department '${departmentName}'`);
                        employee_tracker();
                    });
                });
            });
        } else if (answers.prompt === 'Log Out') {
            database.end();
            console.log(chalk.redBright("Have a good day! :)"));
        }
    })
};