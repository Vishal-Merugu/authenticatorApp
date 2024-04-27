import { NextFunction, Request, Response } from "express";
import { User } from "../../models/userdetails";
import { STATUS_CODES } from "../../constants";
import { getUserByUsername } from "./utils";

const UserValidator = {
  registerUser: async (req: Request, res: Response, next: NextFunction) => {
    const data: User = req.body;
    if (!data || !data.username || !data.password)
      return res
        .status(STATUS_CODES.CREDS_MISSING)
        .json({ status: false, message: "Username or password is missing" });

    const isExistingUser = await getUserByUsername(data.username);

    if (isExistingUser)
      return res.status(409).json({
        status: false,
        message: "User With username already exists",
      });
    next();
  },

  login: (req: Request, res: Response, next: NextFunction) => {
    const data: User = req.body;

    if (!data || !data.username || !data.password)
      return res
        .status(STATUS_CODES.CREDS_MISSING)
        .json({ status: false, message: "Username or password is missing" });

    next();
  },
};

export default UserValidator;
