const { Role } = require('../db/role');

class RoleQueries {
  constructor(connection) {
    this.connection = connection;
  }

  getAllRoles() {
    const role = new Role(this.connection);
    return role.readAll();
  }

  addRole(title, salary, departmentId) {
    const role = new Role(this.connection);
    return role.create(title, salary, departmentId);
  }

  readAll() {
    const role = new Role(this.connection);
    return role.readAll();
  }
}

module.exports = RoleQueries;