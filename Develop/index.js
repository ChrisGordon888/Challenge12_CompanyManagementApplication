const inquirer = require('inquirer');

// import required modules
const { createConnection } = require('./db/connection');
const { Department } = require('./db/department');
const { Role } = require('./db/role');
const { Employee } = require('./db/employee');
const DepartmentsQueries = require('./lib/departmentsQueries');
const RoleQueries = require('./lib/roleQueries');
const EmployeeQueries = require('./lib/employeeQueries');

// creates database connection:
const connection = createConnection();

// classes to interact with the database:
const department = new Department(connection);
const role = new Role(connection);
const employee = new Employee(connection);
const departmentsQueries = new DepartmentsQueries(connection);
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
      viewAllroles();
      break;
    case 'View all employees':
      viewAllEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addrole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeerole();
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
    .then((rows) => console.table(rows[0]))
    .catch((err) => console.log(err))
    .finally(() => mainMenu());
}

function viewAllroles() {
  role.readAll()
    .then((rows) => console.table(rows[0]))
    .catch((err) => console.log(err))
    .finally(() => mainMenu());
}

function viewAllEmployees() {
  employee.readAll()
    .then((rows) => console.table(rows[0]))
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

async function addrole() {
    const departments = await departmentsQueries.readAll();
    console.log(departments);
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
      await roleQueries.addRole(title, salary, departmentId);
      console.log(`role ${title} added successfully!`);
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

  

  async function updateEmployeerole() {
    const employees = await employeeQueries.readAll();
    const flattenedEmployees = employees.flat(); // Flatten the array of arrays
  
    const roles = await roleQueries.readAll();
  
    // Prompt user for employee selection
    const { employeeId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee would you like to update?',
        choices: flattenedEmployees.map((emp) => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id,
        })),
      },
    ]);
  
    // Prompt user for new role selection
    const { newRoleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'newRoleId',
        message: "What is the employee's new role?",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);
  
    // Update the employee's role in the database
    try {
      await employeeQueries.updaterole(employeeId, newRoleId); // Pass newRoleId instead of roleId
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
