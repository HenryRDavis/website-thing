exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        {
          username: "sun",
          // email: "sun@gmail.com",
          password: "sun",
        },

        {
          username: "admin123",
          // email: "admin@gmail.com",
          password: "pass123456",
        },
        {
          username: "test123",
          // email: "test@gmail.com",
          password: "testtest",
        }
      ]);
    });
};