const { body } = require("express-validator")
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

module.exports = validationMiddleware