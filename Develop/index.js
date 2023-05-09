const inquirer = require('inquirer');

// import required modules
const { createConnection } = require('./db/connection');
const { Department } = require('./db/department');
const { Role } = require('./db/role');
const { Employee } = require('./db/employee');
const { DepartmentQueries } = require('./lib/departmentQueries');
const { RoleQueries } = require('./lib/roleQueries');
const { EmployeeQueries } = require('./lib/employeeQueries');

// creates database connection:
const connection = createConnection();

// classes to interact with the database:
const department = new Department(connection);
const role = new Role(connection);
const employee = new Employee(connection);
const departmentQueries = new DepartmentQueries(connection);
const roleQueries = new RoleQueries(connection);
const employeeQueries = new EmployeeQueries(connection);


async function mainMenu() {
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Delete an employee',
        'Exit',
      ],
    },
  ]);

  console.log(`You chose: ${option}`);

  switch (option) {
    case 'View all departments':
      viewAllDepartments();
      break;
    case 'View all roles':
      viewAllRoles();
      break;
    case 'View all employees':
      viewAllEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    case 'Delete an employee':
      deleteEmployee();
      break;
    case 'Exit':
      process.exit();
      default:
    console.log(`Invalid option: ${option}`);
    mainMenu();
}
}

function viewAllDepartments() {
  department.readAll()
    .then((rows) => console.table(rows))
    .catch((err) => console.log(err))
    .finally(() => mainMenu());
}

function viewAllRoles() {
  role.readAll()
    .then((rows) => console.table(rows))
    .catch((err) => console.log(err))
    .finally(() => mainMenu());
}

function viewAllEmployees() {
  employee.readAll()
    .then((rows) => console.table(rows))
    .catch((err) => console.log(err))
    .finally(() => mainMenu());
}

async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
    },
  ]);

  try {
    await department.add(name);
    console.log(`Department "${name}" added successfully!`);
  } catch (err) {
    console.log(err);
  }

  mainMenu();
}

async function addRole() {
    const departments = await departmentQueries.readAll();
  
    // Prompt user for role information
    const { title, salary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for the new role?',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'What is the department of the new role?',
        choices: departments.map((dept) => ({
          name: dept.name,
          value: dept.id,
        })),
      },
    ]);
  
    // Add the role to the database
    try {
      await roleQueries.create(title, salary, departmentId);
      console.log(`Role ${title} added successfully!`);
    } catch (err) {
      console.log(err);
    }
  
    // Return to the main menu
    mainMenu();
  }
  
  async function addEmployee() {
    // Prompt user for employee information
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
      },
      {
        type: 'input',
        name: 'roleId',
        message: "What is the employee's role ID?",
      },
      {
        type: 'input',
        name: 'managerId',
        message: "What is the employee's manager ID? (optional)",
      },
    ]);
  
    // Convert manager ID to null if empty string or whitespace
    const validatedManagerId = managerId.trim() || null;
  
    // Add the employee to the database
    try {
      await employee.create(firstName, lastName, roleId, validatedManagerId);
      console.log(`Employee ${firstName} ${lastName} added successfully!`);
    } catch (err) {
      console.log(err);
    }
  
    // Return to the main menu
    mainMenu();
  }

  

  async function updateEmployeeRole() {
    const employees = await employeeQueries.readAll();
    const roles = await roleQueries.readAll();
  
    // Prompt user for employee and new role information
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee would you like to update?',
        choices: employees.map((emp) => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id,
        })),
      },
      {
        type: 'list',
        name: 'roleId',
        message: "What is the employee's new role?",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);
  
    // Update the employee's role in the database
    try {
      await employeeQueries.updateRole(employeeId, roleId);
      console.log('Employee role updated successfully!');
    } catch (err) {
      console.log(err);
    }
  
    // Return to the main menu
    mainMenu();
  }

  async function deleteEmployee() {
    const employees = await employeeQueries.getAllEmployees();
  
    const { employeeId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee would you like to delete?',
        choices: employees.map((emp) => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id,
        })),
      },
    ]);
  
    await employeeQueries.deleteEmployee(employeeId);
  
    console.log('Employee deleted successfully!');
    mainMenu();
  }
  

  mainMenu();
