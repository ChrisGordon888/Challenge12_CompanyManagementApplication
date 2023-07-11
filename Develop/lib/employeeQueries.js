const { Employee } = require('../db/employee');

class EmployeeQueries {
  constructor(connection) {
    this.connection = connection;
  }

  getAllEmployees() {
    const employee = new Employee(this.connection);
    return employee.readAll();
  }

  addEmployee(firstName, lastName, roleId, managerId) {
    const employee = new Employee(this.connection);
    return employee.create(firstName, lastName, roleId, managerId);
  }

  readAll() {
    const employee = new Employee(this.connection);
    return employee.readAll();
  }
  
  async updaterole(employeeId, roleId) {
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const params = [roleId, employeeId];
    await this.connection.promise().query(sql, params);
  }


async deleteEmployee(employeeId) {
  const sql = 'DELETE FROM employee WHERE id = ?';
  const params = [employeeId];
  await this.connection.promise().query(sql, params);
}
}

module.exports = EmployeeQueries;