import express from "express";
import UserValidator from "./validator";
import UserController from "./controller";

const router = express.Router();

router.post(
  "/register",
  UserValidator.registerUser,
  UserController.registerUser
);

router.post("/login", UserValidator.login, UserController.login);

export default router;
