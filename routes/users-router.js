const usersRouter = require("express").Router();

const {
  getUsers,
  getUserByUsername,
  createUser,
  confirmUser,
} = require("../controllers/users.controller");

const {
  getFavesByUser,
  postFave,
  deleteFave,
  deleteCollection
} = require("../controllers/faves.controller");

usersRouter.get("/", getUsers);

usersRouter.get("/:username", getUserByUsername);

usersRouter.post("/signup", createUser);

usersRouter.post("/signin", confirmUser);

usersRouter.get("/:username/faves", getFavesByUser);

usersRouter.post("/:username/:collection/:work_id", postFave);

usersRouter.delete("/:username/:collection/:work_id", deleteFave);

usersRouter.delete("/:username/:collection", deleteCollection);


module.exports = usersRouter;
