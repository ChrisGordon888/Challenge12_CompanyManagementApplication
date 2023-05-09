class Role {
    constructor(connection) {
      this.connection = connection;
    }
  
    create(title, salary, departmentId) {
      const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      const params = [title, salary, departmentId];
      return this.connection.promise().query(sql, params);
    }
  
    readAll() {
      const sql = `SELECT 
                    r.id, 
                    r.title, 
                    d.name AS department, 
                    r.salary 
                  FROM role r
                    LEFT JOIN department d ON r.department_id = d.id`;
      return this.connection.promise().query(sql);
    }
  
    readOne(id) {
      const sql = `SELECT 
                    r.id, 
                    r.title, 
                    d.name AS department, 
                    r.salary 
                  FROM role r
                    LEFT JOIN department d ON r.department_id = d.id
                  WHERE r.id = ?`;
      const params = [id];
      return this.connection.promise().query(sql, params);
    }
  
    update(id, title, salary, departmentId) {
      const sql = 'UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?';
      const params = [title, salary, departmentId, id];
      return this.connection.promise().query(sql, params);
    }
  
    delete(id) {
      const sql = 'DELETE FROM role WHERE id = ?';
      const params = [id];
      return this.connection.promise().query(sql, params);
    }
  }
  
  module.exports = { Role };