const db = require("../db/connection");

exports.selectFavesByUser = (username) => {
  return db
    .query(
      `SELECT * FROM faves
      WHERE username = $1;`,
      [username]
    )
    .then(({ rows }) => {
      // console.log(rows);
      return rows;
    });
};

exports.addFave = (username, collection, work_id) => {
  return db
    .query(
      `INSERT INTO faves (username, collection, work_id) VALUES ($1, $2, $3) RETURNING *;`,
      [username, collection, work_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeFave = (username, collection, work_id) => {
  return db.query(
    `DELETE FROM faves
      WHERE username = $1 AND collection = $2 AND work_id = $3`,
    [username, collection, work_id]
  );
};

exports.checkFaveExists = (collection, work_id) => {
  return db
    .query(`SELECT * FROM faves WHERE collection = $1 AND work_id = $2`, [
      collection, work_id,
    ])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
    });
};
