-- Insert data into department table
INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

-- Insert data into the role table
INSERT INTO role (title, department, salary) VALUES
    ('Software Engineer', 'Engineering', 90000),
    ('Salesperson', 'Sales', 65000),
    ('Accountant', 'Finance', 110000),
    ('Lawyer', 'Legal', 200000);

-- Insert data into the employee table
INSERT INTO employee (id, first_name, last_name, title, department, salary, manager) VALUES
    (1, 'Nico', 'Barberi', 'Software Engineer', 'Engineering', 90000, NULL),
    (2, 'Alice', 'Smith', 'Software Engineer', 'Engineering', 65000, 'Nico Barberi'),
    (3, 'Jony', 'Ive', 'Salesperson', 'Sales', 75000, NULL),
    (4, 'Bob', 'Jones', 'Salesperson', 'Sales', 55000, 'Jony Ive'),
    (5, 'J.P', 'Morgan', 'Accountant', 'Finance', 110000, NULL),
    (6, 'Charlie', 'Brown', 'Accountant', 'Finance', 90000, 'J.P Morgan'),
    (7, 'Abraham', 'Lincoln', 'Lawyer', 'Legal', 200000, NULL),
    (8, 'David', 'Lee', 'Lawyer', 'Legal', 100000, 'Abraham Lincoln');