USE employee_tracker_db;

INSERT INTO department (name) VALUES ('Engineering'), ('Sales'), ('Finance'), ('Legal');

INSERT INTO roles (title, salary, department_id) 
VALUES 
  ('Lead Engineer', 150000, 1),
  ('Software Engineer', 120000, 1),
  ('Sales Lead', 100000, 2),
  ('Salesperson', 80000, 2),
  ('Accountant', 125000, 3),
  ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Doe', 2, 1),
  ('Bob', 'Smith', 3, NULL),
  ('Alice', 'Johnson', 4, 3),
  ('Peter', 'Parker', 5, NULL),
  ('Mary', 'Jane', 6, 5);