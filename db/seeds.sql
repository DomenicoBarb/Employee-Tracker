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
    (2, 'Jony', 'Ive', 'Salesperson', 'Sales', 65000, NULL),
    (3, 'J.P', 'Morgan', 'Accountant', 'Finance', 110000, NULL),
    (4, 'Abraham', 'Lincoln', 'Lawyer', 'Legal', 200000, NULL),
    (5, 'Alice', 'Smith', 'Software Engineer', 'Engineering', 90000, 'Nico Barberi'),
    (6, 'Bob', 'Jones', 'Salesperson', 'Sales', 65000, 'Jony Ive'),
    (7, 'Charlie', 'Brown', 'Accountant', 'Finance', 110000, 'J.P Morgan'),
    (8, 'David', 'Lee', 'Lawyer', 'Legal', 200000, 'Abraham Lincoln');