exports.up = function(knex) {
    return knex.schema
    .createTable('user', tbl => {
      tbl.increments();
  
      // tbl
      // .string('email')
      // .notNullable()
      // .unique();

      tbl
        .string('username', 128)
        .notNullable()
        .unique()
        .index();
  
      tbl
      .string('password', 256)
      .notNullable();
  
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
  };