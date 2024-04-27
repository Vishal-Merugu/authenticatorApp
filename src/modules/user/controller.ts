import { NextFunction, Request, Response, response } from "express";
import { generateSalt, hashPassword } from "../../utils/crypto";
import UserModel, { User } from "../../models/userdetails";
import { getUserByUsername } from "./utils";
import { STATUS_CODES } from "../../constants";

const UserController = {
  registerUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> => {
    const data: User = req.body;
    try {
      const salt = generateSalt();
      const newUserObj = {
        username: data.username,
        salt,
        password: hashPassword(data.password, salt),
      };

      return UserModel.create(newUserObj).then((user) => {
        user.save();
        req.session.userId = user._id;
        return res
          .status(STATUS_CODES.CREATED)
          .json({ status: true, userId: user._id.toString() });
      });
    } catch (err) {
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "Error registering user" });
    }
  },

  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> => {
    const data = req.body;

    try {
      const existingUser = await getUserByUsername(data.username, {
        salt: 1,
        password: 1,
      });

      if (!existingUser)
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ status: false, message: "Invalid Credentials" });

      const hashedPassword = hashPassword(data.password, existingUser.salt);

      if (hashedPassword !== existingUser.password)
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ status: false, message: "Invalid Credentials" });

      req.session.userId = existingUser._id;

      return res
        .status(STATUS_CODES.CREATED)
        .json({ status: true, userId: existingUser._id.toString() });
    } catch (err) {
      console.log("[ERROR: at LOGIN Controller]", err);
      return res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "Internal Server Error" });
    }
  },
};

export default UserController;
