const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Users = require('../users/user_module');
const {isValid} = require('../users/user_service.js');
const config = require("../api/config.js");

//Register
router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.HASH_ROUNDS || 6;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.addUser(credentials)
      .then((user) => {
        res.status(201).json({ data: user, message: 'success!' });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username & password.",
    });
  }
});

//login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = getJwt(user);

          res.status(200).json({ message: "Welcome to our API", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username & password.",
    });
  }
});

function getJwt(user) {
  const payload = {
    username: user.username
  };

  const jwtOptions = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, config.jwtSecret, jwtOptions);
}

module.exports = router;