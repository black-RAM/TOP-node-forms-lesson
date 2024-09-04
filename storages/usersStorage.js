// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, bio }) {
    this.storage[id] = { id, firstName, lastName, email, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }

  emailExists(email) {
    return Object.values(this.storage).some(user => user.email == email)
  }
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
module.exports = new UsersStorage();
