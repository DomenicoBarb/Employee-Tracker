// Variable Definitions & Dependencies
const inquirer = require('inquirer');
const database = require('./config/connection');

// Start server after DataBase connection
database.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employee_tracker();
});

console.log(`
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
`);
var employee_tracker = function () {
    inquirer.prompt([{
        // Begin Command Line
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
        // Views the Department Table in the Database
        if (answers.prompt === 'View All Departments') {
            database.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Roles') {
            database.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Employees') {
            database.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
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
            database.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Choose an Employee to Update
                        type: 'list',
                        name: 'employee',
                        message: 'Which employees role do you want to update?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].first_name + ' ' + result[i].last_name);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        // Updating the New Role
                        type: 'list',
                        name: 'title',
                        message: 'What is their new role?',
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
                        // Updating the New Department
                        type: 'list',
                        name: 'department', // change the name to 'department'
                        message: 'What is their new department?',
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
                        message: 'What is the employees new salary?',
                        validate: salaryInput => {
                          if (salaryInput && /^\d+(\.\d+)?$/.test(salaryInput)) {
                            return true;
                          } else {
                            console.log('Please Enter a Valid Decimal Number for the Salary!');
                            return false;
                          }
                        }
                      },
                    {
                        // Adding Employee Manager
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the employees new manager?',
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
                        if (result[i].first_name === answers.employee) {
                            var firstName = result[i].first_name;
                        }
                    }
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                            var lastName = result[i].last_name;
                        }
                    }

                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.title) {
                            var newTitle = result[i].title;
                        }
                    }

                    for (var i = 0; i < result.length; i++) {
                        if (result[i].department === answers.department) {
                            var newDepartment = result[i].department;
                        }
                    }

                    for (var i = 0; i < result.length; i++) {
                        if (result[i].department === answers.salary) {
                            var newSalary = result[i].salary;
                        }
                    }

                    for (var i = 0; i < result.length; i++) {
                        if (result[i].manager === answers.manager) {
                            var newManager = result[i];
                        }
                    }

                    database.query(`UPDATE employee SET title = ?, department = ?, salary = ?, manager = ? WHERE first_name = ? AND last_name = ?`, [newTitle,newDepartment,newSalary,newManager,firstName,lastName], (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee}'s role to ${answers.title} in the ${answers.department} department with their new manager ${answers.manager} with a new salary of $${answers.salary}.`);
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Log Out') {
            database.end();
            console.log("Good-Bye!");
        }
    })
};