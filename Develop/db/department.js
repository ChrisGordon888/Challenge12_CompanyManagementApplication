class Department {
    constructor(connection) {
      this.connection = connection;
    }
  
    create(name) {
      const sql = 'INSERT INTO department (name) VALUES (?)';
      const params = [name];
      return this.connection.promise().query(sql, params);
    }
  
    readAll() {
      const sql = 'SELECT * FROM department';
      return this.connection.promise().query(sql);
    }
  
    readOne(id) {
      const sql = 'SELECT * FROM department WHERE id = ?';
      const params = [id];
      return this.connection.promise().query(sql, params);
    }
  
    update(id, name) {
      const sql = 'UPDATE department SET name = ? WHERE id = ?';
      const params = [name, id];
      return this.connection.promise().query(sql, params);
    }
  
    delete(id) {
      const sql = 'DELETE FROM department WHERE id = ?';
      const params = [id];
      return this.connection.promise().query(sql, params);
    }
  
    add(name) {
      const sql = 'INSERT INTO department (name) VALUES (?)';
      const params = [name];
      return this.connection.promise().query(sql, params);
    }
  }
  
  module.exports = { Department };