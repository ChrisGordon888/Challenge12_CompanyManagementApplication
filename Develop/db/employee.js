class Employee {
    constructor(connection) {
      this.connection = connection;
    }
  
    create(firstName, lastName, roleId, managerId) {
      const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      const params = [firstName, lastName, roleId, managerId];
      return this.connection.promise().query(sql, params);
    }
  
    readAll() {
      const sql = `SELECT 
                    e.id, 
                    e.first_name, 
                    e.last_name, 
                    r.title, 
                    d.name AS department, 
                    r.salary, 
                    CONCAT(m.first_name, ' ', m.last_name) AS manager
                  FROM employee e
                    LEFT JOIN role r ON e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    LEFT JOIN employee m ON e.manager_id = m.id`;
      return this.connection.promise().query(sql);
    }
  
    readOne(id) {
      const sql = `SELECT 
                    e.id, 
                    e.first_name, 
                    e.last_name, 
                    r.title, 
                    d.name AS department, 
                    r.salary, 
                    CONCAT(m.first_name, ' ', m.last_name) AS manager
                  FROM employee e
                    LEFT JOIN role r ON e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    LEFT JOIN employee m ON e.manager_id = m.id
                  WHERE e.id = ?`;
      const params = [id];
      return this.connection.promise().query(sql, params);
    }
  
    update(id, firstName, lastName, roleId, managerId) {
        let sql = 'UPDATE employee SET first_name = ?';
        const params = [firstName];
      
        if (lastName) {
          sql += ', last_name = ?';
          params.push(lastName);
        }
      
        if (roleId) {
          sql += ', role_id = ?';
          params.push(roleId);
        }
      
        if (managerId) {
          sql += ', manager_id = ?';
          params.push(managerId);
        }
      
        sql += ' WHERE id = ?';
        params.push(id);
      
        return this.connection.promise().query(sql, params);
      }
  
      updaterole(id, roleId) {
        const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const params = [roleId, id];
        return this.connection.promise().query(sql, params);
      }
    
      

    delete(id) {
      const sql = 'DELETE FROM employee WHERE id = ?';
      const params = [id];
      return this.connection.promise().query(sql, params);
    }
  }
  
  module.exports = { Employee };