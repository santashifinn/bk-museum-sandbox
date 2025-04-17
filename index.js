const bcrypt = require("bcrypt");

const saltRounds = 10;

bcrypt.genSalt(saltRounds, (err, salt) => {
  if (err) {
    //handle error
    return;
  }
});

const userPassword = "password";

bcrypt.hash(userPassword, salt, (err, hash) => {
  if (err) {
    //handle error
    return;
  }
}); //generates hash of a plaintext password -need string

console.log(hash, "<-- hashed password");

const storedHashedPassword = hash;
const userInputPassword = "password";

bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
  if (err) {
    //handle error
    console.error("Error comparing passwords", err);
    return;
  }
}); //compares plaintext password (parameter 1) with its hashed counterpart (parameter 2) - returns boolean

if (result) {
  //authentication successful
  console.log("Passwords match");
} else {
  //authentication failed
  console.log("Passwords don't match");
}
