class DepartmentsQueries {
  constructor(connection) {
    this.connection = connection;
  }

  readAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM department';
      this.connection.query(query, (err, res) => {
        if (err) return reject(err);
        return resolve(res); // Make sure res is just an array of department objects
      });
    });
  }
}

module.exports = DepartmentsQueries;