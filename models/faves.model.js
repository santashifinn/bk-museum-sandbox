const db = require("../db/connection");

exports.selectFavesByUser = (username) => {
  return db
    .query(
      `SELECT * FROM faves
      WHERE username = $1;`,
      [username]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    });
};

exports.addFave = (username, work_id, collection) => {
  return db
    .query(
      `INSERT INTO faves (username, work_id, collection) VALUES ($1, $2, $3) RETURNING *;`,
      [username, work_id, collection]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeFave = (username, work_id) => {
  return db.query(
    `DELETE FROM faves
      WHERE username = $1 AND work_id = $2`,
    [username, work_id]
  );
};

exports.checkFaveExists = (work_id) => {
  return db
    .query(`SELECT * FROM faves WHERE work_id = $1`, [work_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
    });
};
