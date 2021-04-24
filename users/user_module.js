const db = require('../data/connection')

module.exports = {
    find,
    findBy,
    findById,
    addUser,
    remove,
    update
}
// get all users
function find() {
     return db('user')
}

// get a user
function findBy(user) {
    return db
      .select('*')
      .from('user')
      .where(user);
}

// get a user by ID
function findById(id) {
    return find()
    .where({id})
    .first()
}

// add a user 
function addUser(user) {
    return db
    .select('*')
    .from('user')
    .insert(user);
}

// delete a user 
function remove(id) {
  return  findById(id).del()
}

// update a user 
function update(updating, id) {
    return findById(id).update(updating)
    .then(()=> findById(id))
}