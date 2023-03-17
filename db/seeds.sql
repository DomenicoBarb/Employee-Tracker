-- Insert data into department table
INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

-- Insert data into role table
INSERT INTO role (title, department, salary) VALUES
    ('Software Engineer', 'Engineering', 90000),
    ('Salesperson', 'Sales', 65000),
    ('Accountant', 'Finance', 110000),
    ('Lawyer', 'Legal', 200000);

-- Insert data into employee table
INSERT INTO employee (first_name, last_name, title, department, salary, manager) VALUES
    ('Nico', 'Barberi', 'Software Engineer', 'Engineering', 90000, NULL),
    ('Jony', 'Ive', 'Salesperson', 'Sales', 65000, NULL),
    ('J.P', 'Morgan', 'Accountant', 'Finance', 110000, NULL),
    ('Abraham', 'Lincoln', 'Lawyer', 'Legal', 200000, NULL),
    ('Alice', 'Smith', 'Software Engineer', 'Engineering', 90000, 'Nico Barberi'),
    ('Bob', 'Jones', 'Salesperson', 'Sales', 65000, 'Jony Ive'),
    ('Charlie', 'Brown', 'Accountant', 'Finance', 110000, 'J.P Morgan'),
    ('David', 'Lee', 'Lawyer', 'Legal', 200000, 'Abraham Lincoln');