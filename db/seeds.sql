-- Inserts names of departments into department table
INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

-- Inserts roles of employee into role table
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Software Engineer', 90000, 1),
  ('Salesperson', 65000, 2),
  ('Accountant', 110000, 3),
  ('Lawyer', 200000, 4);

-- Inserts employee information into employee table
INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Nico', 'Barberi', 1, 1),
  ('Jony', 'Ive', 2, 2),
  ('J.P', 'Morgan', 3, 3),
  ('Abraham', 'Lincoln', 4, 4);