const {hashing} = require('../../users/users_helper')


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, username: 'user1', password: hashing('pass123'), email: "user1@gmail.com"},
        {id: 2, username: 'user2', password: hashing('pass1234'), email: "user2@gmail.com"},
        {id: 3, username: 'user3', password: hashing('pass3234'), email: "user3@gmail.com"}
      ]);
    });
};
