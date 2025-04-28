const {
  selectUsers,
  selectUserByUsername,
  addUser,
} = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const username = req.params.username;
  selectUserByUsername(username)
    .then((user) => {
      return res.status(200).send({ user });
    })
    .catch(next);
};

exports.createUser = (req, res, next) => {
  const username = req.params.username;
  const email = req.params.email;
  const password_hashed = req.params.password_hashed;

  addUser(username, email, password_hashed)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};
