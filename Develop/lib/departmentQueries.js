class DepartmentQueries {
  constructor(connection) {
    this.connection = connection;
  }

  getAllDepartments() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM departments';
      this.connection.query(query, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }
}

module.exports = { DepartmentQueries };