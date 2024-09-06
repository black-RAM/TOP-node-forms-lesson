// routes/usersRouter.js
const { Router } = require("express");
const { usersListGet, usersCreateGet, usersUpdateGet, usersSearchGet } = require("../controllers/getControllers");
const { usersCreatePost, usersUpdatePost, usersDeletePost } = require("../controllers/postControllers") 
const usersRouter = Router();

usersRouter.get("/", usersListGet);
usersRouter.get("/create", usersCreateGet);
usersRouter.post("/create", usersCreatePost);
usersRouter.get("/:id/update", usersUpdateGet);
usersRouter.post("/:id/update", usersUpdatePost);
usersRouter.post("/:id/delete", usersDeletePost);
usersRouter.get("/search", usersSearchGet)

module.exports = usersRouter;
