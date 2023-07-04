# Challenge12_CompanyManagementApplication

# Description:
This is a command line application designed to provide a business owner with a simple, intuitive method for managing departments, roles, and employees in their company. This empowers business owners to effectively organize and plan their businesses with ease.

# Table of Contents:
- Installation [#Installation]
- Usage [#Usage]
- Contributing [#Contributing]
- Tests [#Tests]
- License [#License]

## Installation
To install the necessary dependencies, run the following command:
npm install

## Usage
Once you've installed the dependencies, you can start the application by running:
node app.js

Upon starting the application, you'll be presented with the following options:
View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role

Depending on your selection:
When you choose to view all departments, you'll see a formatted table showing department names and department IDs.
When you choose to view all roles, you'll see the job title, role ID, the department that role belongs to, and the salary for that role.
When you choose to view all employees, you'll see a formatted table showing employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers that the employees report to.
When you choose to add a department, you'll be prompted to enter the name of the department. This new department will then be added to the database.
When you choose to add a role, you'll be prompted to enter the name, salary, and department for the role. This new role will then be added to the database.
When you choose to add an employee, you'll be prompted to enter the employee’s first name, last name, role, and manager. This new employee will then be added to the database.
When you choose to update an employee role, you'll be prompted to select an employee to update and their new role. This updated information will then be updated in the database.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1) Fork the Project
2) Create your Feature Branch (git checkout -b feature/AmazingFeature)
3) Commit your Changes (git commit -m 'Add some AmazingFeature')
4) Push to the Branch (git push origin feature/AmazingFeature)
5) Open a Pull Request

## Tests
To run tests, use the following command:
npm test

## License
Distributed under the MIT License. See LICENSE for more information.