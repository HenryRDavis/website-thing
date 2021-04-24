exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        {
          name: "sun",
          username: "sun",
          email: "sun@gmail.com",
          password: "sun",
          role: "instructor"
        },

        {
          name: "admin",
          username: "admin123",
          email: "admin@gmail.com",
          password: "pass123456",
          role: "instructor"
        },
        {
          name: "test",
          username: "test123",
          email: "test@gmail.com",
          password: "testtest",
          role: "client"
        }
      ]);
    });
};