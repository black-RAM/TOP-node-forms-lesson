const usersStorage = require("../storages/usersStorage");

exports.usersListGet = (_, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (_, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersSearchGet = (req, res) => {
  const { search } = req.query
  const results = usersStorage.searchUsersByNameFragment(search)
  res.render("search", { search, results, title: "User Search Results" })
}