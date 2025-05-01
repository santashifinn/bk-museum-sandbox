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

// exports.confirmUser = (req, res, next) => {
//   if (!req.body.username || !req.body.password) {
//     res
//       .status(400)
//       .send({ message: "Please enter your username and password." });
//   }

//   selectUserByUsername(req.body.username)
//     .then((user) => {
//       if (user) {
//         bcrypt.compare(req.body.password, user.hash_password, (err, result) => {
//           if (err) {
//             res.status(500).send({ message: "Error comparing passwords" });
//             return;
//           }
//           if (result) {
//             res
//               .status(200)
//               .send({ message: "Login successful.", user: { _id, username } });
//           } else {
//             res.status(401).send({ message: "Passwords don't match." });
//           }
//         });
//       } else {
//         res.status(400).send({ message: "User not found. Please sign up." });
//       }
//     })
//     .catch((error) => {
//       res.status(400).send({
//         message: "There was an error while authenticating your details.",
//       });
//     });
// };
