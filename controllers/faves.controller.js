const {
  selectFavesByUser,
  addFave,
  removeFave,
  checkFaveExists,
} = require("../models/faves.model");

exports.getFavesByUser = (req, res, next) => {
  const username = req.params.username;
  // const limit = req.query.limit;
  // const p = req.query.p;
  // const promises = [selectFavesByUser(username, limit, p)];
  // Promise.all(promises)
  selectFavesByUser(username)
    .then((faves) => {
      // console.log(faves);
      return res.status(200).send({ faves });
    })
    .catch(next);
};

// exports.getUserByUsername = (req, res, next) => {
//   const username = req.params.username;
//   selectUserByUsername(username)
//     .then((user) => {
//       return res.status(200).send({ user });
//     })
//     .catch(next);
// };

exports.postFave = (req, res, next) => {
  const username = req.params.username;
  const collection = req.params.collection;
  const newFave = req.params.work_id;

  addFave(username, collection, newFave)
    .then((fave) => {
      res.status(201).send({ fave });
    })
    .catch(next);
};

exports.deleteFave = (req, res, next) => {
  const username = req.params.username;
  const collection = req.params.collection;
  const work_id = req.params.work_id;

  const promises = [];
  if (work_id) {
    promises.push(checkFaveExists(collection, work_id));
    promises.push(removeFave(username, collection, work_id));
  }
  Promise.all(promises)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
