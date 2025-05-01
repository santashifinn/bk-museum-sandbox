const bcrypt = require("bcrypt");

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
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .send({ message: "Please enter username, email and password." });
  }
  bcrypt.hash(password, 10).then((password_hashed) => {
    addUser(username, email, password_hashed)
      .then((username) => {
        res
          .status(201)
          .send({ message: `Welcome ${username}! You are all signed up.` });
      })
      .catch(next);
  });
};
