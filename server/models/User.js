const db = require("../dbConfig/init");
const SQL = require("sql-template-strings");

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const allUsers = await db.query(`SELECT * FROM users;`);
        const users = allUsers.rows.map((d) => new User(d));
        res(users);
      } catch (err) {
        rej(`Error retrieving users ${err}`);
      }
    });
  }

  static create(name) {
    return new Promise(async (res, rej) => {
      try {
        let newUser = await db.query(
          SQL`INSERT INTO users (name) VALUES(${name}) RETURNING *;`
        );
        let user = new User(newUser.rows[0]);
        res(user);
      } catch (err) {
        rej(`Error creating user: ${err}`);
      }
    });
  }

  static findOrCreateByName(name) {
    return new Promise(async (res, rej) => {
      try {
        let user;
        let userExists = await db.query(`SELECT * FROM users WHERE name=$1`, [
          name,
        ]);
        if (!userExists.rows.length) {
          user = await User.create(name);
        } else {
          user = new User(userExists.rows[0]);
        }
        res(user);
      } catch (error) {
        rej(`Could not find/create user ${error}`);
      }
    });
  }
}

module.exports = User;
