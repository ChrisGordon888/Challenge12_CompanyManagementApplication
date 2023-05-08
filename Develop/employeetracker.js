const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'localhost',
  password: '',
  database: 'employee_tracker_db'
});

// required functions for your employee tracker

function viewAllRoles() {
    connection.query(
      'SELECT roles.id, roles.title, roles.salary, departments.name FROM roles LEFT JOIN departments ON roles.department_id = departments.id',
      function(err, results) {
        if (err) throw err;
        console.table(results);
      }
    );
  }
  
  function viewAllEmployees() {
    connection.query(
      'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees managers ON employees.manager_id = managers.id',
      function(err, results) {
        if (err) throw err;
        console.table(results);
      }
    );
  }
  
  const inquirer = require('inquirer');

  function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:'
      }
    ]).then(function(answers) {
      connection.query(
        'INSERT INTO departments (name) VALUES (?)',
        [answers.name],
        function(err, results) {
          if (err) throw err;
          console.log('Department added successfully!');
        }
      );
    });
  }
  
  addDepartment();


  function addRole(title, salary, department_id) {
    connection.query(
      'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
      [title, salary, department_id],
      function(err, results) {
        if (err) throw err;
        console.log('Role added successfully!');
      }
    );
  }
  
  function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "Enter the employee's first name:"
    },
    {
      type: 'input',
      name: 'last_name',
      message: "Enter the employee's last name:"
    },
    {
      type: 'input',
      name: 'role_id',
      message: "Enter the employee's role ID:"
    },
    {
      type: 'input',
      name: 'manager_id',
      message: "Enter the employee's manager ID (or leave blank if none):"
    }
  ]).then(function(answers) {
    addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
  });
}

addEmployee();
  
  function updateEmployeeRole(employee_id, role_id) {
    connection.query(
      'UPDATE employees SET role_id = ? WHERE id = ?',
      [role_id, employee_id],
      function(err, results) {
        if (err) throw err;
        console.log('Employee role updated successfully!');
      }
    );
  }


// invoke them

viewAllRoles();

viewAllEmployees();

addDepartment('Sales');

addRole('Sales Manager', 80000, 1);

addEmployee('John', 'Doe', 1, null);

updateEmployeeRole(1, 2);