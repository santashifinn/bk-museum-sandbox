const format = require("pg-format");
const db = require("../connection");
const {
  createRef,
} = require("./utils");

const seed = ({ userData, favesData }) => {
  return db
    .query(`DROP TABLE IF EXISTS faves;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        email VARCHAR NOT NULL,
        password_hashed VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
    })
  .then(() => {
    return db.query(`
    CREATE TABLE faves (
      username VARCHAR PRIMARY KEY REFERENCES users(username) NOT NULL,
      work_id VARCHAR,
      created_at TIMESTAMP DEFAULT NOW()
    );`);
  })
  .then(() => {
    const insertUsersQueryStr = format(
      "INSERT INTO users ( username, email, password_hashed) VALUES %L;",
      userData.map(({ username, email, password_hashed }) => [
        username,
        email,
        password_hashed,
      ])
    );
    return db.query(insertUsersQueryStr);
  })
  .then(() => {
    const insertFavesQueryStr = format(
      "INSERT INTO faves (username, work_id) VALUES %L;",
      favesData.map(({ username, work_id }) => [
        username,
        work_id,
      ])
    );
    return db.query(insertFavesQueryStr);
  });
};

module.exports = seed;
