const db = require("../db/connection");

exports.selectUsers = () => {
  return db.query("SELECT * FROM users;").then(({ rows }) => {
    return rows;
  });
};

exports.selectUserByUsername = (username) => {
  return db
    .query(`SELECT * FROM users WHERE users.username = $1;`, [username])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return rows[0];
    });
};

exports.addUser = (username, email, password_hashed) => {
  return db
    .query(
      `INSERT INTO users (username, email, password_hashed) VALUES ($1, $2, $3) RETURNING *;`,
      [username, email, password_hashed]
    )
    .then(({ rows: [user] }) => {
      return user;
    });
};

exports.checkUserExists = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
    });
};
