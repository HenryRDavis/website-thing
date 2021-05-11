const Users = require('./user_module');
const restricted = require('../auth/restricted_midware');

const router = require("express").Router();

router.use(restricted);

router.get('/', (req, res) => {
  Users.find()
    .then(Users => {
      res.status(200).json({data: Users});
    })
    .catch(err => {
      res.status(500).json({message: 'Could not fetch users', error: err.message});
    });
});


module.exports = router;