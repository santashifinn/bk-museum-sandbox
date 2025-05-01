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
} = require("../controllers/faves.controller");

usersRouter.get("/", getUsers);

usersRouter.get("/:username", getUserByUsername);

usersRouter.post("/signup", createUser);

usersRouter.post("/signin", confirmUser);

usersRouter.get("/:username/faves", getFavesByUser);

usersRouter.post("/:username/:work_id", postFave);

usersRouter.delete("/:username/:work_id", deleteFave);


module.exports = usersRouter;
