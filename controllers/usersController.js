const { body, validationResult } = require("express-validator");
const usersStorage = require("../storages/usersStorage");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validationMiddleware = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body("email").trim()
    .isEmail().withMessage("Valid email address required.")
    .custom((value, { req }) => !usersStorage.emailExists(req.body.id, value)).withMessage("Another user is already using this email."),
  body("age")
    .custom(age => Number(age) > 18).withMessage("You must be over the age of 18.")
    .custom(age => Number(age) < 120).withMessage("We don't think you're over 120 years old.")
    .optional(),
  body("bio")
    .isLength({max: 200}).withMessage("Bio should not exceed 200 characters.")
    .optional(),
];

const newUserPostController = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("createUser", {
      title: "Create user",
      errors: errors.array(),
    });
  }
  const { firstName, lastName, email, age, bio } = req.body;
  usersStorage.addUser({ firstName, lastName, email, age, bio });
  res.redirect("/");
}

const updateUserPostController = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("updateUser", {
      title: "Update user",
      user: user,
      errors: errors.array(),
    });
  }
  const { firstName, lastName, email, age, bio } = req.body;
  usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
  res.redirect("/");
}

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
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

exports.usersCreatePost = [validationMiddleware, newUserPostController]

exports.usersUpdatePost = [validationMiddleware, updateUserPostController]

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};