const mysql = require('mysql2/promise');
const config = require('../config');
const uuid = require('uuid').v4


class User {
  constructor(id, email, password, role) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async getUserByEmail(email) {
    const connection = await mysql.createConnection(config);
    const [rows] = await connection.execute(`SELECT * FROM users WHERE email="${email}" LIMIT 1`);
    connection.end();
    const user = rows[0];
    return user;
  }


  async addUser(email, name, azs_number, password, role) {
    // Sanitize the password by removing double quotes
    password = password.replace(/"/g, '');

    const connection = await mysql.createConnection(config);
    await connection.execute(`INSERT INTO users SET id="${uuid()}", email="${email}", name="${name}", azs_number="${azs_number}", password="${password}", role="${role}"`);
    connection.end();
  }

  async changePass(email, newPass) {
    const connection = await mysql.createConnection(config);
    await connection.execute(`
            UPDATE users SET 
            resetKey=NULL,
            resetKeyExp=NULL,
            password="${newPass}"
            WHERE email="${email} " LIMIT 1
        `);
    connection.end();
  }

  async checkAuth(email) {
    const connection = await mysql.createConnection(config)
    const [rows] = await connection.execute(`SELECT *, LENGTH(session) as length FROM sessions WHERE LENGTH(session) > 200`);



    let authArr = [];
    rows.forEach(e => {
      const res = JSON.parse(e.session);
      if (res.user) {
        if (res.user.email == email) {

          authArr.push(e)
        }
      }

    });

    for (let i = 0; i < authArr.length; i++) {
      await connection.execute(`DELETE FROM sessions WHERE sid="${authArr[i].sid}"`);
    }
    connection.end();
  }

  async checkPass(email, pass) {
    const user = await new User().getUserByEmail(email);

    if (user.password == pass) {
      return true
    }
    return false

  }

}

module.exports = User;