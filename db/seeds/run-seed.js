const data = require("../data/dev-data");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  return seed(data).then(() => db.end());
};

runSeed();
